import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import Ad from "./Ad";
import { Length } from "class-validator";
import { ObjectType, Field, Int, InputType } from "type-graphql";

@Entity()
@ObjectType()
export default class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Length(2, 50)
  @Field()
  name: string;

  @ManyToMany(() => Ad, (ad) => ad.tags)
  ads: Ad[];
}

@InputType()
export class NewTagInput {
  @Field()
  @Length(2, 30, { message: "Le nom doit contenir entre 2 et 30 caractères" })
  name: string;
}

@InputType()
export class UpdateTagInput {
  @Field({ nullable: true })
  @Length(2, 30, { message: "Le nom doit contenir entre 2 et 30 caractères" })
  name?: string;
}
