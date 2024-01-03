import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import Ad from "./Ad";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export default class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name: string;

  @Field(() => [Ad])
  @OneToMany(() => Ad, (ad) => ad.category)
  ads: Ad[];
}
