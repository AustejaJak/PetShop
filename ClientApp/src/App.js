import React from "react";
import AppRoutes from "./appRoutes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthContext"; // Import AuthProvider

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
