import Button from "@/shared/components/Button";
import { useNavigate } from "react-router-dom";
import type { RegionModalProps } from "@/features/market/types/region";

const RegionModal = ({ region }: RegionModalProps) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate(`/market/${region.name}`);
  };

  return (
    <div className="absolute bottom-[71px] left-1/2 w-full -translate-x-1/2 rounded-[24px] rounded-b-none bg-white px-[32px] pt-[42px] z-50">
      <p className="text-[20px] font-semibold mb-[4px]">{region.name}</p>
      <p className="text-body2 text-[#767676] mb-[12px]">
        {region.description}
      </p>
      <iframe
        className="w-full h-[154px] rounded-[12px]"
        src={region.video}
        title="시장 영상"
        allowFullScreen
      ></iframe>
      <Button
        variant="primary"
        onClick={handleExplore}
        className="w-full text-subtitle1 mb-[19px] mt-[25px]"
      >
        둘러보기
      </Button>
    </div>
  );
};

export default RegionModal;
