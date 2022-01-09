import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResponseApiModel } from 'model';

export const axiosClient = axios.create({
	baseURL: 'http://localhost:4000',
	headers: {
		'Content-Type': 'application/json'
	}
})

axiosClient.interceptors.request.use(
	function (config: AxiosRequestConfig | any) {
		if(config) {
			config.headers['authorization'] = localStorage.getItem('access_token');
		}
		return config;
	}, function (error) {
		return Promise.reject(error)
	}
)

axiosClient.interceptors.response.use(
	function (response: AxiosResponse): ResponseApiModel {

		return { 
      status: response.status, 
      data: response.data 
    };
	}, function (error) {
		return Promise.reject(error)
	}
)