export interface ChatPayload {
  question: string;
}

export interface ChatResponse {
  statusCode: string;
  message: string;
  data: {
    answer: string;
  };
}
