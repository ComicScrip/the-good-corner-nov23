import Layout from "@/components/Layout";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AdDetails() {
  const router = useRouter();

  console.log(router.query);

  return (
    <Layout pageTitle="Details d'une annonce">
      <h1>Details de l'annonce #{router.query.id}</h1>

      <Link href={"/"}>Retour à l'acceuil</Link>
    </Layout>
  );
}
