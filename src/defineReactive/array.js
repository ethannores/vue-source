import { def } from './util'

//针对数组的几个方法来做变化和监听
const arrayPrototype = Array.prototype
export const arrayMethods = Object.create(arrayPrototype)
//需要改造的数组方法，以便监听数组的响应式
const needChangeMethods = [
	'push',
	'pop',
	'shift',
	'unshift',
	'reserve',
	'sort',
	'splice',
]

//对方法进行改造
needChangeMethods.forEach((methodName) => {
	let originMethod = arrayMethods[methodName]
	def(
		arrayMethods,
		methodName,
		function () {
			const result = originMethod.apply(this, arguments)
			//因为arguments是类数组上面没有 数组的相关方法，所以转成数组
			let argsArr = [...arguments]
			let __ob__ = this.__ob__
			//针对push  unshift  splice可以给数组添加内容的方法进行特殊化处理
      let insertedArr=[];
      switch (methodName) {
				case 'push':
				case 'unshift':
          insertedArr=argsArr;
					break
				case 'splice':
          insertedArr=argsArr.slice(2)
					break
			}
      //判断是否行添加了类对象，是的话也给他加上响应式
      if(insertedArr){
        __ob__.observeArray(insertedArr)
      }
      //触发改造的7的数组方法，都调用下自己上面的通知订阅者更新的事件
      __ob__.dep.notify()
      return result
		},
		false
	)
})
