import AdminTagRow from "@/components/admin/AdminTagRow";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tag } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminTags() {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    axios
      .get<Tag[]>("http://localhost:4000/tags")
      .then((res) => setTags(res.data))
      .catch(console.error);
  }, []);

  const handleDeleteTag = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/tags/${id}`);
      setTags((tagList) => tagList?.filter((t) => t.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout title="gestion des tags - TGC">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const data = new FormData(form);
          const json = Object.fromEntries(data.entries());

          try {
            const newTag = (
              await axios.post("http://localhost:4000/tags", json)
            ).data;
            form.reset();
            setTags((oldList) => [newTag, ...oldList]);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <label htmlFor="name">
          Nouveau Tag :{" "}
          <input
            type="text"
            id="name"
            name="name"
            className="input mr-2"
            required
          />
        </label>

        <button className="btn">Enregistrer</button>
      </form>

      {tags?.length !== 0 && (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags?.map((c) => (
              <AdminTagRow
                key={c.id}
                handleDeleteTag={handleDeleteTag}
                tag={c}
              />
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}
