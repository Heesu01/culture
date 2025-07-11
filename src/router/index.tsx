import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Home from "@/features/market/pages/Home";
import RegionDetail from "@/features/market/pages/RegionDetail";
import MarketDetail from "@/features/market/pages/MarketDetail";
import BoardDetail from "@/features/market/pages/BoardDetail";
import ChatBot from "@/features/market/pages/ChatBot";
import Login from "@/features/auth/pages/Login";
import Signup from "@/features/auth/pages/Signup";
import SurveyPage from "@/features/recommend/pages/Survey";
import RecommendPage from "@/features/recommend/pages/Recommend";
import RecommendResult from "@/features/recommend/pages/RecommendResult";
import MyPage from "@/features/mypage/pages/MyPage";
import Rank from "@/features/mypage/pages/Rank";
import StampMap from "@/features/stamp/pages/StampMap";
import Certification from "@/features/stamp/pages/Certification";
import MyStampList from "@/features/stamp/pages/MyStampList";
import StampDetail from "@/features/stamp/pages/StampDetail";
import Splash from "@/shared/components/Spash";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Splash /> },
      { path: "market", element: <Home /> },
      { path: "market/:regionName", element: <RegionDetail /> },
      { path: "market/:regionName/:marketName", element: <MarketDetail /> },
      {
        path: "market/:regionName/:marketName/:boardId",
        element: <BoardDetail />,
      },
      { path: "chatbot", element: <ChatBot /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "recommend", element: <RecommendPage /> },
      { path: "recommend/survey/:step", element: <SurveyPage /> },
      { path: "recommend/result", element: <RecommendResult /> },
      { path: "mypage", element: <MyPage /> },
      { path: "rank", element: <Rank /> },
      { path: "stamp", element: <StampMap /> },
      { path: "stamp/certification", element: <Certification /> },
      { path: "stamp/mystamp", element: <MyStampList /> },
      { path: "stamp/mystamp/:region", element: <StampDetail /> },
    ],
  },
]);
