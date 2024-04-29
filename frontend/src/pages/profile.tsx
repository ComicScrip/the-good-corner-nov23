import AdCard from "@/components/AdCard";
import Layout from "@/components/Layout";
import {
  useProfileQuery,
  useSignupMutation,
  useUpdateProfileMutation,
} from "@/graphql/generated/schema";
import { FormEvent, useState } from "react";

export default function Profile() {
  const [error, setError] = useState("");

  const [updateProfile] = useUpdateProfileMutation();

  const { data: currentUser } = useProfileQuery({
    errorPolicy: "ignore",
  });

  if (!currentUser) return "chargement...";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setError("");
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formJSON: any = Object.fromEntries(formData.entries());

    try {
      const res = await updateProfile({ variables: { data: formJSON } });
      alert("Profil mis à jour !");
    } catch (e: any) {
      setError("une erreur est survenue");
    }
  };

  return (
    <Layout pageTitle="Mon profil">
      <h1 className="pt-6 pb-6 text-2xl">Mon profil</h1>

      <form onSubmit={handleSubmit} className="pb-12">
        <div className="flex flex-wrap gap-6 mb-3">
          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="nickname">
              <span className="label-text">Pseudo</span>
            </label>
            <input
              type="text"
              name="nickname"
              id="nickname"
              defaultValue={currentUser.profile.nickname}
              minLength={2}
              maxLength={30}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label" htmlFor="avatar">
              <span className="label-text">Avatar</span>
            </label>
            <input
              name="avatar"
              id="avatar"
              minLength={2}
              maxLength={255}
              defaultValue={currentUser.profile.avatar}
              required
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>

        {error !== "" && <pre className="text-red-700">{error}</pre>}
        <button className="btn btn-primary text-white mt-12 w-full">
          Mise à jour
        </button>
      </form>

      <div>
        <h2 className="text-xl mb-4">Mes annonces</h2>

        <section className="flex flex-wrap pb-24">
          {currentUser.profile.ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} link={`/ads/${ad.id}`} />
          ))}
        </section>
      </div>
    </Layout>
  );
}
