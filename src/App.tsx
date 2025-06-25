import { Outlet } from "react-router-dom";
import Header from "./shared/components/Header";
import NavBar from "./shared/components/NavBar";

const App = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <NavBar />
    </div>
  );
};

export default App;
