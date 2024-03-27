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
            const [displayname, username] = [nickname, email];
            const optionsRes = await registerWebAuthnOptions({
              variables: { displayname, username },
            });
            if (!optionsRes.data)
              throw new Error("could not get signup options");

            const { challenge, pubKeyCredParams, extensions } =
              optionsRes.data.registerWebAuthnCredentialOptions;

            const registrationOpts = {
              ...optionsRes.data.registerWebAuthnCredentialOptions,
              pubKeyCredParams: pubKeyCredParams.map((p) => ({
                alg: p.alg,
                type: "public-key",
              })),
              extensions: {
                appid: extensions?.appid ?? undefined,
                credProps: extensions?.credProps ?? undefined,
                hmacCreateSecret: extensions?.hmacCreateSecret ?? undefined,
              },
            };

            const credential = await startRegistration(registrationOpts as any);

            await registerWebAuthn({
              variables: { challenge, credential, username, displayname },
            });
          } catch (err: any) {
            if (err.message === "EMAIL_ALREADY_TAKEN")
              setError("Cet e-mail est déjà pris");
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
