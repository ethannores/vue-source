import createElement from "./createElement";
import { sameNode } from "./utils";
import vnode from "./vnode";
//传入新老虚拟节点
export default function patch(oldVnode,newVnode){
  //先判断老节点是否是虚拟节点，不是的话就先将老节点转为虚拟节点
  //未考虑老节点中存在的id 子元素 内容 标签属性等东西
  if(oldVnode.tagName){
    oldVnode=vnode({},oldVnode,oldVnode.tagName.toLowerCase(),[],undefined)
  }
  console.log(oldVnode,newVnode)
  //判断新老节点是否是相同虚拟节点
  if(sameNode(oldVnode,newVnode)){
    //相同节点，则考虑的问题
    //将相同节点的比较拆分，
    //1:新节点是text， 看与老节点的文字是否相同
    //2:老节点是text 新节点是children  同上
    //3:新老节点都是children （难点）
    console.log('相同节点要进行比较了')
    console.log(newVnode.text&&newVnode.children.length==0)
    if(newVnode.text&&newVnode.children.length==0){
      console.log(11)
      // 新dom存在文本，且没有子元素数组
      if(newVnode.text!==oldVnode.text){
        console.log(231)
        oldVnode.elm.innerText=newVnode.text
      }
    }else{

    }
  }else{
    //不同节点，则直接直接用新节点替换老节点
    let dom = createElement(newVnode)
    //在老dom之前加入节点，并删除老节点
    oldVnode.elm.parentNode.insertBefore(dom,oldVnode.elm)
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}