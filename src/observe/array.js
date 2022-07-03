
// 重写数组的部分方法
let oldArrayProto = Array.prototype

export let newArrayProto = Object.create(oldArrayProto) 

let methods = [
  'push',
  'pop',
  'unshift',
  'shift',
  'reverse',
  'sort',
  'splice'
]

methods.forEach(method=>{
  newArrayProto[method] = function(...args){
    const result = oldArrayProto[method].call(this,...args)
    let inserted
    let ob = this.__ob__
    switch(method){
      case 'push': 
        inserted = args
        break
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
      default:
        break
    }
    if(inserted){
      ob.observeArray(inserted)
    }

    return result
  
  }

  
})