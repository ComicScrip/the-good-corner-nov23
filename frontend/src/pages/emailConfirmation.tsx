import Layout from "@/components/Layout";
import { useConfirmEmailMutation } from "@/graphql/generated/schema";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EmailConfirmation() {
  const router = useRouter();
  const [confirmEmail] = useConfirmEmailMutation();

  const token = router.query.token as string;

  useEffect(() => {
    if (token)
      confirmEmail({ variables: { token } }).then(() => {
        setTimeout(() => {
          router.push("/login");
        }, 5000);
      });
  }, [token, confirmEmail, router]);

  return (
    <Layout pageTitle="Merci d'avoir confimé votre email">
      <p>
        Merci d&apos;avoir confimé votre email. Vous allez etre redirigé.e vers
        la page de connexion dans quelques instants.
      </p>
    </Layout>
  );
}
