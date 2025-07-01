export interface StampBadgeProps {
  name: string;
  visited: boolean;
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
