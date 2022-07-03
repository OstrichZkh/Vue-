import { newArrayProto } from "./array"

class Observer{
  constructor(data){
    // 把实例放到data上面去
    Object.defineProperty(data,'__ob__',{
      value:this,
      enumerable:false
    })
    if(!Array.isArray(data)){
      this.walk(data)
    }else{
      //重写数组的7个变异方法，并劫持数组中的引用对象
      data.__proto__ = newArrayProto
      this.observeArray(data)
    }  
  }
  walk(data){
    Object.keys(data).forEach(key=>{defineReactive(data,key,data[key])})
  }
  observeArray(data){
    // data.forEach(item=>observe(item))
  }
}

export function defineReactive(target,key,value){
  observe(value)
  Object.defineProperty(target,key,{
    get(){
      return value
    },
    set(newValue){
      if(newValue==value) return
      observe(newValue)
      value = newValue
       
    }
  })

}



export function observe(data){
  if(typeof data !== 'object'  || data==null) return
  if(data.__ob__ instanceof Observer) return data.__ob__

  return new Observer(data)


}