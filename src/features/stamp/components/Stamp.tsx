import stamp from "@/features/stamp/assets//stamp.png";

interface StampBadgeProps {
  name: string;
}

const StampBadge = ({ name }: StampBadgeProps) => {
  const displayName = name.replace(/시장$/, "");

  return (
    <div className="relative inline-block w-[80px] h-[80px]">
      <img
        src={stamp}
        alt="스탬프 배지"
        className="w-full h-full object-contain"
      />

      <span className="absolute inset-0 flex items-center justify-center text-primary font-bold mb-[2px]">
        {displayName}
      </span>
    </div>
  );
};
export default StampBadge;
