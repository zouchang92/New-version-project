const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  userName: state => state.user.loginName,
  routes: state => state.permission.routes,
  name: state => state.user.userName,
  thirdMenu: state => state.permission.thirdMenu
}
export default getters
