export interface Region {
  name: string;
  markerLat: number;
  markerLng: number;
  centerLat: number;
  centerLng: number;
  description: string;
  video: string;
}

export interface RegionModalProps {
  region: Region;
}
