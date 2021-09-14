import { arrayMethods } from "./array";
import defineReactive from "./defineReactive";
import Dep from "./dep";
import observe from "./observe";
import { def } from "./util";

export default class Observer{
  constructor(val){
    this.dep = new Dep()
    //给自己添加上一个不可迭代的__ob__属性来标记当前值已经observer了
    console.log('添加上__ob__标记')
    def(val,'__ob__',this,false);
    if(Array.isArray(val)){
      Object.setPrototypeOf(val,arrayMethods)
      this.observeArray(val)
    }else{
      this.walk(val)
    }
  }
  walk(val){
    //针对val可能会有很多项多一次迭代
    for(let k in val){
      defineReactive(val,k)
    }
  }
  observeArray(arr){
    //进行observe
    for(let k of arr){
      observe(arr[k])
    }
  }
}