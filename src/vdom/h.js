import vnode from './vnode'

/**
 * 必须接受三个参数 
 * 还未写重置功能
 * h(tag,{},string)
 * h(tag,{},[])
 * h(tag,{},h())
 */

export default function(sel, data, arg) {
    if (arguments.length !== 3) throw new Error('arguments error!')
    if (typeof arg === 'string' || typeof arg === 'number') {
        return vnode(sel, data, undefined, arg, undefined)
    } else if (Array.isArray(arg)) {
        let children = []
        for (const item of arg) {
            if (!(typeof item === 'object' && item.hasOwnProperty('sel'))) throw new Error('arguments error!')
            children.push(item)
        }
        return vnode(sel, data, children, undefined, undefined)
    } else if (typeof arg === 'object' && arg.hasOwnProperty('sel')) {
        return vnode(sel, data, [arg], undefined, undefined)
    } else {
        throw new Error('arguments error!')
    }
}