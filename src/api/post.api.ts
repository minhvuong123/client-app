
import { IPostRequest } from "model/post.model";
import { axiosClient } from "./axiosClient.api";

export const addingPostUrl = '/posts/addPost';
export const getPostsUrl = '/posts/getPosts';

export const postApi = {
  addingPost: (url: string, originPostData: IPostRequest): Promise<any> => {
    return axiosClient.post(url, originPostData);
  },
  gettingPosts: (url: string): Promise<any> => {
    return axiosClient.get(url);
  },
}