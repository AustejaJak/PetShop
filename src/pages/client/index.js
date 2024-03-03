import { Routes as DomRoutes, Route } from "react-router-dom";
import Routes from "../../routes/routes";
import HeroSectionComponent from "../../components/heroSectionComponent/heroSectionComponent";
import SignInPage from "./signIn/SignIn";
import ProductPage from "./productPage/productPage";

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
      </DomRoutes>
    </>
  );
};

export default Client;