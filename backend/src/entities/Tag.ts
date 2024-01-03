import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
} from "typeorm";
import Ad from "./Ad";
import { ObjectType, Field, InputType } from "type-graphql";

@Entity()
@ObjectType()
export default class Tag extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  @Field()
  name: string;

  @Field(() => [Ad])
  @ManyToMany(() => Ad, (ad) => ad.tags)
  ads: Ad[];
}

@InputType()
export class TagInput {
  @Field()
  name: string;
}
