import { Routes as DomRoutes, Route } from "react-router-dom";
import Routes from "../../routes/routes";
import HeroSectionComponent from "../../components/heroSectionComponent/heroSectionComponent";
import SignInPage from "./signIn/SignIn";
import ProductPage from "./productPage/productPage";
import ProductOverviewPage from "./productOverviewPage/productOverviewPage";
import ProfilePage from "./profilePage/profilePage";
import CheckoutPage from "./checkoutPage/checkoutPage";
import CheckoutFormPage from "./checkoutFormPage/checkoutFormPage";
import OrderHistoryPage from "./orderHistoryPage/orderHistoryPage";
import WishesPage from "./wishesPage/wishesPage";
import AddWishesPage from "./addWishesPage/addWishesPage";

// const userNavigation = [
//   { name: "Mano paskyra"},
//   { name: "Atsijungti"},
// ];

// const navigation = [
//   { name: "Naujienos"},
//   { name: "Kolekcija"},
//   { name: "Parduotuvė"},
// ];

const Client = () => {
  return (
    <>
      {/* <Header profileNavigation={userNavigation} navigation={navigation} /> */}
      <DomRoutes>
        <Route path={Routes.client.base} element={<HeroSectionComponent /> } />
          <Route path={Routes.client.login} element={<SignInPage /> } />
          <Route path={Routes.client.category} element={<ProductPage /> } />
          <Route path={Routes.client.individualProduct} element={<ProductOverviewPage /> } />
          <Route path={Routes.client.profile} element={<ProfilePage /> } />
          <Route path={Routes.client.shoppingBag} element={<CheckoutPage /> } />
          <Route path={Routes.client.checkout} element={<CheckoutFormPage /> } />
          <Route path={Routes.client.orderHistory} element={<OrderHistoryPage /> } />
        <Route path={Routes.client.wishes} element={<WishesPage /> } />
        <Route path={Routes.client.addWishes} element={<AddWishesPage /> } />
      </DomRoutes>
    </>
  );
};

export default Client;