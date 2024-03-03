const Routes = {
    client: {
      prefix: "/client",
      base: "/",
      register: "/sign-up",
      login: "/log-in",
      profile: "/profile",
        category: "/shop/:category",
        product: "/shop/:category/:productId",
        individualProduct: "/product/:productId",
        shoppingBag: "/shopping-bag",
    },
  };

export default Routes;