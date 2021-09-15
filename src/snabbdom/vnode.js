//虚拟dom的构成是  data数据（props，id，class之类） elm dom对象  sel dom tagname  key虚拟dom的key   children  子元素数组   text自身的文字
export default function(data,elm,sel,children,text){
  return {
    data,elm,sel,key:data.key||undefined,children,text
  }
}