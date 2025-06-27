import Button from "@/features/recommend/components/Button";
import type { RecommendFooterProps } from "@/features/recommend/types/footer";

const RecommendFooter = ({
  step,
  total,
  onPrev,
  onNext,
  isNextDisabled,
}: RecommendFooterProps) => {
  const isFirst = step === 0;
  const isLast = step === total - 1;

  return (
    <div className="fixed bottom-[50px] left-0 w-full px-[32px]">
      <div className="flex justify-center mb-[32px]">
        <div className="flex gap-[8px]">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`rounded-full ${
                i === step ? "w-[32px] bg-primary" : "w-[8px] bg-[#626877]"
              } h-2 transition-all duration-200`}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4 justify-center">
        {!isFirst && (
          <Button variant="secondary" onClick={onPrev} className="w-1/2">
            이전
          </Button>
        )}
        <Button
          variant="primary"
          onClick={onNext}
          className={`${!isFirst ? "w-1/2" : "w-full"}`}
          disabled={isNextDisabled}
        >
          {isLast ? "추천코스 확인" : "다음"}
        </Button>
      </div>
    </div>
  );
};

export default RecommendFooter;
