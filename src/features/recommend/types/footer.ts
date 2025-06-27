export interface RecommendFooterProps {
  step: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  isNextDisabled?: boolean;
}
