// 请求地址前缀
const base = process.env.NODE_ENV === "development" ? "/dev-api" : "/production-api";
// const base = "/dev-api";
// const base = process.env.NODE_ENV
// 完整请求地址
const url = base;

const requestTimeout = 30 * 1000;

// 数据传输类配置 form提交数据：application/x-www-form-urlencoded
const contentType = "application/json";

// token校验
const tokenCheck = false;

// 统一请求配置
const responseConfig = {
  // 响应代码
  code: "code",
  // 响应数据
  data: "data",
  // 错误提示信息
  msg: "msg",
  // 加密数据
  encode: "encData",
  // 签名数据
  signData: "signData",
  // 响应是否是成功的
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  isOK: function (response: any): boolean {
    return response instanceof Object && response["code"] === 0;
  },
  // tokenCheck为true时，token验证不通过时返回的异常码， 出现这种情况情况下将直接执行回调errorCallBack
  errorCodes: [500023],
  errorCallback: function (): void {
    // token过期后,自定义处理,或返回错误
  }
};

export default {
  base,
  url,
  contentType,
  requestTimeout,
  tokenCheck,
  responseConfig
};
