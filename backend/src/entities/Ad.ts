import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Length, Min } from "class-validator";
import Category from "./Category";
import Tag from "./Tag";
import { ObjectType, Field } from "type-graphql";

@Entity()
@ObjectType()
export default class Ad extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Length(5, 100, {
    message: "Le titre doit contenir entre 5 et 100 caractères",
  })
  @Column({ length: 100 })
  title: string;

  @Field()
  @Column({ type: "text", nullable: true })
  description: string;

  @Field()
  @Column({ length: 100 })
  owner: string;

  @Field()
  @Min(0, { message: "le prix doit etre positif" })
  @Column({ type: "float" })
  price: number;

  @Field()
  @Column({ length: 255 })
  picture: string;

  @Field()
  @Column({ length: 100 })
  location: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Category)
  @ManyToOne(() => Category, (c) => c.ads, {
    cascade: true,
    onDelete: "CASCADE",
  })
  category: Category;

  @Field(() => [Tag])
  @JoinTable()
  @ManyToMany(() => Tag, (t) => t.ads, {
    cascade: true,
  })
  tags: Tag[];
}
