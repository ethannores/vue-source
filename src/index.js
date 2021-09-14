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