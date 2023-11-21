import Head from "next/head";
import Header from "./Header";
import { ReactNode } from "react";

export default function Layout({
  children,
  pageTitle,
}: {
  children: ReactNode;
  pageTitle: string;
}) {
  return (
    <>
      <Head>
        <title>The Good Corner - {pageTitle}</title>
        <meta name="description" content="ads website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="main-content">{children}</main>
    </>
  );
}
