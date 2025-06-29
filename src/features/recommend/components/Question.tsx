import type { SurveyQuestionProps } from "@/features/recommend/types/question";

const Question = ({
  title,
  subtitle,
  options,
  selectedIndex,
  onSelect,
  multiple = false,
  grid = false,
}: SurveyQuestionProps & { multiple?: boolean }) => {
  return (
    <div className="text-center mt-[24px]">
      <div className="text-headline1">{title}</div>
      {subtitle && (
        <p className="text-body2 text-subtext mt-[8px] mb-[50px]">{subtitle}</p>
      )}

      <div className={`space-y-[8px] ${grid ? "grid grid-cols-2 gap-2" : ""}`}>
        {options.map((option, index) => {
          const isSelected = multiple
            ? Array.isArray(selectedIndex) && selectedIndex.includes(index)
            : selectedIndex === index;
          return (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`text-body1 w-full h-[64px] px-[20px] rounded-[16px] border flex items-center justify-between ${
                isSelected
                  ? "bg-primary/10 border-primary border-[1px]"
                  : "border-grayLine"
              }`}
            >
              <span>{option}</span>
              <span
                className={`w-[20px] h-[20px] rounded-full border flex items-center justify-center ${
                  isSelected ? "border-primary" : "border-grayLine"
                }`}
              >
                {isSelected && (
                  <span className="w-[10px] h-[10px] bg-primary rounded-full"></span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
