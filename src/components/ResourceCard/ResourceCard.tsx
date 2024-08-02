import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import React from "react";
import { FolderIcon, MoreIcon, DeleteIcon } from "../../icons";
import { fileSize, Resource } from "../../utils";

interface ResourceCardProps<T> {
  item: T;
  setDataToDelete: React.Dispatch<React.SetStateAction<Resource<T> | null>>;
}

const ResourceCard: React.FC<ResourceCardProps<any>> = ({
  item,
  setDataToDelete,
}) => {
  return (
    <div className="rounded-xl border border-default-100 p-4 flex flex-col gap-3 h-fit">
      <div className="flex items-center justify-between">
        <FolderIcon className="w-8" />
        <Dropdown className="dark">
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <MoreIcon className="w-5" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              startContent={<DeleteIcon className="w-5" />}
              onPress={() => setDataToDelete(item)}
            >
              Remove
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <span className="break-all">{item.name}</span>
      <span className="text-sm text-foreground-400">{fileSize(item.size)}</span>
    </div>
  );
};

export default ResourceCard;
