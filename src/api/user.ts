import request from "@/utils/request";
import { IUserListParam, IUserListRes } from "@/types/user";

const getUserList = async (data: IUserListParam): Promise<any> => {
  return request.post<IUserListRes>({
    url: "/api/user/list",
    data
  });
};

export { getUserList };
