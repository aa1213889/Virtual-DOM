import createElements from './createElements'

export default function patchVnode(oldVnode, newVnode) {
    //2.1.1 
    if (oldVnode === newVnode) return

    //2.1.2 
    if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
        if (newVnode.text === oldVnode.text) return
        oldVnode.elm.innerText = newVnode.text
        newVnode.elm = oldVnode.elm
    } else {
        //2.1.4
        if (oldVnode.children !== undefined && (oldVnode.children.length > 0)) {
            let un = 0;
            for (let i = 0; i < newVnode.children.length; i++) {
                let ch = newVnode.children[i]
                let isExist = false
                for (let j = 0; j < oldVnode.children.length; j++) {
                    if (oldVnode.children[j].sel === ch.sel && oldVnode.children[j].key === ch.key) {
                        isExist = true
                    }
                }
                if (!isExist) {
                    let dom = createElements(ch)
                    ch.elm = dom
                    if (un < oldVnode.children.length) {
                        oldVnode.elm.insertBefore(dom, oldVnode.children[i].elm)
                    } else {
                        oldVnode.elm.appendChild(dom)
                    }
                } else {
                    un++
                }
            }
        } else
        //2.1.3
        {
            oldVnode.elm.innerText = ''
            for (const item of newVnode.children) {
                oldVnode.elm.appendChild(createElements(item))
            }
        }
    }
}