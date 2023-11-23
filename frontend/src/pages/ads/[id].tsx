import Layout from "@/components/Layout";
import { AdDetails as AdDetailsType } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/outline";

export default function AdDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [ad, setAd] = useState<AdDetailsType>();

  useEffect(() => {
    axios
      .get<AdDetailsType>(`http://localhost:4000/ads/${id}`)
      .then((res) => setAd(res.data))
      .catch(console.error);
  }, [id]);

  return (
    <Layout pageTitle={ad?.title ? ad.title + " - TGC" : "The Good Corner"}>
      <div className="pt-12 pb-12">
        <div className="p-6 bg-white shadow-lg rounded-2xl">
          {typeof ad === "undefined" ? (
            "Chargement..."
          ) : (
            <div className="">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl">{ad.title}</h1>
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
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
