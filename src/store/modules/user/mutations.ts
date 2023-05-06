import type { IUserLoginInfo as IUserState } from "@/types/user";
import { MutationTree } from "vuex";

import { UserMutationTypes } from "./mutation-types";

export const mutations: MutationTree<IUserState> = {
  [UserMutationTypes.SET_NAME](state, payload: string) {
    state.name = payload;
  }
};
