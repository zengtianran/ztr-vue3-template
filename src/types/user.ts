export interface IUserListParam {
  token: string;
}

export interface IUserListRes {
  id: number;
  title: string;
  status: string;
  author: string;
  display_time: string;
  page_views: string;
}

export interface IUserRelation {
  name: string;
  age: number;
}
export interface IUserLoginInfo {
  name: string;
  nickName: string;
  pass: number;
  age: number;
  relation: IUserRelation;
  level: string[];
}
