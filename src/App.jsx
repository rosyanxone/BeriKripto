import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProgramDetail from "./pages/ProgramDetail";
import ProgramCreate from "./pages/ProgramCreate";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex h-screen flex-col justify-between font-poppins">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail" element={<ProgramDetail />} />
          <Route path="/create" element={<ProgramCreate />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
