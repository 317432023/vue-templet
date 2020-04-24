# 使用来自hello-uniapp定制的样式
    文件:
    common/uni.css
    static/uni.ttf
    
    App.vue:
    
    @import './common/uni.css'
    
# 使用animate.css
    文件:
    common/animate.css
    
    App.vue:
    
    @import './common/animate.css'
    
    somePage.vue:
    
    <view class="view-box animated" hover-stay-time="800" hover-class="view-box-hover rubberBand">测试animated</view>
    
    .view-box {background: #007aff; color: #fff; margin:100upx;}
    .view-box-hover {background: red;}
    
    查看各种演示效果 (https://daneden.github.io/animate.css/)

# 使用三方icon（阿里巴巴矢量图标库）
    文件
    common/icon.css
    common/icon.ttf
    
    修改文件:
    登录iconfont.cn选择所要的图标加入购物车然后下载整个包download.zip取出里面的iconfont.css，修改其内容
    删除src的值中带字体文件链接的的url，保留base64字体内容
    另存为icon.css
    取出里面的iconfont.ttf另存为icon.ttf
    
    App.vue:
    @import './common/icon.css'
    
    somePage.vue
    <view class="iconfont icon-xxx"></view>
# css3
    .className>view:nth-child(1){backgroundColor:#fff;}
    .className>view:first-child{backgroundColor:#fff;}
    .className>view:first-of-type{backgroundColor:#fff;}
    
    .className>view:nth-of-type(even){backgroundColor:#fff;}
    .className>view:nth-of-type(odd){backgroundColor:#ccc;}
    
    flex 布局

# 用户登录封装
    文件
    common/config.js
    common/request.js
    common/user.js
    
# 网络监听和热更新
   文件
   common/lib.js