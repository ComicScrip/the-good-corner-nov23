import Layout from "@/components/Layout";
import { useSignupMutation } from "@/graphql/generated/schema";
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

export default function Signup() {
  const [error, setError] = useState("");
  const [createUser] = useSignupMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    const errors = validatePassword(formJSON.password);
    if (errors.length > 0) return setError(errors.join("\n"));
    if (formJSON.password !== formJSON.passwordConfirmation)
      return setError("les mots de passe ne coresspondent pas");

    // do not send confirmation since it's checked on the frontend
    delete formJSON.passwordConfirmation;

    try {
      const res = await createUser({ variables: { data: formJSON } });
      console.log({ res });
      alert("Vous etes bien enregistré.e. Merci !");
    } catch (e: any) {
      if (e.message === "EMAIL_ALREADY_TAKEN")
        setError("Cet e-mail est déjà pris");
      else setError("une erreur est survenue");
    }
  };

  return (
    <Layout pageTitle="Creer un compte">
      <h1 className="pt-6 pb-6 text-2xl">Creer un compte</h1>

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
            <label className="label" htmlFor="nickname">
              <span className="label-text">Pseudo</span>
            </label>
            <input
              type="text"
              name="nickname"
              id="nickname"
              minLength={2}
              maxLength={30}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-6 mb-3">
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

          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="passwordConfirmation">
              <span className="label-text">Confirmation</span>
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
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
