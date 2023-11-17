import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany
  } from "typeorm";
  import { Ad } from "./Ad";
  
  @Entity()
  export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;
  
    @OneToMany(() => Ad, ad => ad.category)
    ads: Ad[];
  }
  