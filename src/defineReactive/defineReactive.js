import Dep from './dep'
import observe from './observe'

export default function defineReactive(obj, key, val=obj[key]) {
	//闭包
	let dep = new Dep()
	let childObj = observe(val)
	Object.defineProperty(obj, key, {
		enumerable: true,
		configurable: true,
		get() {
			console.log(`访问了属性 ${key}`)
      if(Dep.target){
        console.log('开始将订阅者添加进订阅者库')
        console.log(Dep.target);
        dep.depend();
        //子存在的时候也整上
        childObj&&childObj.dep.depend();
      }
			return val
		},
		set(newVal) {
			if (val === newVal) return
			console.log(`设置属性 ${key} 为 : ${newVal}`)
			val = newVal
			childObj = observe(newVal)
			dep.notify()
		},
	})
}
