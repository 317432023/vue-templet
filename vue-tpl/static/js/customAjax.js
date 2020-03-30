/** 手写封装ajax */
let ajax=function(options){
  options = options||{}
  options.method=options.method?options.method.toUpperCase():'GET'
  options.url=options.url||''
  options.async=options.async||true
  options.data=options.data||{}
  options.success=options.success||function(){}
  options.faile=options.failure||function(){}
  console.log(options)

  let xhr=null
  if(window.XMLHttpRequest) {
    xhr=new XMLHttpRequest()
  }else{
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");//ie
    } catch (e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");//低版本ie
      } catch (ex) {
        console.error(ex)
        throw(ex)
      }
    }
  }
  
  let params=[]
  for(let param in options.data)
    params.push(param+'='+options.data[param])
  let requestData = params.join('&')
  let requestType = options.method;
  if(requestType=='GET'){
    xhr.open(requestType,options.url+'?'+requestData,options.async)
    xhr.send()
  }else if(requestType=='POST'){
    xhr.open(requestType,options.url,options.async)
    xhr.setRequestHeader("Content-Type","application/x-www-urlencoded;charset=utf-8")
    xhr.send(requestData)
  }
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4&&xhr.status==200){
      options.success(JSON.parse(xhr.responseText))
    }else if(xhr.status!=200){
      options.faile('request error')
    }
  }
}

/* 导入方式: import ajax from '../static/js/customAjax' */

/*
// 导出方式一：普通导出 调用方式ajax（局部使用：在组件内导入）
export default ajax

// 导出方式二：原型导出1 调用方式this.ajax（全局使用：在main.js导入一次每个组件都可以；局部使用：在组件内导入）
Vue.prototype.ajax=ajax
*/

// 导出方式三：原型导出2 调用方式this.ajax（先导入 再 Vue.use(ajax) ），需要import Vue from 'vue'
export default{
  install(Vue,options){
    Vue.prototype.ajax=ajax
  }
}