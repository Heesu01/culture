import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./shared/components/NavBar";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isMarketDetail = /^\/market\/[^/]+\/[^/]+$/.test(location.pathname);

  const visiblePaths = ["/market", "/mypage", "/stamp"];
  const showNav =
    !isMarketDetail &&
    (visiblePaths.includes(location.pathname) ||
      location.pathname.startsWith("/market/"));

  useEffect(() => {
    const isTokenExpired = (token: string | null) => {
      if (!token) return true;

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const expirationTime = payload.exp * 1000;
        return Date.now() > expirationTime;
      } catch {
        return true;
      }
    };

    const token = localStorage.getItem("accessToken");

    if (isTokenExpired(token)) {
      localStorage.removeItem("accessToken");
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  return (
    <div className="flex flex-col min-h-screen pt-[56px]">
      <Outlet />
      {showNav && <NavBar />}
    </div>
  );
};

export default App;
