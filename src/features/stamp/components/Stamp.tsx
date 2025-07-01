import stamp from "@/features/stamp/assets/stamp.png";
import stampNo from "@/features/stamp/assets/stampNo.png";
import type { StampBadgeProps } from "../types/stamp";

const StampBadge = ({ name, visited }: StampBadgeProps) => {
  const trimmed = name.replace(/시장$/, "");

  let displayName = trimmed;
  if (trimmed.length === 4) {
    displayName = trimmed.slice(0, 2);
  } else if (trimmed.length >= 5) {
    displayName = trimmed.slice(0, 3);
  }

  return (
    <div className="relative inline-block w-[80px] h-[80px]">
      <img
        src={visited ? stamp : stampNo}
        alt="스탬프 배지"
        className="w-full h-full object-contain"
      />
      <span
        className={`absolute inset-0 flex items-center justify-center font-bmdoM rotate-[10deg]
          ${visited ? "text-primary" : "text-deactivate-text"}
          `}
      >
        {displayName}
      </span>
    </div>
  );
};

export default StampBadge;
