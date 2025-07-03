import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/shared/components/Header";
import Question from "@/features/recommend/components/Question";
import RecommendFooter from "@/features/recommend/components/RecommendFooter";
import { surveyQuestions } from "@/features/recommend/constants/survey";

import {
  mapPerson,
  mapTime,
  mapView,
  mapWish,
  mapMood,
} from "@/features/recommend/utils/mapSurvey";
import { postSurvey } from "@/features/recommend/api/surveyApi";

const Survey = () => {
  const navigate = useNavigate();
  const { step: stepParam } = useParams();
  const step = stepParam ? parseInt(stepParam, 10) - 1 : 0;

  const [answers, setAnswers] = useState<(number | number[] | null)[]>(
    surveyQuestions.map((q) => (q.multiple ? [] : null))
  );

  const [loading, setLoading] = useState(false);

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

  const handleNext = async () => {
    if (step < surveyQuestions.length - 1) {
      navigate(`/recommend/survey/${step + 2}`);
    } else {
      setLoading(true);

      const payload = {
        "1": Array.isArray(answers[0])
          ? (answers[0] as number[])
              .map((i) => surveyQuestions[0].options[i])
              .join(",")
          : surveyQuestions[0].options[answers[0] as number] || "",
        "2": mapPerson(surveyQuestions[1].options[answers[1] as number]),
        "3": mapTime(surveyQuestions[2].options[answers[2] as number]),
        "4": mapView(surveyQuestions[3].options[answers[3] as number]),
        "5": mapWish(surveyQuestions[4].options[answers[4] as number]),
        "6": mapMood(surveyQuestions[5].options[answers[5] as number]),
      };

      try {
        const res = await postSurvey(payload);

        navigate("/recommend/result", {
          state: {
            market: res.data["추천시장"],
            x: res.data.x,
            y: res.data.y,
            region: res.data.region,
          },
        });
      } catch (error) {
        console.error("추천 요청 실패:", error);
        alert("추천 코스 생성에 실패했습니다.");
        setLoading(false);
      }
    }
  };

  const handlePrev = () => {
    if (step > 0) navigate(`/recommend/survey/${step}`);
  };

  const q = surveyQuestions[step];
  const isDisabled = (() => {
    const selected = answers[step];
    if (q.multiple) return !Array.isArray(selected) || selected.length === 0;
    return selected === null;
  })();

  return (
    <div className="flex flex-col h-full">
      <Header
        title="AI 추천 코스"
        showBack={false}
        showClose={true}
        onClosePath="/market"
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center text-center mt-[68px]">
          <h1 className="text-headline1 mb-[8px]">
            취향 접수 완료!
            <br />
            지금 바로 맞춤 코스 짜는 중...
          </h1>
          <p className="text-body2 text-subtext mb-[106px]">
            핫플부터 조용한 골목길까지, 당신만의 루트가 곧 완성됩니다!
          </p>
        </div>
      ) : (
        <div className="px-[32px] overflow-y-auto scrollbar-hide flex-1 max-h-[73vh]">
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
      )}
    </div>
  );
};

export default Survey;
