import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProgramDetail from "./pages/ProgramDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <div className="min-h-screen font-poppins">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail" element={<ProgramDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
