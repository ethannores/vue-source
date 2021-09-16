import createElement from "./createElement";
import patchVnode from "./patchNode";
import { sameNode } from "./utils";
import vnode from "./vnode";
//传入新老虚拟节点
export default function patch(oldVnode,newVnode){
  //先判断老节点是否是虚拟节点，不是的话就先将老节点转为虚拟节点
  //未考虑老节点中存在的id 子元素 内容 标签属性等东西
  if(oldVnode.tagName){
    oldVnode=vnode({},oldVnode,oldVnode.tagName.toLowerCase(),[],undefined)
  }
  //判断新老节点是否是相同虚拟节点
  if(sameNode(oldVnode,newVnode)){
    patchVnode(oldVnode,newVnode)
  }else{
    //不同节点，则直接直接用新节点替换老节点
    let dom = createElement(newVnode)
    //在老dom之前加入节点，并删除老节点
    oldVnode.elm.parentNode.insertBefore(dom,oldVnode.elm)
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}