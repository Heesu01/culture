import Axios from "@/shared/api/Axios";
import type { GetMarketsResponse } from "@/features/market/types/market";

export const getMarkets = async (
  region: string
): Promise<GetMarketsResponse> => {
  const { data } = await Axios.get<GetMarketsResponse>(
    `/markets?region=${region}`
  );
  return data;
};

export const getMarketBoards = async (marketName: string) => {
  return await Axios.get(`/boards/all?marketName=${marketName}`);
};

export const getBoardDetail = async (boardId: string) => {
  return Axios.get(`/boards/${boardId}`);
};

export const getComments = async (boardId: string) => {
  return await Axios.get(`/comments/get/${boardId}`);
};

export const postComment = async (boardId: string, content: string) => {
  return await Axios.post(`/comments/${boardId}`, { content });
};

export const likeBoard = (boardId: string) => {
  return Axios.post(`/reactions/like/${boardId}`);
};

export const unlikeBoard = (boardId: string) => {
  return Axios.delete(`/reactions/like/${boardId}`);
};
