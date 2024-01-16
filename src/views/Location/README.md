#### 1. 百度地图异步加载

- 异步加载百度地图包，注意百度地图包异步加载需加上 `callback`

```js
/**
 * 加载百度map
 * @returns
 */
export function loadBaiduMapJs(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        const AK = 'o8vfmC4rRPkLiOoeoWFg6MXh0kvLmPCY';
        const BMap_URL = `https://api.map.baidu.com/api?v=2.0&ak=${AK}&callback=onBMapCallback`;
        try {
            const BMap = window.BMap;
            if(typeof BMap !== 'undefined'){
                resolve(BMap)
            }else{
                window.onBMapCallback = function () {
                    resolve(BMap)
                }
                await loadJs(BMap_URL)
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
export function loadJs(url: string): Promise<void>{
    return new Promise<void>((resolve, reject) => {
        try {
            const script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', url);
            script.onload = () => {
                resolve()
            };
            script.onerror = reject;
            document.head.appendChild(script)
        } catch (error) {
            reject(error)
        }
    });
}
```

- 调用

```js
// 初始化定位
const initLocation = () => {
  const BMap = window.BMap;
  const geolocation = new BMap.Geolocation();
  geolocation.getCurrentPosition(function (r: any) {
    console.log(
      "定位内容信息11111111111>>>>>>>" + geolocation.getStatus() + ">>>>:" + JSON.stringify(r)
    );
    if (geolocation.getStatus() == "0") {
      const myGeo = new BMap.Geocoder();
      myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function (result: any) {
        if (result) {
          console.log("定位内容信息>22222222222>>>>>>>>>>:" + JSON.stringify(result));
        }
      });
    }
  });
};
// 通过navigator判断用户是否有权限获取地址
// navigator.geolocation.getCurrentPosition(async () => {
loadBaiduMapJs().then(() => {
  console.log("object :>> ", "object");
  initLocation();
});
// });
```

#### 2. 高德地图使用

- 引入 SDK

  ```html
  <script
    type="text/javascript"
    src="https://webapi.amap.com/maps?v=2.0&key=9d3eaa8c79ca0beb7e385b4fa9e46739"
  ></script>
  ```

- 查询地理位置及省市

  ```js
  // 高德定位
  getLocation() {
        const AMap = window.AMap
        AMap.plugin('AMap.Geolocation', function() {
          let geolocation = new AMap.Geolocation({
            // 是否使用高精度定位，默认：true
            enableHighAccuracy: true,
            // 设置定位超时时间，默认：无穷大
            timeout: 10000
          })

          geolocation.getCurrentPosition()
          AMap.Event.addListener(geolocation, 'complete', onComplete)
          AMap.Event.addListener(geolocation, 'error', onError)

          function onComplete(result:any) {
            // data是具体的定位信息
            console.log('定位成功信息：', result)


            const latitude = result.position.lat
            const longitude = result.position.lng


            AMap.plugin('AMap.Geocoder', function() {
              var geoCoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: ''
              })

              geoCoder.getAddress([longitude, latitude], function(status:any, data:any) {
                if (status === 'complete' && data.info === 'OK') {
                  console.log('结果', data)
                  const locationName = data.regeocode.formattedAddress
                  if (data.regeocode.addressComponent.businessAreas.length) {
                    const latitude1 = data.regeocode.addressComponent.businessAreas[0].location.lat
                    const longitude1 = data.regeocode.addressComponent.businessAreas[0].location.lng
                  }
                }
              })
            })
          }
          function onError(data: any) {
            // 定位出错
            console.log('定位失败错误：', data)
          }
        })
      }
  ```
