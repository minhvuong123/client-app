
import { ICommentRequest } from "model";
import { axiosClient } from "./axiosClient.api";

export const addingCommentUrl = '/comments/addComment';
export const getCommentsUrl = '/comments/getComments';
export const addingCommentEmojiUrl = '/comments/emoji';
export const removeCommentEmojiUrl = '/comments/remove-emoji';
export const updateCommentEmojiUrl = '/comments/update-emoji';

export const commentApi = {
  addingComment: (url: string, originCommentData: ICommentRequest): Promise<any> => {
    return axiosClient.post(url, originCommentData);
  },
  gettingComments: (url: string): Promise<any> => {
    return axiosClient.get(url);
  },
  addingCommentEmoji: (url: string, originEmojiData: any): Promise<any> => {
    return axiosClient.post(url, originEmojiData);
  },
  removeCommentEmoji: (url: string, originEmojiData: any): Promise<any> => {
    return axiosClient.post(url, originEmojiData);
  },
  updateCommentEmoji: (url: string, originEmojiData: any): Promise<any> => {
    return axiosClient.post(url, originEmojiData);
  },
}