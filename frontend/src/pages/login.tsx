import Layout from "@/components/Layout";
import {
  useLoginMutation,
  useLogoutMutation,
  useProfileQuery,
} from "@/graphql/generated/schema";
import { FormEvent, useState } from "react";

function validatePassword(p: string) {
  let errors = [];
  if (p.length < 8)
    errors.push("Le mot de passe doit faire minimum 8 caractères");
  if (p.search(/[a-z]/) < 0)
    errors.push("Le mot de passe doit contenir une minuscule");
  if (p.search(/[A-Z]/) < 0)
    errors.push("Le mot de passe doit contenir une majuscule");
  if (p.search(/[0-9]/) < 0)
    errors.push("Le mot de passe doit contenir un chiffre");

  return errors;
}

export default function Login() {
  const [error, setError] = useState("");
  const [login] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const { data: currentUser, client } = useProfileQuery({
    errorPolicy: "ignore",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    const errors = validatePassword(formJSON.password);
    if (errors.length > 0) return setError(errors.join("\n"));

    try {
      const res = await login({ variables: { data: formJSON } });
      console.log({ res });
    } catch (e: any) {
      setError("Identifiants incorrects");
    } finally {
      client.resetStore();
    }
  };

  return (
    <Layout pageTitle="Se connecter">
      {currentUser ? (
        <div className="pt-4">
          <p>connecté en tant que {currentUser.profile.email}</p>
          <button
            className="btn btn-warning text-white mt-4 w-full"
            onClick={async () => {
              await logout();
              client.resetStore();
            }}
          >
            Se déconnecter
          </button>
        </div>
      ) : (
        <>
          <h1 className="pt-6 pb-6 text-2xl">Se connecter</h1>

          <form onSubmit={handleSubmit} className="pb-12">
            <div className="flex flex-wrap gap-6 mb-3">
              <div className="form-control w-full max-w-xs">
                <label className="label" htmlFor="email">
                  <span className="label-text">Email</span>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  autoComplete=""
                  className="input input-bordered w-full max-w-xs"
                />
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label" htmlFor="password">
                  <span className="label-text">Mot de passe</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
            </div>

            {error !== "" && <pre className="text-red-700">{error}</pre>}
            <button className="btn btn-primary text-white mt-12 w-full">
              Se connecter
            </button>
          </form>
        </>
      )}
    </Layout>
  );
}
