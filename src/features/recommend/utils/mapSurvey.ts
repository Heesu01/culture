export const mapPerson = (option: string) => {
  if (option.includes("혼자")) return "혼자";
  if (option.includes("데이트")) return "연인";
  if (option.includes("가족")) return "가족";
  if (option.includes("친구")) return "친구";
  return option;
};

export const mapTime = (option: string) => {
  if (option.includes("한 시간")) return "1시간";
  if (option.includes("세 시간")) return "3시간";
  if (option.includes("반나절")) return "반나절";
  return "하루종일";
};

export const mapView = (option: string) => {
  if (option.includes("느긋")) return "천천히";
  return "빠르게";
};

export const mapWish = (option: string) => {
  if (option.includes("신기한")) return "신기한 가게 구경";
  if (option.includes("SNS")) return "SNS 포토존";
  if (option.includes("이야기")) return "정겨움";
  if (option.includes("몰라요")) return "무계획";
  if (option.includes("공방")) return "공방 체험";
  return option;
};

export const mapMood = (option: string) => {
  if (option.includes("복작")) return "북적";
  return "조용";
};
