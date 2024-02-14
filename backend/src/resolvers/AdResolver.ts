import { Resolver, Query, Arg, Mutation, Int } from "type-graphql";
import Ad, { NewAdInput, UpdateAdInput } from "../entities/Ad";
import { GraphQLError } from "graphql";
import { ILike, In } from "typeorm";

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
      relations: { category: true, tags: true },
    });
    if (!ad) throw new GraphQLError("not found");
    return ad;
  }

  @Mutation(() => Ad)
  async createAd(@Arg("data", { validate: true }) data: NewAdInput) {
    const newAd = new Ad();
    Object.assign(newAd, data);
    const { id } = await newAd.save();
    return Ad.findOne({
      where: { id },
      relations: { category: true, tags: true },
    });
  }

  @Mutation(() => Ad)
  async updateAd(
    @Arg("adId") id: number,
    @Arg("data", { validate: true }) data: UpdateAdInput
  ) {
    const adToUpdate = await Ad.findOneBy({ id });
    if (!adToUpdate) throw new GraphQLError("not found");

    await Object.assign(adToUpdate, data);

    await adToUpdate.save();
    return Ad.findOne({
      where: { id },
      relations: { category: true, tags: true },
    });
  }

  @Mutation(() => String)
  async deleteAd(@Arg("adId") id: number) {
    const ad = await Ad.findOne({ where: { id } });
    if (!ad) throw new GraphQLError("not found");
    await ad.remove();
    return "deleted";
  }
}

export default AdsResolver;
