import { Outlet } from "react-router-dom";
import NavBar from "./shared/components/NavBar";

const App = () => {
  return (
    <div>
      <Outlet />
      <NavBar />
    </div>
  );
};

export default App;
