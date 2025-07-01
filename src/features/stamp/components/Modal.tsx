import type { ModalProps } from "@/features/stamp/types/modal";

const Modal = ({ title, description, onConfirm, onCancel }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-[20px] p-[20px] w-[85%] max-w-[400px]">
        <h2 className="text-subtitle1 mb-[8px]">{title}</h2>
        <p className="text-body2 text-subtext mb-[20px] whitespace-pre-line">
          {description}
        </p>
        <div className="flex gap-[10px] text-subtitle1">
          <button
            onClick={onCancel}
            className="flex-1 py-[12px] bg-deactivate text-deactivate-text rounded-[16px]"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-[12px] bg-primary text-white rounded-[16px]"
          >
            인증
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
