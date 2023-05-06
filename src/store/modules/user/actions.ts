import type { IUserLoginInfo as IUserState } from "@/types/user";
import { ActionTree } from "vuex";
import { userLogin } from "@/api/user";
import { UserActionTypes } from "./action-types";
import { UserMutationTypes } from "./mutation-types";

// 用于继承
import type { IState } from "../../index";

export const actions: ActionTree<IUserState, IState> = {
  async [UserActionTypes.LOGIN]({ commit }, token: string) {
    const res = await userLogin({
      token: token
    });
    console.log("userLogin store Action :>> ", res);
    commit(UserMutationTypes.SET_NAME, res);
  }
};
