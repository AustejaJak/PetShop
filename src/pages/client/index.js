import { Routes as DomRoutes, Route } from "react-router-dom";
import Routes from "../../routes/routes";

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
        <Route path={Routes.client.base} element={<InitialUiPage />} />
      </DomRoutes>
    </>
  );
};

export default Client;