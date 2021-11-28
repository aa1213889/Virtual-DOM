import checkSameVnode from "./checkSameVnode"
import patchVnode from "./patchVnode"
import createElements from "./createElements"

/** 
 * oldStartIndex 旧节点前指针  oldEndIndex 旧节点后指针
 * newStartIndex 新节点前指针  newEndIndex 新节点后指针
 */
export default function updateChilden(parentElm, oldCh, newCh) {
    let oldStartIndex = 0
    let newStartIndex = 0
    let oldEndIndex = oldCh.length - 1
    let newEndIndex = newCh.length - 1

    let oldStartVnode = oldCh[oldStartIndex]
    let oldEndVnode = oldCh[oldEndIndex]
    let newStartVnode = newCh[newStartIndex]
    let newEndVnode = newCh[newEndIndex]

    let keyMap = null
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if (oldStartVnode === undefined) {
            oldStartVnode = oldCh[++oldStartIndex]
        } else if (oldEndVnode === undefined) {
            oldEndVnode = oldCh[--oldEndIndex]
        } else if (newStartVnode === undefined) {
            newStartVnode = newCh[--newStartIndex]
        } else if (newEndVnode === undefined) {
            newEndVnode = newCh[++newEndIndex]
        }
        /**
         * 1.新前与旧前：如果前节点相等 进行patchVnode操作 并且旧前指针和新前指针都往后移一位
         * 2.新后与旧后：如果后节点相等 进行patchVnode操作 并且旧后指针和新后指针都往前移一位
         * 3.新后与旧前:  如果新后节点与旧前节点相等 进行patchVnode操作 并且新后指针往前移一位，旧前指针往前移一位。
         *                     且当新后与旧前相等的时候，此时要移动节点,
         *                     移动新前指向的这个节点(newStartVnode)到老节点的旧后(oldEndVnode)的后面
         * 4.新前与旧后:  如果新前节点与旧后节点相等 进行patchVnode操作 并且新前指针往后移一位，旧后指针往前移一位。
         *                     且当新前与旧后相等的时候，此时要移动节点,
         *                     移动新前指向的这个节点(newStartVnode)到老节点的旧后(oldEndVnode)的后面
         * 5.四种比较都没有命中
         */
        else if (checkSameVnode(oldStartVnode, newStartVnode)) {
            patchVnode(oldStartVnode, newStartVnode)
            oldStartVnode = oldCh[++oldStartIndex]
            newStartVnode = newCh[++newStartIndex]
        } else if (checkSameVnode(oldEndVnode, newEndVnode)) {
            patchVnode(oldEndVnode, newEndVnode)
            oldEndVnode = oldCh[--oldEndIndex]
            newEndVnode = newCh[--newEndIndex]
        } else if (checkSameVnode(oldStartVnode, newEndVnode)) {
            patchVnode(oldStartVnode, newEndVnode)
            parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling)
            oldStartVnode = oldCh[++oldStartIndex]
            newEndVnode = newCh[--newEndIndex]
        } else if (checkSameVnode(oldEndVnode, newStartVnode)) {
            patchVnode(oldEndVnode, newStartVnode)
            parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm)
            oldEndVnode = oldCh[--oldEndIndex]
            newStartVnode = newCh[++newStartIndex]
        } else {
            //5.都没有匹配到 制作keyMap作为映射对象 起到缓存的作用
            if (!keyMap) {
                keyMap = {}
                for (let i = oldStartIndex; i <= oldEndIndex; i++) {
                    const key = oldCh[i].key
                    if (key) keyMap[key] = i
                }
            }
            //在keyMap中映射位置序号
            const indexInOld = keyMap[newStartVnode.key]
            if (!indexInOld) {
                //是全新的节点 
                parentElm.insertBefore(createElements(newStartVnode), oldStartVnode.elm)
            } else {
                //不是全新的节点 需要移动
                const elmToMove = oldCh[indexInOld]
                if (elmToMove.elm.nodeType === 1) {
                    patchVnode(elmToMove, newStartVnode)
                    oldCh[indexInOld] = undefined
                    parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
                }
            }
            newStartVnode = newCh[++newStartIndex]
        }
    }

    //循环结束后 新前还是比新后小 说明还有剩余新节点没有处理
    if (newStartIndex <= newEndIndex) {
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            parentElm.insertBefore(createElements(newCh[i]), oldCh[oldStartIndex].elm)
        }
    }
    //循环结束后 旧前还是比旧后小 说明还有剩余旧节点需要批量删除
    else if (oldStartIndex <= oldEndIndex) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            if (oldCh[i]) {
                parentElm.removeChild(oldCh[i].elm)
            }
        }
    }
}