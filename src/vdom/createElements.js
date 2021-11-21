/** 
 * 创建真实节点 
 * 将vnode创建为DOM
 * 1.当vnode内部是文本且没有children时
 * 2.有子元素时 需要递归遍历递归
 *    并在父元素vnode.elm 里appendChild 子元素的真实节点
 */
export default function createElements(vnode) {
    let domNode = document.createElement(vnode.sel)
    vnode.elm = domNode
    if (vnode.text != '' && vnode.children === undefined || vnode.children.length === 0) {
        domNode.innerText = vnode.text
    } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
        for (const item of vnode.children) {
            domNode.appendChild(createElements(item))
        }
    }
    vnode.elm = domNode
    return domNode
}