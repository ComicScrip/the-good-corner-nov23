import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  useAdDetailsQuery,
  useDeleteAdMutation,
} from "@/graphql/generated/schema";

export default function AdDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [deleteAd] = useDeleteAdMutation();

  const { data } = useAdDetailsQuery({
    variables: { adId: parseInt(id as string) },
    skip: typeof id === "undefined",
  });

  const ad = data?.getAdById;

  return (
    <Layout pageTitle={ad?.title ? ad.title + " - TGC" : "The Good Corner"}>
      <div className="pt-12 pb-12">
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          {typeof ad === "undefined" ? (
            "Chargement..."
          ) : (
            <div className="">
              <div className=" flex justify-between items-start md:items-center">
                <div className="flex items-start md:items-center flex-col md:flex-row">
                  <h1 className="text-3xl">{ad.title}</h1>

                  <div className="md:ml-4 mt-4 md:mt-0">
                    {ad.tags.map((t) => (
                      <span
                        className="bg-slate-100 rounded-badge p-2 mr-2 text-gray-600 border-slate-300 border "
                        key={t.id}
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-2xl">{ad.price} €</p>
              </div>

              <img src={ad.picture} alt={ad.title} className="mt-6 mb-6" />
              <p className="mt-6 mb-6">{ad.description}</p>
              <div className="flex justify-between mb-6">
                <div className="flex items-center mt-3">
                  <UserCircleIcon width={24} height={24} className="mr-2" />{" "}
                  {ad.owner}
                </div>

                <div className="flex items-center mt-2 ">
                  <MapPinIcon width={24} height={24} className="mr-2" />{" "}
                  {ad.location}
                </div>
              </div>
              <div className="flex justify-between border-t pt-2 items-center ">
                <Link
                  href={`/editAd/${ad.id}`}
                  className="flex items-center mt-3 cursor-pointer"
                >
                  <PencilSquareIcon width={24} height={24} className="mr-2" />
                  Editer l'annonce
                </Link>

                <div
                  className="flex items-center mt-3 cursor-pointer"
                  onClick={() => {
                    if (
                      confirm(
                        "Êtes-vous certain.e de vouloir supprimer cette annonce ?"
                      )
                    )
                      deleteAd({ variables: { adId: ad.id } })
                        .then(() => router.push("/"))
                        .catch(console.error);
                  }}
                >
                  <TrashIcon width={24} height={24} className="mr-2" />
                  Supprimer l'annonce
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
