export default function createElement(vnodeObj){
  console.log(vnodeObj);
  let dom = document.createElement(vnodeObj.sel);
  //如果是文字节点的话直接添加文字内容
  if(vnodeObj.text){
    dom.innerText=vnodeObj.text
  }
  //如果是子节点对象的话，那就遍历节点
  if(Array.isArray(vnodeObj.children)&&vnodeObj.children.length>0){
    for(let i=0;i<vnodeObj.children.length;i++){
      //针对子节点进行递归  争取将所有的节点全部递归完成
      dom.appendChild(createElement(vnodeObj.children[i]))
    }
  }
  //构建dom后，将构建的dom挂载到虚拟节点的elm上，以便下次diff下一轮的时候，有elm作为dom的位置挂载标识
  vnodeObj.elm=dom
  return dom;
}