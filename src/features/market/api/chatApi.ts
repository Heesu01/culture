import Axios from "@/shared/api/Axios";
import type { ChatPayload, ChatResponse } from "../types/chatbot";

export const sendChat = async (payload: ChatPayload): Promise<ChatResponse> => {
  const { data } = await Axios.post<ChatResponse>("/chats", payload);
  return data;
};
