export type Region = {
  name: string;
  lat: number;
  lng: number;
  description: string;
  video: string;
};
export interface RegionModalProps {
  region: Region;
}
