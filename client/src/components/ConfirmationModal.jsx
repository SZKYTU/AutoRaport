import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const ConfirmationModal = ({
  title = "",
  description = "",
  onConfirm = () => {},
  onCancel = () => {},
  isOpen = false,
  toggleOpen = () => {},
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggleOpen}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{description}</ModalBody>
      <ModalFooter>
        <Button color={"secondary"} onClick={onCancel}>
          Anuluj
        </Button>
        <Button color={"primary"} onClick={onConfirm}>
          Potwierdź
        </Button>
      </ModalFooter>
    </Modal>
  );
};
