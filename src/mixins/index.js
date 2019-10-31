let navItem = []

const findNavItem = (route, name) => {
  route.forEach(n => {
    if (n.name === name && n.isNavPage) {
      navItem = n.children
    }
    if (n.children && n.children.length) {
      findNavItem(n.children, name)
    }
  })
}

const getRoutesChildren =  {
  computed: {
    childRoutes() {
      var routes = {
        children: this.$router.options.routes
      }
      var route = this.$route.matched
      var name = this.$route.name
      for(var i=0; i < route.length - 1; i++){
        routes = routes.children.find((e) => (e.name == route[i].name))
      }
      findNavItem(routes.children, name)
      return navItem
    }
  }
}

export {
  getRoutesChildren
}