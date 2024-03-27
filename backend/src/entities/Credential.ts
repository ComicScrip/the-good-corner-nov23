import { Entity, Column, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import type { VerifyAuthenticationResponseOpts } from "@simplewebauthn/server";
import { ObjectType, Field, InputType, Int } from "type-graphql";
import User from "./User";

@Entity()
@ObjectType()
export default class Credential extends BaseEntity {
  @Field()
  @PrimaryColumn()
  credentialID: string;

  @Field()
  @Column()
  credentialPublicKey: string;

  @Column({ type: "int" })
  counter: number;

  @ManyToOne(() => User, (u) => u.credentials)
  user: User;
}

@InputType()
class AuthenticatorAttestationResponseJSON {
  @Field(() => String)
  clientDataJSON: string;
  @Field(() => String)
  attestationObject: string;
  @Field(() => String, { nullable: true })
  authenticatorData?: string;
  @Field(() => [String], { nullable: true })
  transports?: VerifyAuthenticationResponseOpts["authenticator"]["transports"];
  @Field(() => Int, { nullable: true })
  publicKeyAlgorithm?: number;
  @Field(() => String, { nullable: true })
  publicKey?: string;
}

@InputType()
class CredentialPropertiesOutput {
  @Field(() => Boolean, { nullable: true })
  rk?: boolean;
}

@InputType()
class AuthenticationExtensionsClientOutputs {
  @Field(() => Boolean, { nullable: true })
  appid?: boolean;

  @Field(() => CredentialPropertiesOutput, { nullable: true })
  credProps?: CredentialPropertiesOutput;

  @Field(() => Boolean, { nullable: true })
  hmacCreateSecret?: boolean;
}

@InputType()
export class CredentialInput {
  @Field(() => String, { nullable: true })
  authenticatorAttachment?: "cross-platform" | "platform";

  @Field(() => String)
  id: string;

  @Field(() => String)
  rawId: string;

  @Field(() => AuthenticatorAttestationResponseJSON)
  response: AuthenticatorAttestationResponseJSON;

  @Field(() => AuthenticationExtensionsClientOutputs)
  clientExtensionResults: AuthenticationExtensionsClientOutputs;

  @Field(() => String)
  type: "public-key";
}
