import Layout from "@/components/Layout";
import { useConfirmEmailMutation } from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const [confirmEmail] = useConfirmEmailMutation();

  useEffect(() => {
    if (router.query.token)
      confirmEmail({
        variables: { confirmationToken: router.query.token as string },
      });
  }, [router.query.token]);

  return (
    <Layout pageTitle="Email confirmé">
      <p className="pt-4">Merci d'avoir confirmé votre email</p>
    </Layout>
  );
}
