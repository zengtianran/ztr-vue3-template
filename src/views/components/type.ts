import { InjectionKey, Ref } from "vue";

import { IUserLoginInfo } from "@/types/user";

export type SetUser = (user: IUserLoginInfo) => void;

// user对象的InjectionKey
export const userInjectionKey: InjectionKey<Ref<IUserLoginInfo>> = Symbol("userInfo");
// 函数的InjectionKey
export const setUserInjectionKey: InjectionKey<SetUser> = Symbol("setUser");
