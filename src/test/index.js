import { init, classModule, propsModule, styleModule, eventListenersModule, h } from 'snabbdom'

//1.创建出patch函数
const patch = init([
    classModule, // makes it easy to toggle classes
    propsModule, // for setting properties on DOM elements
    styleModule, // handles styling on elements with support for animations
    eventListenersModule // attaches event listeners
])

//2.创建虚拟节点
const myVnode = h('ul', [h('li', '苹果'), h('li', '西瓜'), h('li', '橘子'), h('li', '火龙果')])
console.log(myVnode)

//3.让虚拟节点上树
const container = document.getElementById('container')
patch(container, myVnode)