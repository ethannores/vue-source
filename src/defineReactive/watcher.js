import Dep from "./dep"

let uid = 0
//将 'obj.a.x.c'这种点格式的字符串对象路径给整出来
function parseExp(str) {
	let tempArr = str.split('.')
	return (obj) => {
		for (let k = 0; k < tempArr.length; k++) {
			if (!obj) return
			obj = obj[tempArr[k]]
		}
		return obj
	}
}
export default class Watcher {
	constructor(target, expression, callback) {
		console.log('开始进行watcher')
		this.id = uid++
		this.target = target
		this.getter = parseExp(expression)
    this.callback = callback;
    this.value = this.get()
	}
  get(){
    //这个get 是依赖搜集阶段
    Dep.target = this;
    const obj = this.target;
    let value;
    try{
      value  = this.getter(obj)
    }finally{
      Dep.target=null
    }
    return value
  }
  update(){
    this.run()
  }
  run(){
    this.getAndInvoke(this.callback)
  }
  getAndInvoke(cb){
    const value = this.get();
    if(value!==this.value || typeof value =='object'){
      const oldValue = this.value;
      this.value=value;
      cb.call(this,value,oldValue)
    }
  }

}
