import { Resolver, Mutation, Arg, Query, Authorized } from "type-graphql";
import { GraphQLError } from "graphql";
import Tag, { NewTagInput, UpdateTagInput } from "../entities/Tag";
import { Like } from "typeorm";
import { UserRole } from "../entities/User";

@Resolver(Tag)
class TagsResolver {
  @Authorized([UserRole.Admin])
  @Mutation(() => Tag)
  async createTag(@Arg("data", { validate: true }) data: NewTagInput) {
    const newTag = new Tag();
    Object.assign(newTag, data);
    return await newTag.save();
  }
  @Query(() => [Tag])
  async tags(@Arg("name", { nullable: true }) name: string) {
    return await Tag.find({
      where: { name: name ? Like(`%${name}%`) : undefined },
      order: { id: "desc" },
    });
  }

  @Authorized([UserRole.Admin])
  @Mutation(() => String)
  async deleteTag(@Arg("tagId") id: number) {
    const tagToDelete = await Tag.findOneBy({ id });
    if (!tagToDelete) throw new GraphQLError("not found");
    await tagToDelete.remove();
    return "ok";
  }

  @Authorized([UserRole.Admin])
  @Mutation(() => Tag)
  async updateTag(
    @Arg("tagId") id: number,
    @Arg("data", { validate: true }) data: UpdateTagInput
  ) {
    const tagToUpdate = await Tag.findOneBy({ id });
    if (!tagToUpdate) throw new GraphQLError("not found");
    Object.assign(tagToUpdate, data);
    return await tagToUpdate.save();
  }
}

export default TagsResolver;
