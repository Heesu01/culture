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
