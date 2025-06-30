import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/shared/components/Header";
import Question from "@/features/recommend/components/Question";
import RecommendFooter from "@/features/recommend/components/RecommendFooter";
import { surveyQuestions } from "@/features/recommend/constants/survey";

const Survey = () => {
  const navigate = useNavigate();
  const { step: stepParam } = useParams();
  const step = stepParam ? parseInt(stepParam, 10) - 1 : 0;
  const [answers, setAnswers] = useState<(number | number[] | null)[]>(
    surveyQuestions.map((q) => (q.multiple ? [] : null))
  );

  useEffect(() => {
    if (step < 0 || step >= surveyQuestions.length) {
      navigate("/recommend/survey/1", { replace: true });
    }
    // eslint-disable-next-line
  }, [step]);

  const handleSelect = (index: number) => {
    const q = surveyQuestions[step];
    if (q.multiple) {
      const prev = answers[step] as number[];
      let newArr = Array.isArray(prev) ? [...prev] : [];
      if (newArr.includes(index)) {
        newArr = newArr.filter((i) => i !== index);
      } else {
        newArr.push(index);
      }
      setAnswers((prevAnswers) => {
        const copy = [...prevAnswers];
        copy[step] = newArr;
        return copy;
      });
    } else {
      setAnswers((prevAnswers) => {
        const copy = [...prevAnswers];
        copy[step] = index;
        return copy;
      });
    }
  };

  const handleNext = () => {
    if (step < surveyQuestions.length - 1) {
      navigate(`/recommend/survey/${step + 2}`);
    } else {
      console.log("모든 답변:", answers);
      navigate("/recommend/result");
    }
  };

  const handlePrev = () => {
    if (step > 0) navigate(`/recommend/survey/${step}`);
  };

  const q = surveyQuestions[step];
  const isDisabled = (() => {
    const q = surveyQuestions[step];
    const selected = answers[step];
    if (q.multiple) return !Array.isArray(selected) || selected.length === 0;
    return selected === null;
  })();

  return (
    <div className="flex flex-col h-full ">
      <Header
        title="AI 추천 코스"
        showBack={false}
        showClose={true}
        onClosePath="/"
      />
      <div className="px-[32px] overflow-y-auto flex-1 max-h-[62vh]">
        <Question
          title={q.title}
          subtitle={q.subtitle}
          options={q.options}
          selectedIndex={answers[step]}
          onSelect={handleSelect}
          multiple={!!q.multiple}
          grid={!!q.grid}
        />
        <RecommendFooter
          step={step}
          total={surveyQuestions.length}
          onPrev={handlePrev}
          onNext={handleNext}
          isNextDisabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default Survey;
