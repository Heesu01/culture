import completeCharacter from "@/features/stamp/assets/100.png";
import closeIcon from "@/features/stamp/assets/close.png";
import type { CompleteModalProps } from "@/features/stamp/types/modal";

const CompleteModal = ({ region, onClose }: CompleteModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center z-50 pt-[53px]">
      <div className="relative text-center">
        <button onClick={onClose} className="absolute top-[10px] right-0">
          <img src={closeIcon} alt="닫기" className="w-[12px] h-[12px]" />
        </button>

        <img
          src={completeCharacter}
          alt="축하 캐릭터"
          className="w-[90%] h-auto mx-auto mb-[32px]"
        />
        <h2 className="text-headline1 text-white mb-[8px]">
          {region} 시장 도장깨기 완료!
        </h2>
        <p className="text-body2 text-white">
          정말 대단해요!
          <br />
          {region}에 있는 모든 시장을 다 다녀왔어요.
        </p>
      </div>
    </div>
  );
};

export default CompleteModal;
