import React from "react";
import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import { AddIcon, ReloadIcon, FolderIcon } from "../../icons";
import { Input } from "@nextui-org/input";

interface ResourceActionsProps {
  addData: () => void;
  loadData: () => void;
  openFolder: () => void;
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addBtnTooltip?: string;
  refreshBtnTooltip?: string;
  folderBtnTooltip?: string;
}

const ResourceActions: React.FC<ResourceActionsProps> = ({
  addData,
  loadData,
  openFolder,
  handleSearch,
  search,
  addBtnTooltip = "Add new",
  refreshBtnTooltip = "Refresh",
  folderBtnTooltip = "Open folder",
}) => {
  return (
    <div className="flex gap-3 items-center w-full">
      <Tooltip content={addBtnTooltip} closeDelay={0}>
        <Button isIconOnly onPress={addData}>
          <AddIcon className="w-5" />
        </Button>
      </Tooltip>

      <Tooltip content={refreshBtnTooltip} closeDelay={0}>
        <Button isIconOnly onPress={loadData}>
          <ReloadIcon className="w-5" />
        </Button>
      </Tooltip>

      <Tooltip content={folderBtnTooltip} closeDelay={0}>
        <Button isIconOnly onPress={openFolder}>
          <FolderIcon className="w-5" />
        </Button>
      </Tooltip>

      <Input placeholder="Search..." value={search} onChange={handleSearch} />
    </div>
  );
};

export default ResourceActions;
