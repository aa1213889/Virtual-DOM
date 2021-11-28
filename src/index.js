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
    h('li', { key: 'D' }, 'D'),
    h('li', { key: 'E' }, 'E'),
    h('li', { key: 'A' }, 'A'),
    h('li', { key: 'Q' }, 'Q'),
    h('li', { key: 'B' }, 'B'),
    h('li', { key: 'C' }, 'C'),
])


// const ulVnode2 = h('ul', {}, [
//     h('li', { key: 'A' }, 'A'),
//     h('li', { key: 'B' }, 'B'),
//     h('li', { key: 'C' }, 'C'),
//     h('li', { key: 'D' }, 'D'),
//     h('li', { key: 'E' }, 'E'),
// ])

// const ulVnode2 = h('ul', {}, [
//   h('li', { key: 'C' }, 'C'),
//   h('li', { key: 'B' }, 'B'),
//   h('li', { key: 'A' }, 'A')
// ])

// const ulVnode2 = h('ul', {}, [
//     h('li', { key: 'q' }, 'qqq'),
//     h('li', { key: 'q1' }, 'qqq1')
// ])
btn, onclick = function() {
    patch(ulVnode, ulVnode2)
}