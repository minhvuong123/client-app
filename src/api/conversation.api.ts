
import { axiosClient } from "./axiosClient.api";

export const getConvsersationUrl = '/conversations/get-conversation';

export const conversationApi = {
  getConversation: (url: string, originCommentData: any): Promise<any> => {
    return axiosClient.post(url, originCommentData);
  },
}