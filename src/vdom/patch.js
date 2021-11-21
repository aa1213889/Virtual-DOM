import vnode from './vnode'
import createElements from './createElements'
import patchVnode from './patchVnode'

/**
 * 1.判断传入的第一个参数是dom节点还是虚拟节点
 *    传入的是dom节点,需要包装为虚拟节点
 * 2.判断old与new是不是同一个节点  
 *    2.1 是同一个节点
 *      2.1.1 判断oldVnode 与 newVnode 是否是同一个对象
 *      2.1.2 判断 newVnode 有无text属性
 *               如果newVnode.text  与 判断oldVnode 不同，直接将新的text写入oldVnode.elm
 *      2.1.3 newVnode有children时 oldVnode没有
 *              清空老的节点的内容 并为新的节点加入children dom内容
 *      2.1.4 newVnode oldVnode都有children时
 *    2.2 不是同一个节点 则需要暴力创建真实节点 
 *          将孤儿节点上树，让oldVnode的父元素调用insertBefore方法，将孤儿节点插入到oldVnode节点之前
 *          插入完之后并删除老节点
 */
export default function patch(oldVnode, newVnode) {
    /* 1 */
    if (oldVnode.sel === '' || oldVnode.sel === undefined) {
        oldVnode = vnode(oldVnode.tagName.toLocaleLowerCase(), {}, [], undefined, oldVnode)
    }

    /* 2 */
    if (oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
        patchVnode(oldVnode, newVnode)
    } else {
        let newNodeElm = createElements(newVnode)
        if (oldVnode.elm.parentNode && newNodeElm) {
            oldVnode.elm.parentNode.insertBefore(newNodeElm, oldVnode.elm)
        }
        oldVnode.elm.parentNode.removeChild(oldVnode.elm)
    }
}