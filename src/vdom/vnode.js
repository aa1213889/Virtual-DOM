/**
 * 
 * @param {*} sel  Tag名字 如div h1 等等
 * @param {*} data  vnode想要携带的数据
 * @param {*} children 该节点包裹的子节点
 * @param {*} text  节点的文字内容 如<div> text. </div>
 * @param {*} elm  真实dom内容
 * @returns 
 */
export default function(sel, data, children, text, elm) {
    const key = data.key
    return {
        sel,
        data,
        children,
        text,
        elm,
        key
    }
}