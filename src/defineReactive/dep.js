
//依赖类
//在劫持数据的get去添加订阅者，然后在set中去触发订阅者的监听事件
let uid=0
export default class Dep{
  constructor(){
    console.log('开始定下依赖');
    this.id=uid++
    this.subs=[]
  }
  addSub(sub){
    this.subs.push(sub)
  }
  depend(){
    //一个全局的接收对象，去接收订阅者，订阅者，在watcher初始化的时候会给Dep target赋值，ps：这个可以为window.xxx只要保证该值唯一即可
    Dep.target&&this.addSub(Dep.target)
  }
  notify(){
    console.log('触发了 notify');
    //浅克隆一份是因为 直接使用 this.subs去做循环，会无限循环
    let subs = this.subs.slice()
    for(let i=0;i<subs.length;i++){
      subs[i].update()
    }
  }
}