import createElement from './createElement'
import patchVnode from './patchNode'
import { sameNode } from './utils'
//针对新老子元素都是数组的时候，更新节点
export default function updateChildren(parentNode, oldCh, newCh) {
	//定义四个指针 和四个指针对应的位置node
	let newStartIdx = 0
	let newEndIdx = newCh.length - 1
	let oldStartIdx = 0
	let oldEndIdx = oldCh.length - 1
	let newStartNode = newCh[0]
	let newEndNode = newCh[newEndIdx]
	let oldStartNode = oldCh[0]
	let oldEndNode = oldCh[oldEndIdx]
	let map = {}
	//使用while来遍历，条件是new和old的start指针小于等于end指针
	while (newStartIdx <= newEndIdx && oldStartIdx <= oldEndIdx) {
    console.log(newStartIdx,newEndIdx,oldStartIdx,oldEndIdx);
		//一开始应该判断当前指针指向的元素是否已经是undefined
		// 首先应该不是判断四种命中，而是略过已经加了undefined标记的项
		if (oldStartNode === null || oldCh[oldStartIdx] === undefined) {
			oldStartNode = oldCh[++oldStartIdx]
		} else if (oldEndNode === null || oldCh[oldEndIdx] === undefined) {
			oldEndNode = oldCh[--oldEndIdx]
		} else if (newStartNode === null || newCh[newStartIdx] === undefined) {
			newStartNode = newCh[++newStartIdx]
		} else if (newEndNode === null || newCh[newEndIdx] === undefined) {
			newEndNode = newCh[--newEndIdx]
		} else if (sameNode(oldStartNode, newStartNode)) {
			//1：新前和旧前相同
      console.log('1：新前和旧前相同')
			patchVnode(oldStartNode, newStartNode)
			oldStartNode = oldCh[++oldStartIdx]
			newStartNode = newCh[++newStartIdx]
		} else if (sameNode(oldEndNode, newEndNode)) {
			//2：新后与旧后
      console.log('2：新后与旧后')
			patchVnode(oldEndNode, newEndNode)
			oldEndNode = oldCh[--oldEndIdx]
			newEndNode = newCh[--newEndIdx]
		} else if (sameNode(oldStartNode, newEndNode)) {
			//3：新后与旧前 -- 需要将老节点已到旧后的后面，因为老节点存在，所以不需要构建
      console.log('3：新后与旧前')
			patchVnode(oldStartNode, newEndNode)
			patchVnode.insertBefore(
				oldStartNode.elm,
				oldEndNode.elm.nextSibling
			)
			oldStartNode = [++oldStartIdx]
			newEndNode = [--newEndIdx]
		} else if (sameNode(oldEndNode, newStartNode)) {
			//4：新前与旧后 -- 需要将老节点已到纠结点 现在标记为startIdx的前面
      console.log('4：新前与旧后')
			patchVnode(oldEndNode, newStartNode)
			parentNode.insertBefore(oldEndNode.elm, oldStartNode.elm)
			oldEndNode = oldCh[--oldEndIdx]
			newStartNode = newCh[++newStartIdx]
		} else {
			//当1234种情况都没有命中的时候，则需要循环了
			//构建对象，来缓存数据，这样多次遍历的时候，就不用每次都去找
			if (!map) {
				// 两个指针走过的地方，说明上面四种情况都已经满足了  在老的数组当前的两个指针之间去构建临时对象
				for (let i = oldStartIdx; i <= oldEndIdx; i++) {
					if (oldCh[i]['key']) {
						//用老数组中每条的key值作为对象的key 而i 当前的位置索引作为value 这样新数组中碰到在cache中存在的的key时就能直接找到老数组中对应的元素，而不用每次都去遍历老数组
						map[oldCh[i]['key']] = i
					}
				}
			}
      let oldIndex = map[newStartIdx]
      if (oldIndex) {
        //如果有值则说明在旧前和旧后还没有遍历到的中间存在已有的节点则将其移动
        const tempElem = oldCh[oldIndex]
        patchVnode(tempElem, newStartNode)
        parentNode.insertBefore(tempElem.elm, oldStartNode.elm)
        //将移动过的位置，变为undefined  以便节省下一次遍历的判断
        oldCh[(oldIndex = undefined)]
      } else {
        //说明是新节点，将newStartNode创建为element 然后插入
        parentNode.insertBefore(
          createElement(newStartNode),
          oldStartNode.elm
        )
      }
      //以上两个都对新前的节点做了操作，所以新前节点需要后移一位
      newStartNode = newCh[++newStartIdx]
		}
    console.log(newStartIdx,newEndIdx,oldStartIdx,oldEndIdx);
	}
	//当while全部走完后，判断  前后两个指针是否存在未处理的数据
	if (newStartIdx <= newEndIdx) {
		//说明还有新增的节点没处理，则将新增的节点加入当前老节点标志位的前面，要是老节点标志位不存在为null的时候，则自动加入队尾
		for (let i = newStartIdx; i <= newEndIdx; i++) {
			parentNode.insertBefore(
				createElement(newCh[i]),
				oldCh[oldStartIdx].elm
			)
		}
	} else if (oldStartIdx <= oldEndIdx) {
		for (let i = oldStartIdx; i <= oldEndIdx; i++) {
			if (oldCh[i]) {
				parentNode.removeChild(oldCh[i].elm)
			}
		}
	}
}
