import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-gray-300 text-center py-4">
        © 2026 eCommerce App. All rights reserved.
      </footer>
    </div>
  );
};

export default App;