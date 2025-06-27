import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecommendHeader from "@/features/recommend/components/RecommendHeader";
import Question from "@/features/recommend/components/Question";
import RecommendFooter from "@/features/recommend/components/RecommendFooter";
import { surveyQuestions } from "@/features/recommend/constants/survey";

const Survey = () => {
  const navigate = useNavigate();
  const { step: stepParam } = useParams();
  const step = stepParam ? parseInt(stepParam, 10) - 1 : 0;
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(surveyQuestions.length).fill(null)
  );

  useEffect(() => {
    if (step < 0 || step >= surveyQuestions.length) {
      navigate("/recommend/survey/1", { replace: true });
    }
    // eslint-disable-next-line
  }, [step]);

  const handleSelect = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[step] = index;
    setAnswers(newAnswers);
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
  const selectedIndex = answers[step];
  const isDisabled = selectedIndex === null;

  return (
    <div className="flex flex-col h-full ">
      <RecommendHeader />
      <div className="px-[32px]">
        <Question
          title={q.title}
          subtitle={q.subtitle}
          options={q.options}
          selectedIndex={answers[step]}
          onSelect={handleSelect}
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
