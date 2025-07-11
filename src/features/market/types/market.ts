export type Market = {
  marketId: string;
  marketName: string;
  address: string;
  x: string;
  y: string;
};

export interface GetMarketsResponse {
  statusCode: string;
  message: string;
  data: {
    markets: Market[];
  };
}

export interface BoardImage {
  imageId: string;
  imageUrl: string;
}

export interface Board {
  boardId: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
  imageDataList: BoardImage[];
  likeCount: number;
  dislikeCount: number;
}

export interface BoardListResponse {
  statusCode: string;
  message: string;
  data: {
    marketName: string;
    address: string;
    boards: Board[];
  };
}
