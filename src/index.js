//关于响应式的代码
// const { default: observe } = require("./defineReactive/observe")
// const { default: Watcher } = require("./defineReactive/watcher")

// let obj={
//   a:{
//     m:{
//       n:4
//     }
//   },
//   b:12,
//   c:'xx',
//   d:[{
//     name:'123'
//   },2,3,4]
// }

// observe(obj)
// new Watcher(obj,'a.m.n',(newVal,oldVal)=>{
//   console.log('a.m.n 发生了改变：',newVal,oldVal)
// })
// console.log(obj.a.m.n)
// obj.a.m.n=3
// delete obj.a.m.n
// console.log(obj.d)
// obj.b=22
// obj.a.m.n=123
// console.log(obj.d[0].name)
// obj.d.push(122312)
// console.log(obj.d)

// 关于diff和虚拟dom --snabbdom
import h from './snabbdom/h'
import patch from './snabbdom/patch'
let btn =document.getElementById('btn');
let container = document.getElementById('app');
let a = h('div',{},'嘻嘻嘻')
let b = h('p',{},'你好')
let c=h('ul',{},[
  h('li',{},"A"),
  h('li',{},"B"),
  h('li',{},"C"),
  h('li',{},"D"),
])
let d=h('ul',{},[
  h('li',{},"D"),
  h('li',{},"E"),
  h('li',{},"F"),
  h('li',{},"F"),
])
patch(container,a)
btn.onclick=function(){
  patch(c,d)
}

