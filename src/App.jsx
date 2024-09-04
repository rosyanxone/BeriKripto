import { Route, Routes } from "react-router-dom";
import { ThirdwebProvider } from "thirdweb/react";

import HomePage from "./pages/HomePage";
import ProgramDetail from "./pages/ProgramDetail";
import ProgramCreate from "./pages/ProgramCreate";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ThirdwebProvider>
      <div className="flex h-screen flex-col justify-between font-poppins">
        <div>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/detail/:id" element={<ProgramDetail />} />
              <Route path="/create" element={<ProgramCreate />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </ThirdwebProvider>
  );
}
