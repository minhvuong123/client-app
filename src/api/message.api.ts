
import { axiosClient } from "./axiosClient.api";

export const sendMessageUrl = '/messages/send-message';
export const getMessagesUrl = '/messages/get-messages';

export const messageApi = {
  sendMessage: (url: string, originMessageData: any): Promise<any> => {
    return axiosClient.post(url, originMessageData);
  },
  getMessages: (url: string, originMessageData: any): Promise<any> => {
    return axiosClient.post(url, originMessageData);
  },
}