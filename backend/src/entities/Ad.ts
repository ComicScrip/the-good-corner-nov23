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

@Entity()
export default class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Length(5, 100, {
    message: "Le titre doit contenir entre 5 et 100 caractères",
  })
  @Column({ length: 100 })
  title: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ length: 100 })
  owner: string;

  @Min(0, { message: "le prix doit etre positif" })
  @Column({ type: "float" })
  price: number;

  @Column({ length: 255 })
  picture: string;

  @Column({ length: 100 })
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Category, (c) => c.ads, {
    cascade: true,
    onDelete: "CASCADE",
  })
  category: Category;

  @JoinTable()
  @ManyToMany(() => Tag, (t) => t.ads, {
    cascade: true,
  })
  tags: Tag[];
}
