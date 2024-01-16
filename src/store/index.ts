// 文档说明：https://vuex.vuejs.org/zh/guide/typescript-support.html
import { createStore, GetterTree, MutationTree, ActionTree, Store, createLogger } from "vuex";
import { InjectionKey } from "vue";
import { useStore as baseUseStore } from "vuex";

import type { IUserLoginInfo as IUserState } from "@/types/user";

// 功能模块
import user from "./modules/user/index";

// const modulesFiles = require.context("./modules", true, /\.js$/);
// 不需要“import app from”./modules/app`
// 它将自动要求模块文件中的所有vuex模块
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//   const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
//   const value = modulesFiles(modulePath);
//   modules[moduleName] = value.default;
//   return modules;
// }, {});

export interface IModuleTree<R> {
  [key: string]: IModules<any, R>;
}

// vuex Modules
export interface IModules<S, R> {
  namespace?: boolean;
  state?: S | (() => S);
  getters?: GetterTree<S, R>;
  mutations?: MutationTree<S>;
  actions?: ActionTree<S, R>;
  modules?: IModuleTree<R>;
}

export interface IState {
  comments: string;
  count: number;
}

// 继承主模块的State
interface IStateFull extends IState {
  // 包含模块
  user: IUserState;
  // 其他模块
}

export const key: InjectionKey<Store<IStateFull>> = Symbol("state");

const isDebug: boolean = process.env.NODE_ENV !== "production";

const plugins = isDebug ? [createLogger({})] : [];

export const store = createStore<IState>({
  state: {
    comments: "comments",
    count: 1
  },
  getters: {
    doubleCount: (state) => state.count * 2
  },
  mutations: {
    setComments: (state, payload: string) => (state.comments = payload)
  },
  actions: {},
  plugins,
  modules: {
    user
  }
});

export function useStore(): Store<IStateFull> {
  return baseUseStore(key);
}
