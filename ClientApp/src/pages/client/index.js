import { Routes as DomRoutes, Route } from "react-router-dom";
import Routes from "../../routes/routes";
import HeroSectionComponent from "../../components/heroSectionComponent/heroSectionComponent";
import SignInPage from "./signIn/SignIn";
import RegisterPage from "./registerPage/registerPage";
import ProductPage from "./productPage/productPage";
import ProductOverviewPage from "./productOverviewPage/productOverviewPage";
import ProfilePage from "./profilePage/profilePage";
import CheckoutPage from "./checkoutPage/checkoutPage";
import CheckoutFormPage from "./checkoutFormPage/checkoutFormPage";
import OrderHistoryPage from "./orderHistoryPage/orderHistoryPage";
import WishesPage from "./wishesPage/wishesPage";
import AddWishesPage from "./addWishesPage/addWishesPage";
import AddProductPage from "./addProductPage/addProductPage";
import EditWishPage from "./editWishesPage/editWishesPage";
import { AuthProvider } from "../../AuthContext";
import AdminRegisterPage from "../admin/adminRegisterPage/adminRegisterPage";
import UserListPage from "../admin/userListPage/userListPage";

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
      <AuthProvider>
        <DomRoutes>
          <Route path={Routes.client.base} element={<HeroSectionComponent />} />
          <Route path={Routes.client.register} element={<RegisterPage />} />
          <Route path={Routes.client.login} element={<SignInPage />} />
          <Route path={Routes.admin.register} element={<AdminRegisterPage />} />
          <Route path={Routes.admin.base} element={<UserListPage />} />
          <Route path={Routes.client.category} element={<ProductPage />} />
          <Route path={Routes.client.individualProduct} element={<ProductOverviewPage />} />
          <Route path={Routes.client.profile} element={<ProfilePage />} />
          <Route path={Routes.client.shoppingBag} element={<CheckoutPage />} />
          <Route path={Routes.client.checkout} element={<CheckoutFormPage />} />
          <Route path={Routes.client.orderHistory} element={<OrderHistoryPage />} />
          <Route path={Routes.client.wishes} element={<WishesPage />} />
          <Route path={Routes.client.addWishes} element={<AddWishesPage />} />
          <Route path={Routes.client.addProduct} element={<AddProductPage />} />
          <Route path={Routes.client.editWish} element={<EditWishPage />} />
        </DomRoutes>

      </AuthProvider>
    </>
  );
};

export default Client;