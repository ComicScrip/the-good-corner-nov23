import AdminCategoryRow from "@/components/admin/AdminCategoryRow";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  CategoriesDocument,
  CategoriesQuery,
  useCategoriesQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/graphql/generated/schema";
import client from "@/graphql/client";

export default function AdminCategories() {
  const { data, refetch } = useCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();

  const categories = data?.categories || [];
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDeleteCategory = async (idOfCatToDelete: number) => {
    try {
      await deleteCategory({ variables: { categoryId: idOfCatToDelete } });
      client.writeQuery<CategoriesQuery>({
        query: CategoriesDocument,
        data: {
          categories: categories.filter(
            (category) => category.id != idOfCatToDelete
          ),
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AdminLayout title="gestion des categories - TGC">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const data = new FormData(form);
          const json = Object.fromEntries(data.entries());

          try {
            const { data } = await createCategory({
              variables: { data: json as any },
            });
            if (data?.createCategory) {
              CategoriesDocument;

              client.writeQuery<CategoriesQuery>({
                query: CategoriesDocument,
                data: {
                  categories: [data.createCategory, ...categories],
                },
              });
            }
            form.reset();
            refetch();
          } catch (err) {
            console.error(err);
          }
        }}
      >
        <label htmlFor="name">
          Nouvelle Catégorie :{" "}
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

      {categories?.length !== 0 && (
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((c) => (
              <AdminCategoryRow
                key={c.id}
                handleDeleteCategory={handleDeleteCategory}
                category={c}
              />
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}
