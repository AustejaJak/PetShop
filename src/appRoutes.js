import React from "react";
import { Routes, Route } from "react-router-dom";
import Client from "./pages/client";

const AppRoutes = () => {
  return (
    <div className='relative'>
      <Routes>
            <Route path={`/*`} element={<Client />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;