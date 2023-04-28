import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosPromise } from "axios";
import config from "./config";

import { IResData } from "../types/index";

class Http {
  baseUrl: string;
  timeout: number;
  queue: never[];
  constructor() {
    this.baseUrl = config.base;
    this.timeout = config.requestTimeout;
    this.queue = [];
  }
  // 合并配置参数
  mergeOptions(options: any) {
    return {
      baseUrl: this.baseUrl,
      timeout: this.timeout,
      ...options
    };
  }
  setInterceptor(instance: AxiosInstance) {
    // 配置请求参数拦截
    instance.interceptors.request.use(
      (config: AxiosRequestConfig): any => {
        // const timestamp = +new Date() + ''
        // if (config.method === 'post') {
        //     config.data['timestamp'] = timestamp
        // }
        // if (config.method === 'get') {
        //     config.params['timestamp'] = timestamp
        // }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
    // 配置响应参数拦截
    instance.interceptors.response.use(
      (response: AxiosResponse): any => {
        // axios默认请求判断状态
        if (response.status === 200) {
          // 成功过滤处理，返回数据对象，属性信息走配置文件的配置
          if (
            !config.responseConfig.isOK(response.data) ||
            config.responseConfig.errorCodes.indexOf(
              response.data[config.responseConfig["code"]]
            ) >= 0
          ) {
            // 请求出错，统一处理
            return Promise.reject(response.data[config.responseConfig.data] as IResData<any>);
          } else {
            try {
              return Promise.resolve(response.data[config.responseConfig.data] as IResData<any>);
            } catch (error) {
              return Promise.reject(error);
            }
          }
        } else {
          return Promise.reject(response.data[config.responseConfig.data]);
        }
      },
      (error) => {
        if (error.response) {
          // 处理错误状态码
          switch (error.response.status) {
            case 401:
              break;
            default:
              break;
          }
        }
        return Promise.reject(error.response.data);
      }
    );
  }
  request<T>(options: { url: string; method: string; data?: Record<string, unknown> }) {
    const ops = this.mergeOptions(options);
    const axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: this.timeout
    });
    // 设置拦截器
    this.setInterceptor(axiosInstance);
    return axiosInstance.request<T>(ops);
  }
  post<T = any>({ url = config.url, method = "POST", data = {}, configs = {} }): AxiosPromise<T> {
    return this.request<T>({
      url,
      method,
      data,
      ...configs
    });
  }
  get<T = any>({ url = config.url, method = "GET", configs = {} }): AxiosPromise<T> {
    return this.request({
      url,
      method,
      ...configs
    });
  }
}
// 导出实例
export default new Http();
