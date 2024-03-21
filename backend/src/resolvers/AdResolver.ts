import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Int,
  Ctx,
  Authorized,
} from "type-graphql";
import Ad, { NewAdInput, UpdateAdInput } from "../entities/Ad";
import { GraphQLError } from "graphql";
import { ILike, In } from "typeorm";
import { Context } from "../types";
import { UserRole } from "../entities/User";

@Resolver(Ad)
class AdsResolver {
  @Query(() => [Ad])
  async ads(
    @Arg("tagsId", { nullable: true }) tagIds?: string,
    @Arg("categoryId", () => Int, { nullable: true }) categoryId?: number,
    @Arg("title", { nullable: true }) title?: string
  ) {
    return Ad.find({
      relations: { category: true, tags: true },
      where: {
        tags: {
          id:
            typeof tagIds === "string" && tagIds.length > 0
              ? In(tagIds.split(",").map((t) => parseInt(t, 10)))
              : undefined,
        },
        title: title ? ILike(`%${title}%`) : undefined,
        category: {
          id: categoryId,
        },
      },
    });
  }

  @Query(() => Ad)
  async getAdById(@Arg("adId", () => Int) id: number) {
    const ad = await Ad.findOne({
      where: { id },
      relations: { category: true, tags: true, owner: true },
    });
    if (!ad) throw new GraphQLError("not found");
    return ad;
  }

  @Authorized()
  @Mutation(() => Ad)
  async createAd(
    @Arg("data", { validate: true }) data: NewAdInput,
    @Ctx() ctx: Context
  ) {
    if (!ctx.currentUser) return new GraphQLError("you need to be logged in");
    const newAd = new Ad();

    Object.assign(newAd, data);

    newAd.owner = ctx.currentUser;

    const { id } = await newAd.save();

    return Ad.findOne({
      where: { id },
      relations: { category: true, tags: true, owner: true },
    });
  }

  @Authorized()
  @Mutation(() => Ad)
  async updateAd(
    @Ctx() ctx: Context,
    @Arg("adId") id: number,
    @Arg("data", { validate: true }) data: UpdateAdInput
  ) {
    if (!ctx.currentUser) throw new GraphQLError("you need to be logged in!");

    const adToUpdate = await Ad.findOne({
      where: { id },
      relations: { owner: true },
    });
    if (!adToUpdate) throw new GraphQLError("not found");

    if (
      ctx.currentUser.role !== UserRole.Admin &&
      adToUpdate?.owner.id !== ctx.currentUser.id
    )
      throw new GraphQLError("you are not the owner of this ad !");

    await Object.assign(adToUpdate, data);

    await adToUpdate.save();
    return Ad.findOne({
      where: { id },
      relations: { category: true, tags: true },
    });
  }

  @Authorized()
  @Mutation(() => String)
  async deleteAd(@Arg("adId") id: number, @Ctx() ctx: Context) {
    if (!ctx.currentUser) throw new GraphQLError("you need to be logged in!");

    const ad = await Ad.findOne({ where: { id }, relations: { owner: true } });

    if (
      ctx.currentUser.role !== UserRole.Admin &&
      ad?.owner.id !== ctx.currentUser.id
    )
      throw new GraphQLError("you are not the owner of this ad !");

    if (!ad) throw new GraphQLError("not found");
    await ad.remove();
    return "deleted";
  }
}

export default AdsResolver;
