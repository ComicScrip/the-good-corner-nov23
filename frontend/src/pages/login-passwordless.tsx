import Layout from "@/components/Layout";
import {
  useAuthWebAuthnCredentialMutation,
  useAuthWebAuthnCredentialOptionsMutation,
} from "@/graphql/generated/schema";
import { useState } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import { useRouter } from "next/router";

export default function LoginPasswordless() {
  const [authWebAuthn] = useAuthWebAuthnCredentialMutation();
  const [authWebAuthnOptions] = useAuthWebAuthnCredentialOptionsMutation();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <Layout pageTitle="Connexion sans mot de passe">
      <h1 className="text-xl pt-4">Se Connecter</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setError("");
          try {
            const [username] = [email];
            const optionsRes = await authWebAuthnOptions({
              variables: { username },
            });

            if (!optionsRes.data) throw new Error("could not get auth options");

            const {
              challenge,
              timeout,
              rpId,
              allowCredentials,
              userVerification,
              extensions,
            } = optionsRes.data.authWebAuthnCredentialOptions;

            const authRes = await startAuthentication({
              ...optionsRes.data.authWebAuthnCredentialOptions,
              challenge,
              timeout: timeout ?? 60000,
              rpId: rpId as string,
              allowCredentials: allowCredentials.map(({ id, transports }) => ({
                id,
                type: "public-key",
                transports: transports as any,
              })),
              userVerification: (userVerification ?? "preferred") as any,
              extensions: (extensions ?? []) as any,
            });

            const authVerifRes = await authWebAuthn({
              variables: { challenge, username, credential: authRes as any },
            });

            if (authVerifRes.data?.authWebAuthnCredential)
              router.push("/profile");
          } catch (err: any) {
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
        </div>
        {error !== "" && <pre className="text-red-700">{error}</pre>}
        <button className="btn btn-primary text-white mt-4 w-full">
          Se connecter
        </button>
      </form>
    </Layout>
  );
}
