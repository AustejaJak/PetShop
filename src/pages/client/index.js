import { Routes as DomRoutes, Route } from "react-router-dom";
import Routes from "../../routes/routes";
import HeroSectionComponent from "../../components/heroSectionComponent/heroSectionComponent";
import StatSectionComponent from "../../components/statSectionComponent/statSectionComponent";
import Footer from "../../components/footer/footer";

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
      </DomRoutes>
        <Footer/>
    </>
  );
};

export default Client;