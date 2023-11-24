import { Ad, Category } from "@/types";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import qs from "query-string";

export default function Header() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<Ad[]>([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:4000/categories")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  console.log(router.query.title);
  const [search, setSearch] = useState(router.query.title || "");

  useEffect(() => {
    if (router.isReady) setSearch(router.query.title || "");
  }, [router.isReady]);

  useEffect(() => {
    console.log("effect", search, router.pathname, router.query.title);
    if ((router.pathname === "/search" || search.length) && router.isReady)
      router.push(
        `/search?${qs.stringify({
          ...searchParams,
          title: search || router.query.title,
        })}`
      );

    if (search.length)
      axios
        .get<Ad[]>(`http://localhost:4000/autocompleteAdTitle?title=${search}`)
        .then((res) => setAutoCompleteOptions(res.data))
        .catch(console.error);
    else setAutoCompleteOptions([]);
  }, [search, router.isReady]);

  const searchParams = qs.parse(window.location.search) as any;

  const [showAutoComplete, setShowAutoComplete] = useState(false);

  const [selectedAutoCompleteIndex, setSelectedAutoCompleteIndex] = useState(0);

  return (
    <header className="header">
      <div className="main-menu">
        <h1>
          <Link href="/" className="button logo link-button">
            <span className="mobile-short-label">TGC</span>
            <span className="desktop-long-label text-xl">THE GOOD CORNER</span>
          </Link>
        </h1>
        <form
          className="text-field-with-button"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="w-full flex justify-center">
            <div className="min-w-[200px] max-w-[400px] flex flex-col relative">
              <input
                className="text-field main-search-field text-gray-700"
                type="search"
                value={search}
                placeholder="Rechercher.."
                autoFocus
                onChange={(e) => {
                  setSelectedAutoCompleteIndex(0);
                  setSearch(e.target.value);
                }}
                onFocus={() => setShowAutoComplete(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setShowAutoComplete(false);
                  }, 150)
                }
                onKeyDown={({ key }) => {
                  // arrow up/down button should select next/previous list element
                  if (key === "ArrowUp") {
                    setSelectedAutoCompleteIndex((i) => (i < 1 ? 0 : i - 1));
                  } else if (key === "ArrowDown") {
                    setSelectedAutoCompleteIndex((i) =>
                      i >= autoCompleteOptions.length - 1
                        ? autoCompleteOptions.length - 1
                        : i + 1
                    );
                  } else if (key === "Enter") {
                    router.push(
                      `/ads/${autoCompleteOptions[selectedAutoCompleteIndex].id}`
                    );
                  }
                }}
              />

              <div
                className="bg-white absolute z-10 w-[200px] mt-[45px] rounded-lg border-gray-200 border"
                style={{
                  visibility:
                    showAutoComplete &&
                    autoCompleteOptions.filter((o) => o.title !== search)
                      .length > 0
                      ? "initial"
                      : "hidden",
                }}
              >
                {autoCompleteOptions
                  .filter((o) => o.title !== search)
                  .map((o, idx) => (
                    <div
                      className={`cursor-pointer p-1 px-3 border-b border-gray-200 text-gray-600 hover:bg-slate-50 ${
                        selectedAutoCompleteIndex === idx ? "bg-slate-100" : ""
                      }`}
                      key={idx}
                      onClick={() =>
                        router.push(
                          `/ads/${autoCompleteOptions[selectedAutoCompleteIndex].id}`
                        )
                      }
                    >
                      {o.title}
                    </div>
                  ))}
              </div>
            </div>

            <button
              type="button"
              className="button button-primary ml-1"
              onClick={() => {
                console.log("search");

                router.push(
                  `/search?${qs.stringify({
                    ...searchParams,
                    title: search,
                  })}`
                );
              }}
            >
              <svg
                aria-hidden="true"
                width="16"
                transform="scale(-1, 1)"
                fill="currentColor"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-50 -50 530 550"
                xmlSpace="preserve"
                className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
              >
                <path d="m464.524 412.846-97.929-97.925c23.6-34.068 35.406-72.047 35.406-113.917 0-27.218-5.284-53.249-15.852-78.087-10.561-24.842-24.838-46.254-42.825-64.241-17.987-17.987-39.396-32.264-64.233-42.826C254.246 5.285 228.217.003 200.999.003c-27.216 0-53.247 5.282-78.085 15.847C98.072 26.412 76.66 40.689 58.673 58.676c-17.989 17.987-32.264 39.403-42.827 64.241C5.282 147.758 0 173.786 0 201.004c0 27.216 5.282 53.238 15.846 78.083 10.562 24.838 24.838 46.247 42.827 64.234 17.987 17.993 39.403 32.264 64.241 42.832 24.841 10.563 50.869 15.844 78.085 15.844 41.879 0 79.852-11.807 113.922-35.405l97.929 97.641c6.852 7.231 15.406 10.849 25.693 10.849 9.897 0 18.467-3.617 25.694-10.849 7.23-7.23 10.848-15.796 10.848-25.693.003-10.082-3.518-18.651-10.561-25.694zM291.363 291.358c-25.029 25.033-55.148 37.549-90.364 37.549-35.21 0-65.329-12.519-90.36-37.549-25.031-25.029-37.546-55.144-37.546-90.36 0-35.21 12.518-65.334 37.546-90.36 25.026-25.032 55.15-37.546 90.36-37.546 35.212 0 65.331 12.519 90.364 37.546 25.033 25.026 37.548 55.15 37.548 90.36 0 35.216-12.519 65.331-37.548 90.36z"></path>
              </svg>
            </button>
          </div>
        </form>
        <Link href="/newAd" className="button link-button">
          <span className="mobile-short-label">Publier</span>
          <span className="desktop-long-label">Publier une annonce</span>
        </Link>
      </div>
      <nav className="flex pl-2 h-[54px]">
        {categories.map((cat) => {
          const [firstLetter, ...resetOfCatName] = cat.name.split("");
          const catName = firstLetter.toUpperCase() + resetOfCatName.join("");
          const isActive = router.query.categoryId === cat.id.toString();

          return (
            <div
              className={`p-2 rounded-lg mt-3 cursor-pointer ${
                isActive ? "bg-[#ffa41b] text-white" : ""
              }`}
              onClick={() => {
                router.push(
                  "/search?" +
                    qs.stringify({
                      ...searchParams,
                      categoryId: isActive ? undefined : cat.id,
                    })
                );
              }}
              key={catName}
            >
              {catName}
            </div>
          );
        })}
      </nav>
    </header>
  );
}
