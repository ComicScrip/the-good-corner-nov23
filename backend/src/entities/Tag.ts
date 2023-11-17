import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany
  } from "typeorm";
  import { Ad } from "./Ad";
  
  @Entity()
  export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    name: string;
  
    @ManyToMany(() => Ad, ad => ad.tags)
    ads: Ad[];
  }
  
  