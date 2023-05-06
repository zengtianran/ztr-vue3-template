import type { IUserLoginInfo as IUserState } from "@/types/user";
import { GetterTree } from "vuex";

// 用于继承
import type { IState } from "../../index";

export const getters: GetterTree<IUserState, IState> = {
  userName: (state) => state.name,
  // 获取根State的值
  count: (_, rootState) => rootState.count
};
