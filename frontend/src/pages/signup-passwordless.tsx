import Layout from "@/components/Layout";
import {
  useRegisterWebAuthnCredentialMutation,
  useRegisterWebAuthnCredentialOptionsMutation,
} from "@/graphql/generated/schema";
import { useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";

export default function SignupPasswordless() {
  const [registerWebAuthn] = useRegisterWebAuthnCredentialMutation();
  const [registerWebAuthnOptions] =
    useRegisterWebAuthnCredentialOptionsMutation();
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");

  return (
    <Layout pageTitle="Inscription sans mot de passe">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          try {
            const options = await registerWebAuthnOptions({
              variables: { displayname: nickname, username: email },
            });
            if (!options.data) throw new Error("could not get signup options");

            const {
              rp,
              challenge,
              pubKeyCredParams,
              user,
              attestation,
              authenticatorSelection,
              timeout,
              excludeCredentials,
              extensions,
            } = options.data.registerWebAuthnCredentialOptions;

            const registrationOpts = {
              rp: { name: rp.name, id: rp.id || undefined },
              challenge,
              pubKeyCredParams: pubKeyCredParams.map((p) => ({
                alg: p.alg,
                type: "public-key",
              })),
              user: {
                displayName: user.displayName,
                id: user.id,
                name: user.name,
              },
              attestation:
                (attestation as
                  | "direct"
                  | "enterprise"
                  | "indirect"
                  | "none") ?? undefined,
              authenticatorSelection: {
                authenticatorAttachment:
                  (authenticatorSelection.authenticatorAttachment as
                    | "cross-platform"
                    | "platform") ?? undefined,
                requireResidentKey:
                  authenticatorSelection.requireResidentKey ?? undefined,
                residentKey:
                  (authenticatorSelection.residentKey as
                    | "discouraged"
                    | "preferred"
                    | "required") ?? undefined,
                userVerification:
                  (authenticatorSelection.userVerification as
                    | "discouraged"
                    | "preferred"
                    | "required") ?? undefined,
              },
              timeout: timeout ?? undefined,
              excludeCredentials: excludeCredentials
                ? (
                    excludeCredentials ??
                    ([] as {
                      type: string;
                      id: string;
                      transports: string[];
                    }[])
                  ).map((c) => ({
                    id: c.id,
                    type: "public-key",
                    transports: c.transports as (
                      | "ble"
                      | "cable"
                      | "hybrid"
                      | "internal"
                      | "nfc"
                      | "smart-card"
                      | "usb"
                    )[],
                  }))
                : undefined,

              extensions: {
                appid: extensions?.appid ?? undefined,
                credProps: extensions?.credProps ?? undefined,
                hmacCreateSecret: extensions?.hmacCreateSecret ?? undefined,
              },
            };

            console.log({ registrationOpts });

            const res = await startRegistration(registrationOpts as any);

            console.log({ res });

            const confirmation = await registerWebAuthn({
              variables: {
                challenge,
                credential: res,
                username: email,
                displayname: nickname,
              },
            });

            console.log({ confirmation });

            /*
            const registration = await client.register(email, challenge, {
              authenticatorType: "auto",
              userVerification: "required",
              timeout: 60000,
              attestation: true,
              debug: false,
            });
            console.log({ registration });
            await signup({
              variables: {
                registration: {
                  authenticatorData: registration.authenticatorData,
                  clientData: registration.clientData,
                  credential: registration.credential,
                  username: email,
                },
              },
            });
            */
          } catch (err: any) {
            console.log({ err });

            setError("error occured");
          }
        }}
      >
        <div className="flex flex-wrap gap-6 mb-3">
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="username">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              minLength={2}
              maxLength={30}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="nickname">
              <span className="label-text">Pseudo</span>
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              minLength={2}
              maxLength={30}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        {error !== "" && <pre className="text-red-700">{error}</pre>}
        <button className="btn btn-primary text-white mt-12 w-full">
          Envoyer
        </button>
      </form>
    </Layout>
  );
}
