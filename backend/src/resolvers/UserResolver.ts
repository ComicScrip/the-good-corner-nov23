import { Arg, Mutation, Resolver } from "type-graphql";
import User, { NewUserInput } from "../entities/User";

@Resolver()
class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("data", { validate: true }) data: NewUserInput) {
    // TODO: Verif unicité email
    const newUser = new User();
    Object.assign(newUser, data);
    const newUserWithId = await newUser.save();
    return newUserWithId;
  }
}

export default UserResolver;
