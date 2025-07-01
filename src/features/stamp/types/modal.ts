export interface ModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface ConfirmModalProps {
  marketName: string;
  onClose: () => void;
}

export interface CompleteModalProps {
  region: string;
  onClose: () => void;
}
