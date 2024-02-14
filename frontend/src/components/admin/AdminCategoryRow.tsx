import { Category } from "@/types";
import { useState } from "react";

import { TrashIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { useUpdateCategoryMutation } from "@/graphql/generated/schema";

interface AdminCategoryRowProps {
  category: Category;
  handleDeleteCategory: (id: number) => Promise<void>;
}
export default function AdminCategoryRow({
  category: { id, name },
  handleDeleteCategory,
}: AdminCategoryRowProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [displayedName, setDisplayedName] = useState(name);
  const [UpdateCategory] = useUpdateCategoryMutation();
  const handleSave = async () => {
    try {
      if (displayedName) {
        await UpdateCategory({
          variables: { data: { name: displayedName }, categoryId: id },
        });
        setIsEditing(false);
      }
    } catch (err) {
      console.error(err);
      setDisplayedName(name);
    }
  };

  return (
    <tr>
      <td>{id}</td>
      <td>
        {isEditing ? (
          <input
            type="text"
            className="input"
            value={displayedName}
            onChange={(e) => setDisplayedName(e.target.value)}
          />
        ) : (
          displayedName
        )}
      </td>
      <td>
        {isEditing ? (
          <div>
            <button onClick={handleSave}>
              <CheckIcon width={24} height={24} />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setDisplayedName(name);
              }}
            >
              <XCircleIcon width={24} height={24} className="ml-2" />
            </button>
          </div>
        ) : (
          <div>
            <button onClick={() => setIsEditing(true)}>
              <PencilSquareIcon width={24} height={24} />
            </button>
            <button
              onClick={() => {
                if (
                  confirm(
                    "voulez vous vraiement supprimer la categorie ? Toutes les annonces liées seront également supprimées"
                  )
                )
                  handleDeleteCategory(id);
              }}
            >
              <TrashIcon width={24} height={24} className="ml-2" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}
