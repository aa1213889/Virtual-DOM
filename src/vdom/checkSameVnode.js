//判断是否为同一个虚拟节点
export default function checkSameVnode(aNode, bNode) {
    return aNode.sel === bNode.sel && aNode.key === bNode.key
}