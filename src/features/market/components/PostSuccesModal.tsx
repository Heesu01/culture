import type { ModalProps } from "@/features/stamp/types/modal";

const PostSuccessModal = ({ title, description, onConfirm }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-[20px] p-[24px] w-[85%] max-w-[400px]">
        <h2 className="text-subtitle1 mb-[8px]">{title}</h2>
        <p className="text-body2 text-subtext mb-[20px] whitespace-pre-line leading-[1.5]">
          {description}
        </p>
        <button
          onClick={onConfirm}
          className="w-full py-[12px] bg-[#FF7A00] text-white rounded-[16px] text-subtitle1"
        >
          보러가기
        </button>
      </div>
    </div>
  );
};

export default PostSuccessModal;
