import React from "react";
import { fileSize } from "../../utils";
import { AddIcon, ArrowDownIcon, DeleteIcon, ReloadIcon } from "../../icons";
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
import { Input } from "@nextui-org/input";
import { Progress } from "@nextui-org/progress";
import DeleteModDialog from "./DeleteModDialog";
import useModsTable from "./use-mods-table";

const ModsTable: React.FC = ({}) => {
  const {
    mods,
    allDisabled,
    modToDelete,
    enabledCount,
    search,
    loadMods,
    setModToDelete,
    handleChange,
    handleAddMod,
    handleSearch,
    handleDelete,
    handleSwitchAllModes,
  } = useModsTable();

  return (
    <>
      <DeleteModDialog
        mod={modToDelete}
        onDelete={handleDelete}
        onClose={() => setModToDelete(null)}
      />
      <div className="flex flex-col gap-6 h-full">
        <div className="flex justify-between">
          <h2>Installed mods</h2>
          <Progress
            className="max-w-[24rem]"
            size="sm"
            label={`${enabledCount} / ${mods.length} mods active`}
            value={(enabledCount / mods.length) * 100}
          />
        </div>
        <div className="flex gap-3 items-center">
          <Button isIconOnly onPress={handleAddMod}>
            <AddIcon className="w-5" />
          </Button>
          <Button isIconOnly onPress={loadMods}>
            <ReloadIcon className="w-5" />
          </Button>
          <Input
            placeholder="Search..."
            value={search}
            onChange={handleSearch}
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
            {mods.map((mod, i) => (
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
                        onPress={() => setModToDelete(mod)}
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
