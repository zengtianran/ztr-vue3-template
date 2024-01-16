declare global {
  interface Window {
    requestIdleCallback?: Function;
    BMap: any;
  }
}
interface Window {
  requestIdleCallback?: Function;
  BMap: any;
  onBMapCallback: Function;
  AMap: any;
}
