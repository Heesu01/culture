export interface StampBadgeProps {
  name: string;
  visited: boolean;
  region?: string;
  onClick?: () => void;
}

export interface StampCardProps {
  region: string;
  total: number;
  progress: number;
}

export interface RegionProgress {
  region: string;
  visitCount: number;
  totalCount: number;
  progressRate: number;
}

export interface MarketStamp {
  marketId: string;
  marketName: string;
  visited: boolean;
}

export interface RawMarket {
  marketId: string;
  marketName: string;
  visited: boolean;
  x: string;
  y: string;
  visitedAt: string | null;
}

export interface GetRegionMarketBooksResponse {
  visitCount: number;
  totalCount: number;
  progressRate: number;
  markets: RawMarket[];
}

export interface StampMarket {
  marketId: string;
  marketName: string;
  x: string;
  y: string;
  visited: boolean;
  visitedAt: string | null;
}

export interface StampResponse {
  statusCode: string;
  message: string;
  data: {
    markets: StampMarket[];
  };
}
