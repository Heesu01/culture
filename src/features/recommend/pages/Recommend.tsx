import { useNavigate } from "react-router-dom";
import Header from "@/shared/components/Header";
import startImg from "@/features/recommend/assets/start.png";
import Button from "@/shared/components/Button";

const Recommend = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/recommend/survey/1");
  };

  return (
    <div className="flex flex-col h-full ">
      <Header
        title="AI 추천 코스"
        showBack={false}
        showClose={true}
        onClosePath="/"
      />
      <div className="flex flex-col items-center justify-center text-center pt-[120px]">
        <h1 className="text-headline1 ">
          어디부터 돌아볼지 모르겠다면?
          <br /> AI한테 추천 한번 받아볼래?
        </h1>
        <p className="text-body2 text-subtext mt-[8px]">
          당신에게 딱 맞춘 시장 코스를 추천해드려요!
        </p>

        <img
          src={startImg}
          alt="추천 캐릭터"
          className="mt-[70px] w-[174px] h-[198px] "
        />
      </div>
      <div className="absolute bottom-[50px] w-full flex justify-center px-[32px]">
        <Button
          variant="primary"
          onClick={handleStart}
          className="w-full text-subtitle1"
        >
          시작하기
        </Button>
      </div>
    </div>
  );
};

export default Recommend;
