import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export const InfoModal = ({
  title = "",
  description = "",
  onClose = () => {},
  isOpen = false,
  toggleOpen = () => {},
}) => {
  return (
    <Modal isOpen={isOpen} toggle={toggleOpen}>
      <ModalHeader toggle={toggleOpen}>{title}</ModalHeader>
      <ModalBody>{description}</ModalBody>
      <ModalFooter>
        <Button color={"secondary"} onClick={onClose}>
          Zamknij
        </Button>
      </ModalFooter>
    </Modal>
  );
};