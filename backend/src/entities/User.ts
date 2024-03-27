import { IsEmail, IsStrongPassword, Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { hash } from "argon2";
import Ad from "./Ad";
import Credential from "./Credential";

import type {
  AuthenticatorTransportFuture,
  CredentialDeviceType,
} from "@simplewebauthn/types";

export enum UserRole {
  Admin = "admin",
  Visitor = "visitor",
}

@Entity()
@ObjectType()
class User extends BaseEntity {
  password?: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) this.hashedPassword = await hash(this.password);
  }

  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ unique: true })
  nickname: string;

  @Column({ nullable: true })
  hashedPassword?: string;

  @Field(() => [Ad])
  @OneToMany(() => Ad, (a) => a.owner)
  ads: Ad[];

  @Column({
    default:
      "https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png",
  })
  @Field()
  avatar: string;

  @Field()
  @Column({ enum: UserRole, default: UserRole.Visitor })
  role: UserRole;

  @Column({ nullable: true, type: "varchar", unique: true })
  emailConfirmationToken?: string | null;

  @Column({ default: false })
  emailVerified: boolean;

  @OneToMany(() => Credential, (c) => c.user, { cascade: true })
  credentials: Credential[];
}

@InputType()
export class NewUserInput {
  @IsEmail()
  @Field()
  email: string;

  @Length(2, 30)
  @Field()
  nickname: string;

  @Length(2, 30)
  @Field({ nullable: true })
  avatar?: string;

  @Field()
  @IsStrongPassword()
  password: string;
}

@InputType()
export class UpdateUserInput {
  @Length(2, 30)
  @Field({ nullable: true })
  nickname?: string;

  @Length(2, 255)
  @Field({ nullable: true })
  avatar?: string;
}

@InputType()
export class LoginInput {
  @IsEmail()
  @Field()
  email: string;

  @Field()
  @IsStrongPassword()
  password: string;
}

export default User;
