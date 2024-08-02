import React from "react";
import { useResource } from "../../hooks";
import { openFolder, Shaderpack } from "../../utils";
import { ResourceActions } from "../ResourceActions";
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog";
import { ResourceCard } from "../ResourceCard";

const ShaderpacksList: React.FC = () => {
  const {
    displayedData,
    dataToDelete,
    search,
    handleSearch,
    setDataToDelete,
    loadData,
    addData,
    removeData,
  } = useResource<Shaderpack>({
    getDataFn: "get_shaders",
    addDataFn: "add_shader",
    removeDataFn: "remove_shader",
    extensions: ["rar", "zip"],
  });

  const openShadersolder = async () => {
    await openFolder("shaders_folder_path");
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
        After you delete this shaders pack it will be permanently removed from
        your computer.
      </DeleteConfirmationDialog>

      <div className="flex flex-col gap-6 h-full">
        <h2>Shader packs</h2>
        <ResourceActions
          addData={addData}
          loadData={loadData}
          openFolder={openShadersolder}
          search={search}
          handleSearch={handleSearch}
        />

        {!displayedData.length && (
          <div className="text-foreground-300 text-center rounded-xl h-fit p-6 w-full">
            No shader packs found
          </div>
        )}

        <div className="grid grid-cols-3 2xl:grid-cols-5 gap-3 h-[calc(100%_-_200px)] min-h-[12rem]">
          {displayedData.map((item: Shaderpack, i: number) => (
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

export default ShaderpacksList;
