import h from './vdom/h'

const myVode = h('ul', {}, [h('li', {}, '苹果'), h('li', {}, '西瓜'), h('li', {}, '橘子'), h('li', {}, '火龙果')])
console.log(myVode)