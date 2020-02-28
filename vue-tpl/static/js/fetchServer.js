/** 使用 Promise 来自定义的一个 ajax 请求 */
let fetchServer = function(url, options) {
  options = options || {}
  options.method = options.method?options.method.toUpperCase():'GET'
  options.async = options.async || true
  options.data = options.data || {}
  const promise = new Promise(function(resolve, reject){
    let xhr=null
    if(window.XMLHttpRequest) {
      xhr=new XMLHttpRequest()
    }else{
      try {
        xhr = new ActiveXObjct("Msxml2.XMLHTTP");//ie
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
      xhr.open(requestType,url+'?'+requestData,options.async)
      xhr.send()
    }else if(requestType=='POST'){
      xhr.open(requestType,url,options.async)
      xhr.setRequestHeader("Content-Type","application/x-www-urlencoded;charset=utf-8")
      xhr.send(requestData)
    }
    xhr.onreadystatechange=function(){
      if(xhr.readyState==4){
        if(xhr.status==200) {
          resolve(JSON.parse(xhr.responseText), this)
        }else{
          reject({code: 250, message: '请求失败'}, this)
        }
      }
    }
  })
  return promise
}
export default fetchServer