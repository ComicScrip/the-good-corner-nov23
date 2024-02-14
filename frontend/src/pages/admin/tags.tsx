import AdminTagRow from "@/components/admin/AdminTagRow";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  useAllTagsQuery,
  useCreateTagMutation,
  useDeleteTagMutation,
} from "@/graphql/generated/schema";

export default function AdminTags() {
  const { data, refetch } = useAllTagsQuery();
  const tags = data?.tags || [];

  const [createTag] = useCreateTagMutation();
  const [deleteTag] = useDeleteTagMutation();

  const handleDeleteTag = async (id: number) => {
    try {
      await deleteTag({ variables: { tagId: id } });
      refetch();
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
            await createTag({ variables: { data: json as any } });
            refetch();
            form.reset();
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
