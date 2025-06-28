import { logout } from "@/features/auth/api/authApi";
import { useNavigate } from "react-router-dom";

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
    <div className="p-4">
      <h1 className="text-xl mb-4">마이페이지 (임시)</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
