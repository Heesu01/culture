import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/features/home/pages/Home";
import Login from "@/features/auth/pages/Login";
import Signup from "@/features/auth/pages/Signup";
import SurveyPage from "@/features/recommend/pages/Survey";
import RecommendPage from "@/features/recommend/pages/Recommend";
import RecommendResult from "@/features/recommend/pages/RecommendResult";
import MyPage from "@/features/mypage/pages/MyPage";
import MyStampList from "@/features/mypage/pages/MyStampList";
import StampMap from "@/features/stamp/pages/StampMap";
import StampDetail from "@/features/stamp/pages/StampDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "recommend", element: <RecommendPage /> },
      { path: "recommend/survey/:step", element: <SurveyPage /> },
      { path: "recommend/result", element: <RecommendResult /> },
      { path: "mypage", element: <MyPage /> },
      { path: "mypage/stamp", element: <MyStampList /> },
      { path: "stamp", element: <StampMap /> },
      { path: "stamp/detail", element: <StampDetail /> },
    ],
  },
]);
