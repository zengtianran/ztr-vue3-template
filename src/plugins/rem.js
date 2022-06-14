(function (doc, win) {
  let resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
    setRem = function () {
      const docEl = doc.documentElement;
      if (!/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
        docEl.style.fontSize = 50 + "px";
      } else {
        const dpr = win.devicePixelRatio; //移动端屏幕dpr
        const visualView = Math.min(docEl.getBoundingClientRect().width, 750 * dpr);
        const newBase = (visualView * 100) / 750;
        docEl.style.fontSize = newBase + "px"; //默认设计稿宽度750px
      }
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, setRem, false);
  doc.addEventListener("DOMContentLoaded", setRem, false);
})(document, window);
