/**
 * Usage: !!!注意不支持uniapp
 * import validator from './common/validator.js'
 * Vue.use(validator)或Vue.use(validator, { someOption: true })
 * <input class='v-check' v-checkParam="{required:true,regex:'^[\u4e00-\u9fa5]*$'}" type="text">
 * <input class='v-check' v-checkParam="{required:true,regex:'IpRegex'}" type="text">
 * <button v-checkSubmit>提交</button>
 * method:{submit() {console.log('通过校验')}}
 */
import regexs from './regexs.js';
export default {
	install(Vue,options) {
		// 1. 添加全局方法或属性
		Vue.myGlobalMethod = function () {
		  // 逻辑...
		}
		
		// 2. 添加全局指令
		Vue.directive('my-directive', {
		  bind (el, binding, vnode, oldVnode) {
		    // 逻辑...
		  }
		  //...
		})
		
		Vue.directive('checkParam',{
		  // inserted：钩子函数，被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
		  inserted:function(el,binding){
		    // el：指令所绑定的元素，可以用来直接操作 DOM 。
		    el.addEventListener('keyup',function(event){
		      //input 发生改变时触发事件，改变class的绑定值来改变用户的体验
		      el.className = el.className.replace('input-error','').trim();
		      //只有点击提交按钮时，才进行如下操作的限制条件
		      if (!event.keyCode) {
		        let isRequired = binding.value.required
		        if(isRequired){
		          if(!el.value||el.value===''){
		            el.className += ' input-error'
		          }
		        }
		        //binding：一个对象; 
		        //binding.value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
		        let regex = binding.value.regex
		        if(regex === 'IpRegex'){
		          if(!el.value.match(regexs.IP4)){
		            el.className += ' input-error'
		          }
		        }else if(!el.value.match(regex)){
		          el.className += ' input-error'
		        }
		      }
		    })
		  }
		})
		
		Vue.directive('checkSubmit',{
		  inserted:function(el,bingding,vNode){
		    el.addEventListener('click',function(){
		      let elements = document.getElementsByClassName('v-check')
		      //合成 Event 新对象
		      var evObj = document.createEvent('Event')
		      //初始化新事件对象的属性
		      evObj.initEvent('keyup', true, true)
		      for (let element of elements) {
		        //Element 对象的 dispatchEvent() 方法进行分派
		       element.dispatchEvent(evObj)
		      }
		      let errorInputs = document.getElementsByClassName('input-error');
		      if(errorInputs.length === 0){
		       vNode.context.submit();
		      }
		    })
		  }
		})
		
		// 3. 注入组件
		Vue.mixin({
		  created: function () {
		    // 逻辑...
		  }
		  //...
		})
		
		// 4. 添加实例方法
		Vue.prototype.$myMethod = function (methodOptions) {
		  // 逻辑...
		}
	}
}