import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./shared/components/NavBar";

const App = () => {
  const location = useLocation();

  const hideNav = ["/login", "/signup"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
      {!hideNav && <NavBar />}
    </div>
  );
};

export default App;
