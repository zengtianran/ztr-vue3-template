import request from "@/utils/request";
import { IUserListParam, IUserListRes } from "@/types/user";

/**
 * 获取用户列表
 * @param data 请求入参
 * @returns
 */
const getUserList = async (data: IUserListParam): Promise<any> => {
  return request.post<IUserListRes>({
    url: "/api/user/list",
    data
  });
};

/**
 * 用户登录
 * @param data 请求入参
 * @returns
 */
const userLogin = async (data: IUserListParam): Promise<any> => {
  return request.post<IUserListRes>({
    url: "/api/user/login",
    data
  });
};

export { getUserList, userLogin };
