import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  deleteLabel?: string;
  cancelLabel?: string;
  onDelete: () => void;
  onClose: () => void;
  children?: React.ReactNode;
}

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  isOpen,
  title,
  children,
  deleteLabel = "Delete",
  cancelLabel = "Cancel",
  onDelete,
  onClose,
}) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} backdrop="blur">
      <ModalContent className="dark text-foreground">
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button onPress={handleDelete} color="danger">
                {deleteLabel}
              </Button>
              <Button onPress={onClose}>{cancelLabel}</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationDialog;
