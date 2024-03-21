import { Resolver, Mutation, Arg, Query, Authorized } from "type-graphql";
import { GraphQLError } from "graphql";
import { Like } from "typeorm";
import Category, {
  NewCategoryInput,
  UpdateCategoryInput,
} from "../entities/Category";
import { UserRole } from "../entities/User";

@Resolver(Category)
class CategoriesResolver {
  @Authorized([UserRole.Admin])
  @Mutation(() => Category)
  async createCategory(
    @Arg("data", { validate: true }) data: NewCategoryInput
  ) {
    const newCategory = new Category();
    Object.assign(newCategory, data);
    const newCategoryWithId = await newCategory.save();
    return newCategoryWithId;
  }
  @Query(() => [Category])
  async categories(@Arg("name", { nullable: true }) name: string) {
    return await Category.find({
      where: { name: name ? Like(`%${name}%`) : undefined },
      order: { id: "desc" },
    });
  }

  @Authorized([UserRole.Admin])
  @Mutation(() => String)
  async deleteCategory(@Arg("categoryId") id: number) {
    const categoryToDelete = await Category.findOneBy({ id });
    if (!categoryToDelete) throw new GraphQLError("not found");
    await categoryToDelete.remove();
    return "ok";
  }

  @Authorized([UserRole.Admin])
  @Mutation(() => Category)
  async updateCategory(
    @Arg("categoryId") id: number,
    @Arg("data", { validate: true }) data: UpdateCategoryInput
  ) {
    const categoryToUpdate = await Category.findOneBy({ id });
    if (!categoryToUpdate) throw new GraphQLError("not found");
    Object.assign(categoryToUpdate, data);
    return await categoryToUpdate.save();
  }
}

export default CategoriesResolver;
