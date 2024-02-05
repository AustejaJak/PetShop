import React from "react";
import { Routes, Route } from "react-router-dom";
import Client from "./pages/client";

const appRoutes = () => {
  return (
    <div className='relative'>
      <Routes>
            <Route path={`/*`} element={<Client />} />
      </Routes>
      <Snackbar />
    </div>
  );
};

export default appRoutes;