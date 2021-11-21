import h from './vdom/h'
import patch from './vdom/patch'

const container = document.querySelector('#container')

const ulVnode = h('ul', {}, [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
])

//第一次上树
patch(container, ulVnode)
const btn = document.querySelector('#btn')


const ulVnode2 = h('ul', {}, [
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
    h('li', { key: 'D' }, 'D'),
])
btn, onclick = function() {
    patch(ulVnode, ulVnode2)
}