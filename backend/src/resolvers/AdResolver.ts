import { Resolver, Query, Arg } from "type-graphql";
import { GraphQLError } from "graphql";
import Ad from "../entities/Ad";

@Resolver(Ad)
export default class AdResolver {
  @Query(() => [Ad])
  ads() {
    return Ad.find({ relations: { category: true, tags: true } });
  }

  @Query(() => Ad)
  async getAdById(@Arg("id") id: string) {
    const ad = await Ad.findOne({
      where: { id: parseInt(id, 10) },
      relations: { category: true, tags: true },
    });
    if (!ad) throw new GraphQLError("ad not found");
    return ad;
  }
}
