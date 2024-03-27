import { Entity, Column, BaseEntity, ManyToOne, PrimaryColumn } from "typeorm";
import type { VerifyAuthenticationResponseOpts } from "@simplewebauthn/server";
import { ObjectType, Field, InputType, Int } from "type-graphql";
import User from "./User";

@Entity()
@ObjectType()
export default class Credential extends BaseEntity {
  @Field()
  @PrimaryColumn({ type: "bytea" })
  credentialID: Uint8Array;

  @Field()
  @Column({ type: "bytea" })
  credentialPublicKey: Uint8Array;

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

@ObjectType()
class PublicKeyCredentialRpEntity {
  @Field({ nullable: true }) id?: string;
  @Field() name: string;
}

@ObjectType()
class PublicKeyCredentialUserEntityJSON {
  @Field() id: string;
  @Field() name: string;
  @Field() displayName: string;
}

@ObjectType()
class PublicKeyCredentialParameters {
  @Field(() => Int) alg: number;
  @Field(() => String) type: "public-key";
}

@ObjectType()
class PublicKeyCredentialDescriptorJSON {
  @Field(() => String) type: "public-key";
  @Field(() => String) id: string;
  @Field(() => [String])
  transports?: (
    | "ble"
    | "cable"
    | "hybrid"
    | "internal"
    | "nfc"
    | "smart-card"
    | "usb"
  )[];
}

@ObjectType()
class AuthenticatorSelectionCriteria {
  @Field(() => String, { nullable: true })
  authenticatorAttachment?: "platform" | "cross-platform";
  @Field(() => Boolean, { nullable: true })
  requireResidentKey?: boolean;
  @Field(() => String, { nullable: true })
  residentKey?: "discouraged" | "preferred" | "required";
  @Field(() => String, { nullable: true })
  userVerification?: "discouraged" | "preferred" | "required";
}

@ObjectType()
class AuthenticationExtensionsClientInputs {
  @Field(() => String, { nullable: true })
  appid?: string;

  @Field(() => Boolean, { nullable: true })
  credProps?: boolean;

  @Field(() => Boolean, { nullable: true })
  hmacCreateSecret?: boolean;
}

@ObjectType()
export class PublicKeyCredentialCreationOptionsJSON {
  @Field(() => PublicKeyCredentialRpEntity)
  rp: PublicKeyCredentialRpEntity;

  @Field(() => PublicKeyCredentialUserEntityJSON)
  user: PublicKeyCredentialUserEntityJSON;

  @Field() challenge: string;

  @Field(() => [PublicKeyCredentialParameters])
  pubKeyCredParams: PublicKeyCredentialParameters[];

  @Field(() => Int, { nullable: true })
  timeout?: number;

  @Field(() => [PublicKeyCredentialDescriptorJSON], { nullable: true })
  excludeCredentials?: PublicKeyCredentialDescriptorJSON[];

  @Field(() => AuthenticatorSelectionCriteria)
  authenticatorSelection?: AuthenticatorSelectionCriteria;
  @Field(() => String, { nullable: true })
  attestation?: "direct" | "enterprise" | "indirect" | "none";

  @Field(() => AuthenticationExtensionsClientInputs, { nullable: true })
  extensions?: AuthenticationExtensionsClientInputs;
}

@InputType()
class DevicePublicKeyAuthenticatorOutput {
  @Field(() => Int, { nullable: true })
  dpk?: Uint8Array;
  @Field(() => String, { nullable: true })
  sig?: string;
  @Field(() => Int, { nullable: true })
  nonce?: Uint8Array;
  @Field(() => Int, { nullable: true })
  scope?: Uint8Array;
  @Field(() => Int, { nullable: true })
  aaguid?: Uint8Array;
}

@InputType()
class UVMAuthenticatorOutput {
  @Field(() => [Int], { nullable: true })
  uvm?: Uint8Array[];
}

@InputType()
class AuthenticationExtensionsAuthenticatorOutputs {
  devicePubKey?: DevicePublicKeyAuthenticatorOutput;
  uvm?: UVMAuthenticatorOutput;
}

@ObjectType()
export class RegistrationInfo {
  @Field(() => String)
  fmt:
    | "fido-u2f"
    | "packed"
    | "android-safetynet"
    | "android-key"
    | "tpm"
    | "apple"
    | "none";

  @Field(() => Int)
  counter: number;

  @Field(() => String)
  aaguid: string;

  @Field(() => Int)
  credentialID: Uint8Array;

  @Field(() => Int)
  credentialPublicKey: Uint8Array;
  @Field(() => String)
  credentialType: "public-key";

  @Field(() => Int)
  attestationObject: Uint8Array;

  @Field(() => Boolean)
  userVerified: boolean;

  @Field(() => String)
  credentialDeviceType: "singleDevice" | "multiDevice";

  @Field(() => Boolean)
  credentialBackedUp: boolean;

  @Field(() => String)
  origin: string;

  @Field(() => String)
  rpID?: string;

  @Field(() => String)
  authenticatorExtensionResults?: AuthenticationExtensionsAuthenticatorOutputs;
}

@ObjectType()
export class VerifiedRegistrationResponse {
  @Field(() => Boolean)
  verified: boolean;

  @Field(() => RegistrationInfo)
  registrationInfo: RegistrationInfo;
}
