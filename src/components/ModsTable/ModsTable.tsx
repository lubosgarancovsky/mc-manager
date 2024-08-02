import React, { useMemo } from "react";
import { fileSize, Mod, openFolder } from "../../utils";
import { ArrowDownIcon, DeleteIcon } from "../../icons";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { cn } from "@nextui-org/theme";
import { Progress } from "@nextui-org/progress";
import { invoke } from "@tauri-apps/api";
import { useResource } from "../../hooks";
import { DeleteConfirmationDialog } from "../DeleteConfirmationDialog";
import { ResourceActions } from "../ResourceActions";

const ModsTable: React.FC = ({}) => {
  const {
    data,
    displayedData,
    dataToDelete,
    search,
    handleSearch,
    setDataToDelete,
    loadData,
    addData,
    removeData,
  } = useResource<Mod>({
    getDataFn: "list_mods",
    addDataFn: "add_mod",
    removeDataFn: "remove_mod",
    extensions: ["jar"],
  });

  const handleChange = async (mod: Mod) => {
    await invoke("change_status", { item: mod });
    await loadData();
  };

  const enabledCount = useMemo(() => {
    return data.filter((mod) => mod.enabled).length;
  }, [data]);

  const handleSwitchAllModes = async (toEnabled: boolean) => {
    await invoke(toEnabled ? "enable_all_mods" : "disable_all_mods");
    loadData();
  };

  const openModsFolder = async () => {
    await openFolder("mods_folder_path");
  };

  const allDisabled = enabledCount === 0 && data.length > 0;

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
        After you delete this mod, it will be permanently removed from your
        computer.
      </DeleteConfirmationDialog>

      <div className="flex flex-col gap-6 h-full">
        <div className="flex justify-between">
          <h2>Installed mods</h2>
          <Progress
            className="max-w-[24rem]"
            size="sm"
            label={`${enabledCount} / ${data.length} mods active`}
            value={(enabledCount / data.length) * 100}
          />
        </div>
        <div className="flex gap-3 items-center">
          <ResourceActions
            addData={addData}
            loadData={loadData}
            openFolder={openModsFolder}
            search={search}
            handleSearch={handleSearch}
          />
          <Button
            color={allDisabled ? "success" : "danger"}
            onPress={() => handleSwitchAllModes(allDisabled)}
          >
            {allDisabled ? "Enable all" : "Disable all"}
          </Button>
        </div>

        <Table
          aria-label="List of installed mods"
          className="h-[calc(100%_-_200px)] min-h-[12rem]"
        >
          <TableHeader>
            <TableColumn>Title</TableColumn>
            <TableColumn align="end">Size</TableColumn>
            <TableColumn align="end">Actions</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No mods are installed yet."}>
            {displayedData.map((mod, i) => (
              <TableRow key={i}>
                <TableCell
                  className={cn("duration-300", {
                    "line-through opacity-40": !mod.enabled,
                  })}
                >
                  {mod.name}
                </TableCell>
                <TableCell className="opacity-60" align="right">
                  {fileSize(mod.size)}
                </TableCell>
                <TableCell align="right">
                  <Dropdown className="dark">
                    <ButtonGroup size="sm">
                      <Button
                        color={mod.enabled ? "success" : "danger"}
                        onPress={() => handleChange(mod)}
                      >
                        {mod.enabled ? "Enabled" : "Disabled"}
                      </Button>
                      <DropdownTrigger>
                        <Button
                          color={mod.enabled ? "success" : "danger"}
                          isIconOnly
                        >
                          <ArrowDownIcon />
                        </Button>
                      </DropdownTrigger>
                    </ButtonGroup>
                    <DropdownMenu>
                      <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        startContent={<DeleteIcon className="w-5" />}
                        onPress={() => setDataToDelete(mod)}
                      >
                        Delete mod
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ModsTable;
