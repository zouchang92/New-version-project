import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    console.log(vnode, binding, el)
    const { value } = binding
    const menu = store.getters && store.getters.thirdMenu
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
