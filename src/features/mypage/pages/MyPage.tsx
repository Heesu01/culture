import { logout } from "@/features/auth/api/authApi";
import Header from "@/shared/components/Header";
import { useNavigate } from "react-router-dom";
import chatbotIcon from "@/features/market/assets/chatbot.png";
import my1 from "@/features/mypage/assets/my1.png";

const MyPage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logout();
      console.log("로그아웃 성공:", res.message);
      alert(res.message || "로그아웃 되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  return (
    <div className="p-[32px] bg-grayBg flex flex-col h-screen">
      <Header title="마이페이지" showBack={false} />

      <div className="flex items-center gap-[20px] mt-[32px] mb-[30px]">
        <div className="w-[90px] h-[90px] rounded-full bg-white flex items-center justify-center shadow">
          <img src={chatbotIcon} alt="프로필" className="w-[52px] h-[58px]" />
        </div>
        <span className="text-subtitle1">홍길동</span>
      </div>

      <div className="bg-white rounded-[12px] px-[24px] py-[20px] mb-[20px] flex justify-between text-body3">
        <span>도장깨기 완료</span>
        <span>
          총 <span className="text-primary">12 시장</span>
        </span>
      </div>

      <div className="bg-white rounded-[12px] text-body3 flex justify-between divide-x divide-deactivate py-[17px]">
        <button className="w-1/2 flex flex-col items-center py-[3px]">
          <img src={my1} alt="My 도감" className="w-[60px] h-[60px] mb-[8px]" />
          <span>My 도감</span>
        </button>
        <button className="w-1/2 flex flex-col items-center py-[3px]">
          <img
            src={my1}
            alt="AI 시장코스"
            className="w-[60px] h-[60px] mb-[8px]"
          />
          <span>AI 시장코스</span>
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="mt-[30px] mx-auto bg-white text-deactivate-text text-body4 px-[15px] py-[8px] rounded-full  "
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
