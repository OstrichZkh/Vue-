import { compileToFunction } from "./compiler/index"
import { initState } from "./state"

export function initMixin(Vue){
  Vue.prototype._init = function(options){
    const vm = this
    // 绑定用户的配置
    vm.$options = options

    // 初始化状态
    initState(vm)

    if(options.el){
      vm.$mount(options.el)
    }
  }


  Vue.prototype.$mount = function(el){
    const vm = this
    let ops = vm.$options
    el = document.querySelector(el)
    if(!ops.render){
      // 获取HTML
      let template
      if(!ops.template && el){
        template = el.outerHTML
      }else{
        if(el){
          template = ops.template
        }
      }
      // 编译模板
      if(template){
        const render = compileToFunction(template)
        ops.render = render
      }
    }

    ops.render
  }
}


