import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./shared/components/NavBar";

const App = () => {
  const location = useLocation();

  const visiblePaths = ["/market", "/mypage", "/stamp"];
  const showNav =
    visiblePaths.includes(location.pathname) ||
    location.pathname.startsWith("/market/");

  return (
    <div className="flex flex-col min-h-screen pt-[56px]">
      <Outlet />
      {showNav && <NavBar />}
    </div>
  );
};

export default App;
