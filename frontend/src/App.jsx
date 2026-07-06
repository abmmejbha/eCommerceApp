// frontend/src/App.jsx
import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";

const App = () => {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;