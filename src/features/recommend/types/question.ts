export interface SurveyQuestionProps {
  title: string;
  subtitle?: string;
  options: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}
