
import { ICommentRequest } from "model";
import { axiosClient } from "./axiosClient.api";

export const addingCommentUrl = '/posts/addComment';
export const getCommentsUrl = '/posts/getComments';

export const postApi = {
  addingComment: (url: string, originCommentData: ICommentRequest): Promise<any> => {
    return axiosClient.post(url, originCommentData);
  },
  gettingComments: (url: string): Promise<any> => {
    return axiosClient.get(url);
  },
}