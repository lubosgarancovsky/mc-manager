import React from "react";
import { openFolder, Resourcepack } from "../../utils";
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog";
import { ResourceActions } from "../ResourceActions";
import { useResource } from "../../hooks";
import { ResourceCard } from "../ResourceCard";

const ResourcepacksList: React.FC = ({}) => {
  const {
    displayedData,
    dataToDelete,
    search,
    handleSearch,
    setDataToDelete,
    loadData,
    addData,
    removeData,
  } = useResource<Resourcepack>({
    getDataFn: "get_resourcepacks",
    addDataFn: "add_resourcepack",
    removeDataFn: "remove_resourcepack",
    extensions: ["rar", "zip"],
  });

  const openRespacksFolder = async () => {
    await openFolder("resourcepacks_folder_path");
  };

  return (
    <>
      <DeleteConfirmationDialog
        isOpen={!!dataToDelete}
        title={
          dataToDelete
            ? `Are you sure you want to delete ${dataToDelete?.name}?`
            : ""
        }
        onDelete={removeData}
        onClose={() => setDataToDelete(null)}
      >
        After you delete this resource pack it will be permanently removed from
        your computer.
      </DeleteConfirmationDialog>

      <div className="flex flex-col gap-6 h-full">
        <h2>Resource packs</h2>
        <ResourceActions
          addData={addData}
          loadData={loadData}
          openFolder={openRespacksFolder}
          search={search}
          handleSearch={handleSearch}
        />

        {!displayedData.length && (
          <div className="text-foreground-300 text-center rounded-xl h-fit p-6 w-full">
            No resource packs found
          </div>
        )}

        <div className="grid grid-cols-3 2xl:grid-cols-5 gap-3 h-[calc(100%_-_200px)] min-h-[12rem]">
          {displayedData.map((item: Resourcepack, i: number) => (
            <ResourceCard
              key={i}
              item={item}
              setDataToDelete={setDataToDelete}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ResourcepacksList;
