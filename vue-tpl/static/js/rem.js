(function(doc,win){
    /**
     * 要达到效果最好设置根字体大小
     * rem相关布局[请参考](http://www.jianshu.com/p/65f80d4b44bb)
     * 1. 取得html，另一种方式doc.getElementsByTagName("html")[0]
     * 2. orientationchange->手机屏幕转屏事件，resize->页面大小改变事件(pc端)
     * 3. 预设根（html）字体大小与基准屏幕的比例(根字体大小预设为20px 基准设计稿宽750px，这两个值根据实际情况进行调整)
     * 4. 浏览器可视区clientWidth改变，重置字体大小（注意字体大小与clientWidth比例不变 固定为ftRto）
     * 5. dom加载完就执行(不要用onload，原因是onload要dom/css/js都加载完才执行)
     */
    var docEl = doc.documentElement, // 1
        reEvt = "orientationchange" in win ? "orientationchange" : "resize", // 2
        ftRto = 20/750; // 3
        reFontSize = function() {
            var clientW = docEl.clientWidth || doc.body.clientWidth;
            if(!clientW) {
                return;
            }
            docEl.style.fontSize = clientW * ftRto + "px";
        };// 4
    win.addEventListener(reEvt, reFontSize, false);
    doc.addEventListener('DOMContentLoaded', reFontSize, false); // 5
})(document,window);