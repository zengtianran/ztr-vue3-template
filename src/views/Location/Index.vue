<template>
  <div>
    <span>定位测试</span>
  </div>
</template>

<script lang="ts">
import { loadBaiduMapJs } from "@/utils/index";
export default {
  name: "LocationTest",
  setup() {
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
    // getLocation()
    // 高德定位
    // function getLocation() {
    //   const AMap = window.AMap
    //   AMap.plugin('AMap.Geolocation', function() {
    //     let geolocation = new AMap.Geolocation({
    //       // 是否使用高精度定位，默认：true
    //       enableHighAccuracy: true,
    //       // 设置定位超时时间，默认：无穷大
    //       timeout: 10000
    //     })

    //     geolocation.getCurrentPosition()
    //     AMap.Event.addListener(geolocation, 'complete', onComplete)
    //     AMap.Event.addListener(geolocation, 'error', onError)

    //     function onComplete(result:any) {
    //       // data是具体的定位信息
    //       console.log('定位成功信息：', result)

    //       const latitude = result.position.lat
    //       const longitude = result.position.lng

    //       AMap.plugin('AMap.Geocoder', function() {
    //         var geoCoder = new AMap.Geocoder({
    //           // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
    //           city: ''
    //         })

    //         geoCoder.getAddress([longitude, latitude], function(status:any, data:any) {
    //           if (status === 'complete' && data.info === 'OK') {
    //             console.log('结果', data)
    //             const locationName = data.regeocode.formattedAddress
    //             if (data.regeocode.addressComponent.businessAreas.length) {
    //               const latitude1 = data.regeocode.addressComponent.businessAreas[0].location.lat
    //               const longitude1 = data.regeocode.addressComponent.businessAreas[0].location.lng
    //             }
    //           }
    //         })
    //       })
    //     }
    //     function onError(data: any) {
    //       // 定位出错
    //       console.log('定位失败错误：', data)
    //     }
    //   })
    // }
    // 通过navigator判断用户是否有权限获取地址
    // navigator.geolocation.getCurrentPosition(async () => {
    loadBaiduMapJs().then(() => {
      console.log("object :>> ", "object");
      initLocation();
    });
    // });
  }
};
</script>

<style lang="scss" scoped>
span {
  font-size: 24px;
}
</style>
