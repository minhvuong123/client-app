
import { ICommentRequest } from "model";
import { axiosClient } from "./axiosClient.api";

export const addingCommentUrl = '/comments/addComment';
export const getCommentsUrl = '/comments/getComments';

export const commentApi = {
  addingComment: (url: string, originCommentData: ICommentRequest): Promise<any> => {
    return axiosClient.post(url, originCommentData);
  },
  gettingComments: (url: string): Promise<any> => {
    return axiosClient.get(url);
  },
}