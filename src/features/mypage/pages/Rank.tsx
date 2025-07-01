import { useEffect, useState } from "react";
import Header from "@/shared/components/Header";
import { getRankings } from "@/features/mypage/api/userApi";
import type { UserRanking } from "@/features/mypage/types/rank";

import completeCharacter from "@/features/stamp/assets/progress/complete.png";
import lateCharacter from "@/features/stamp/assets/progress/late.png";
import midCharacter from "@/features/stamp/assets/progress/mid.png";
import earlyCharacter from "@/features/stamp/assets/progress/early.png";
import startCharacter from "@/features/stamp/assets/progress/start.png";
import prize from "@/features/mypage/assets/first.png";

const getCharacter = (rank: number) => {
  if (rank === 1) return completeCharacter;
  if (rank === 2) return lateCharacter;
  if (rank === 3) return midCharacter;
  if (rank === 4) return earlyCharacter;
  return startCharacter;
};

const Rank = () => {
  const [rankings, setRankings] = useState<UserRanking[]>([]);
  const [myRank, setMyRank] = useState<UserRanking | null>(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const data = await getRankings();
        setRankings(data.rankings);
        setMyRank(data.myRank);
      } catch (error) {
        console.error("랭킹 조회 실패", error);
      }
    };

    fetchRankings();
  }, []);

  return (
    <div className="px-[25px] mt-[40px] pb-[40px] mb-[110px]">
      <Header title="유저 랭킹" />

      {rankings.length > 0 && (
        <div className="flex items-center gap-[20px] mb-[px]">
          <div className="w-[100px] h-[100px] rounded-full bg-grayBg flex items-center justify-center">
            <img
              src={getCharacter(rankings[0].rank)}
              alt="랭킹 캐릭터"
              className="w-[109px] h-auto"
            />
          </div>
          <div className="flex-1">
            <p className="text-body1 mb-[4px]">{rankings[0].userName}</p>
            <p className="text-body4 text-subtext">
              총 획득 도장: {rankings[0].visitMarketCount}개
            </p>
          </div>
          <img
            src={prize}
            alt="1등 상"
            className="flex items-center justify-center w-[80px]"
          />
        </div>
      )}

      <hr className="border-[#E3E3E3]" />

      <div className="flex flex-col">
        {rankings.slice(1).map((user) => (
          <div
            key={`${user.rank}-${user.userName}`}
            className="flex items-center justify-between px-[7px] h-[88px]"
          >
            <div className="flex items-center">
              <span
                className={`text-body3 mr-[20px] ${
                  user.rank <= 4 ? "text-primary" : "text-subtext"
                }`}
              >
                {user.rank}
              </span>
              <div className="w-[60px] h-[60px] mr-[12px] rounded-full bg-grayBg flex items-center justify-center">
                <img
                  src={getCharacter(user.rank)}
                  alt="랭킹 캐릭터"
                  className="w-[51px] h-auto"
                />
              </div>
              <p className="text-body2">{user.userName}</p>
            </div>
            <span className="text-body4 text-[#767676]">
              총 획득 도장: {user.visitMarketCount}개
            </span>
          </div>
        ))}
      </div>

      {myRank && (
        <div
          className="w-full fixed bottom-0 left-0 px-[32px] pt-[24px] pb-[32px] rounded-[20px] flex items-center justify-between bg-white"
          style={{ boxShadow: "0 -2px 5px -1px rgba(0,0,0,0.1)" }}
        >
          <div className="flex items-center">
            <span
              className={`text-body3 mr-[20px] ${
                myRank.rank <= 4 ? "text-primary" : "text-subtext"
              }`}
            >
              {myRank.rank}
            </span>
            <div className="w-[60px] h-[60px] mr-[12px] rounded-full bg-grayBg flex items-center justify-center">
              <img
                src={getCharacter(myRank.rank)}
                alt="내 캐릭터"
                className="w-[51px] h-auto"
              />
            </div>
            <p className="text-body2">{myRank.userName}</p>
          </div>
          <span className="text-body4 text-[#767676]">
            총 획득 도장: {myRank.visitMarketCount}개
          </span>
        </div>
      )}
    </div>
  );
};

export default Rank;
