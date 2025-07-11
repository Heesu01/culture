import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/shared/components/Header";
import Button from "@/features/recommend/components/Button";
import { getMarketBoards } from "@/features/market/api/marketApi";
import type { Board } from "@/features/market/types/market";
import heartIcon from "@/features/market/assets/heart.png";

const MarketDetail = () => {
  const { marketName } = useParams<{ marketName: string }>();
  const navigate = useNavigate();

  const [boards, setBoards] = useState<Board[]>([]);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const fetchBoards = async () => {
      if (!marketName) return;

      try {
        const res = await getMarketBoards(marketName);
        setBoards(res.data.data.boards);
        setAddress(res.data.data.address);
      } catch (error) {
        console.error("게시글 불러오기 실패", error);
      }
    };

    fetchBoards();
  }, [marketName]);

  const handleWrite = () => {
    navigate(`/market/서울/${marketName}/write`);
  };

  return (
    <div className="flex flex-col h-full">
      <Header title={"시장이야기"} showBack={true} />

      <div className="px-[32px] mt-[32px]">
        <p className="text-subtitle1">{marketName}</p>
        <p className="text-body2 text-subtext">{address}</p>
      </div>

      <div className="flex-1 px-[32px] mt-[18px] overflow-y-auto">
        {boards.length > 0 ? (
          boards.map((post) => (
            <div key={post.boardId} className="flex pb-[12px] gap-[12px]">
              <img
                src={post.imageDataList[0]?.imageUrl}
                alt={post.title}
                className="w-[69px] h-[69px] rounded-[8px] object-cover"
              />
              <div className="flex flex-col flex-1">
                <p className="font-body1 mb-[4px]">{post.title}</p>
                <p className="text-body3 text-subtext mb-[8px]">
                  {post.content}
                </p>
                <div className="flex items-center gap-[4px] text-body3 text-primary">
                  <img
                    src={heartIcon}
                    alt="좋아요"
                    className="w-[14px] h-[14px]"
                  />
                  <span>{post.likeCount}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center mt-[0px]">
            <p className="text-body1 font-semibold mb-[8px]">
              아직 등록된 이야기가 없어요.
            </p>
            <p className="text-body2 text-subtext mb-[24px]">
              이 시장의 첫 번째 이야기를 남겨보세요!
            </p>
          </div>
        )}
      </div>

      <div className="absolute bottom-[50px] w-full flex justify-center px-[32px]">
        <Button
          variant="primary"
          onClick={handleWrite}
          className="w-full text-subtitle1"
        >
          글 작성하기
        </Button>
      </div>
    </div>
  );
};

export default MarketDetail;
