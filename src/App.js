import AppRoutes from "./appRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
        <BrowserRouter>
            <AppRoutes/>
        </BrowserRouter>
  );
}

export default App;
