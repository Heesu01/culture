export interface UserRanking {
  rank: number;
  userName: string;
  visitMarketCount: number;
}

export interface RankResponse {
  rankings: UserRanking[];
  myRank: UserRanking;
}
