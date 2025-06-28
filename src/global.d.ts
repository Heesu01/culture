export {};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver: any;
  }
  namespace naver {
    namespace maps {
      class Map {}
      class LatLng {
        constructor(lat: number, lng: number);
      }
      class Marker {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(options: any);
      }
    }
  }
}
