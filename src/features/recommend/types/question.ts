export interface SurveyQuestionProps {
  title: string;
  subtitle?: string;
  options: string[];
  selectedIndex: number | number[] | null;
  onSelect: (index: number) => void;
  multiple?: boolean;
  grid?: boolean;
}
