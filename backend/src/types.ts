import { InputType, Field, Int } from "type-graphql";
import express from "express";
import User from "./entities/User";

@InputType()
export class ObjectId {
  @Field(() => Int)
  id!: number;
}

export interface Context {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
}
