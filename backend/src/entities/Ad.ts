import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { Length, Min } from "class-validator";

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
}
