import { useEffect, useState } from "react";
import { logout } from "@/features/auth/api/authApi";
import { getUserInfo } from "@/features/mypage/api/userApi";
import type { UserInfo } from "@/features/mypage/types/user";
import Header from "@/shared/components/Header";
import { useNavigate } from "react-router-dom";
import chatbotIcon from "@/features/market/assets/chatbot.png";
import my1 from "@/features/mypage/assets/my1.png";

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error("유저 정보 조회 실패:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="px-[32px] bg-grayBg flex flex-col h-screen">
      <Header title="마이페이지" showBack={false} />

      <div className="flex items-center gap-[20px] mt-[32px] mb-[30px]">
        <div className="w-[90px] h-[90px] rounded-full bg-white flex items-center justify-center shadow">
          <img src={chatbotIcon} alt="프로필" className="w-[52px] h-[58px]" />
        </div>
        <span className="text-subtitle1">{userInfo?.name || "이름없음"}</span>
      </div>

      <button
        onClick={() => navigate("/stamp/mystamp")}
        className="w-full bg-white rounded-[12px] px-[24px] py-[20px] mb-[8px] flex justify-between text-body3"
      >
        <span>도장깨기 완료</span>
        <span>
          총{" "}
          <span className="text-primary">
            {userInfo?.visitMarketCount ?? 0} 시장
          </span>
        </span>
      </button>

      <button
        onClick={() => navigate("/rank")}
        className="w-full bg-white rounded-[12px] px-[24px] py-[20px] mb-[20px] flex justify-between text-body3"
      >
        <span>유저랭킹</span>
        <span>
          <span className="text-primary">{userInfo?.ranking ?? 0} 위</span>
        </span>
      </button>

      <div className="bg-white rounded-[12px] text-body3 flex justify-between divide-x divide-deactivate py-[17px]">
        <button
          onClick={() => navigate("/stamp/mystamp")}
          className="w-1/2 flex flex-col items-center py-[3px]"
        >
          <img src={my1} alt="My 도감" className="w-[60px] h-[60px] mb-[8px]" />
          <span>My 도감</span>
        </button>

        <button
          onClick={() => navigate("/recommend")}
          className="w-1/2 flex flex-col items-center py-[3px]"
        >
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
        className="mt-[39px] mx-auto bg-white text-deactivate-text text-body4 px-[15px] py-[8px] rounded-full"
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
