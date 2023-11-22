import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

export default function NewAd() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:4000/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());
    (formJSON as any).price = parseFloat((formJSON as any).price);
    console.log("envoi de l'annonce", formJSON);
    axios
      .post("http://localhost:4000/ads", formJSON)
      .then((res) => {
        console.log("annonce créée :", res.data);
        // router.push("/");
        alert("ok");
        form.reset();
      })
      .catch(console.error);
  };

  return (
    <Layout pageTitle="Creation d'une annonce">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Titre de l'annonce
          <input type="text" name="title" id="title" />
        </label>

        <label htmlFor="picture">
          Image de l'annonce
          <input type="url" name="picture" id="picture" />
        </label>

        <label htmlFor="owner">
          Auteur
          <input type="text" name="owner" id="owner" />
        </label>

        <label htmlFor="location">
          Localisation
          <input type="text" name="location" id="location" />
        </label>

        <label htmlFor="price">
          Prix
          <input type="number" name="price" id="price" step={0.01} />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            style={{ resize: "none" }}
          />
        </label>

        <label htmlFor="category">
          Prix
          <select name="category" id="category">
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>

        <input type="reset" value="Reset" />

        <button>Envoyer</button>
      </form>
    </Layout>
  );
}
