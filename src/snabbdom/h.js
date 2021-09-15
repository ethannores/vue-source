import vnode from "./vnode";
//不做函数重载，限定h 函数必须传三个参数，  sel   data  h()/children/text
export default function h(sel,data,any){
  if(typeof any==='string'){
    return vnode(data,undefined,sel,[],any)
  }else if(Array.isArray(any)&&any.length>0){
    //children不用递归去构建虚拟节点， 因为自身传入的就是h的调用，所以子元素数组会自动生成虚拟节点对象
    return vnode(data,undefined,sel,any,undefined)
  }else{
    return vnode(data,undefined,sel,[any],undefined)
  }
}