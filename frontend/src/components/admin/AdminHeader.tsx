import Link from "next/link";
import ActiveLink from "./ActiveLink";

export default function AdminHeader() {
  const navLinks = [
    { label: "Categories", href: "/admin/categories" },
    { label: "Tags", href: "/admin/tags" },
  ];

  return (
    <header className="h-full b p-6 bg-slate-200">
      <Link href={"/admin"}>
        <h1 className="text-xl mb-4">Admin TGC</h1>
      </Link>

      <div className="flex flex-col">
        {navLinks.map((l) => (
          <ActiveLink
            key={l.href}
            href={l.href}
            className="p-2 rounded-md"
            activeClassName="bg-slate-400"
          >
            {l.label}
          </ActiveLink>
        ))}
      </div>
    </header>
  );
}
