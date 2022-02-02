
import { ICommentRequest, IPostRequest } from "model";
import { axiosClient } from "./axiosClient.api";

export const addingPostUrl = '/posts/addPost';
export const getPostsUrl = '/posts/getPosts';
export const addingPostCommentUrl = '/posts/comment';

export const postApi = {
  addingPost: (url: string, originPostData: IPostRequest): Promise<any> => {
    return axiosClient.post(url, originPostData);
  },
  gettingPosts: (url: string): Promise<any> => {
    return axiosClient.get(url);
  },
  addingPostComment: (url: string, originCommentData: ICommentRequest): Promise<any> => {
    return axiosClient.post(url, originCommentData);
  },
}