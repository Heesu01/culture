import Button from "@/shared/components/Button";
import { useNavigate } from "react-router-dom";
import type { ConfirmModalProps } from "../types/modal";

const ConfirmModal = ({ marketName }: ConfirmModalProps) => {
  const navigate = useNavigate();

  const handleGoStamp = () => {
    navigate("/stamp/certification", {
      state: { marketName: marketName },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="fixed bottom-0 w-full bg-white p-[32px] h-[389px] text-center">
        <h2 className="text-headline1  mb-[8px] ">
          현재 위치는 <span className="text-primary">{marketName}</span>
          입니다
          <br />
          바로 도장깨러 가볼까요?
        </h2>
        <p className="text-body2 text-subtext">
          아래 도장깨기 버튼을 눌러 나만의 도감을 채워보세요!
        </p>
      </div>

      <div className=" w-full fixed bottom-0  px-[32px] mb-[50px]">
        <Button onClick={handleGoStamp}>도장깨기</Button>
      </div>
    </div>
  );
};

export default ConfirmModal;
