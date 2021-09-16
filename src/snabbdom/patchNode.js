import updateChildren from "./updateChildren"

export default function patchVnode(oldVnode, newVnode) {
	//相同节点，则考虑的问题
	//将相同节点的比较拆分，
	//1:新节点是text， 看与老节点的文字是否相同
	//2:老节点是text 新节点是children  同上
	//3:新老节点都是children （难点）
	console.log('相同节点要进行比较了')
	if (newVnode.text && newVnode.children.length == 0) {
		// 新dom存在文本，且没有子元素数组，不管老元素是文本还是子元素数组，只要和新元素的文字不一样，就用新元素的文字直接覆盖老元素
		if (newVnode.text !== oldVnode.text) {
			oldVnode.elm.innerText = newVnode.text
		}
		newVnode.elm = oldVnode.elm
	} else {
		//老虚拟dom存在文字，新元素存在数组，则直接用新元素的数组去覆盖老元素
		if (oldVnode.text && oldVnode.children.length == 0) {
			let dom = createElement(newVnode)
			//在老dom之前加入节点，并删除老节点
			oldVnode.elm.parentNode.insertBefore(dom, oldVnode.elm)
			oldVnode.elm.parentNode.removeChild(oldVnode.elm)
		} else {
			//新老元素都是children数组
      updateChildren(oldVnode.elm,oldVnode.children,newVnode.children)
		}
	}
}
