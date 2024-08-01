import React from "react";
import { Mod } from "../../utils";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

interface DeleteModDialogProps {
  mod: Mod | null;
  onDelete: () => void;
  onClose: () => void;
}

const DeleteModDialog: React.FC<DeleteModDialogProps> = ({
  mod,
  onDelete,
  onClose,
}) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal isOpen={!!mod} onOpenChange={onClose} backdrop="blur">
      <ModalContent className="dark text-foreground">
        {(onClose) => (
          <>
            <ModalHeader>
              Are you sure you want to delete {mod?.name}?
            </ModalHeader>
            <ModalBody>
              After you delete this mod it will be permanently removed from your
              computer.
            </ModalBody>
            <ModalFooter>
              <Button onPress={handleDelete} color="danger">
                Delete
              </Button>
              <Button onPress={onClose}>Keep the mod</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteModDialog;
