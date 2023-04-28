/**
 * string参数转对象
 * @param url 链接
 * @returns
 */
function param2Obj(url) {
  const obj = {};
  // a=1&b=2&k=ddd
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
  if (!search) {
    return obj;
  }
  const searchArray = search.split("&");
  searchArray.forEach((param) => {
    const index = param.indexOf("=");
    if (index !== -1) {
      const key = param.substring(0, index);
      const value = param.substring(index + 1, param.length);
      obj[key] = value;
    }
  });
  return obj;
}

module.exports = {
  param2Obj
};
