/**
 * 加载百度map
 * @returns
 */
export function loadBaiduMapJs(): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    const AK = "o8vfmC4rRPkLiOoeoWFg6MXh0kvLmPCY";
    const BMap_URL = `https://api.map.baidu.com/api?v=2.0&ak=${AK}&callback=onBMapCallback`;
    try {
      const BMap = window.BMap;
      if (typeof BMap !== "undefined") {
        resolve(BMap);
      } else {
        window.onBMapCallback = function () {
          resolve(BMap);
        };
        await loadJs(BMap_URL);
      }
    } catch (error) {
      reject(error);
    }
  });
}

/**
 *
 * @param url 加载的js地址
 * @returns Promise<void>
 */
export function loadJs(url: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    try {
      const script = document.createElement("script");
      script.setAttribute("type", "text/javascript");
      script.setAttribute("src", url);
      script.onload = () => {
        resolve();
      };
      script.onerror = reject;
      document.head.appendChild(script);
    } catch (error) {
      reject(error);
    }
  });
}
