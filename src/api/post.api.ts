
import { ICommentRequest, IPostRequest } from "model";
import { axiosClient } from "./axiosClient.api";

export const addingPostUrl = '/posts/addPost';
export const getPostsUrl = '/posts/getPosts';
export const addingPostCommentUrl = '/posts/comment';
export const addingPostEmojiUrl = '/posts/emoji';
export const removePostEmojiUrl = '/posts/remove-emoji';
export const updatePostEmojiUrl = '/posts/update-emoji';

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
  addingPostEmoji: (url: string, originEmojiData: any): Promise<any> => {
    return axiosClient.post(url, originEmojiData);
  },
  removePostEmoji: (url: string, originEmojiData: any): Promise<any> => {
    return axiosClient.post(url, originEmojiData);
  },
  updatePostEmoji: (url: string, originEmojiData: any): Promise<any> => {
    return axiosClient.post(url, originEmojiData);
  },
}