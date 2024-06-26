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
      checkout: "/checkout",
      orderHistory: "/order-history",
      wishes: "/wishes",
      addWishes: "/add-wishes",
      addProduct: "/add-product",
      editWish: "/edit-wish/:wishId"
    },
    admin: {
      prefix: "/admin",
      login: "/log-in",
      register: "/sign-up-admin",
      base: "/base",
      products: "/product-validation",
    }
  };

export default Routes;