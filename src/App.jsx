import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProgramDetail from "./pages/ProgramDetail";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DonationModal from "./components/Modal/Donation";
import { useEffect, useState } from "react";

export default function App() {
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    const body = document.body;
    body.style.overflow = "unset";
    if (isModal) {
      body.style.overflow = "hidden";
    }
  }, [isModal]);

  return (
    <div className="font-poppins">
      {isModal ? (
        <section
          className="absolute bottom-0 top-0 z-50 w-full bg-neutral-300 bg-opacity-80"
          onClick={() => setIsModal(false)}
        >
          <DonationModal setIsModal={setIsModal} />
        </section>
      ) : (
        ""
      )}
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/detail"
            element={<ProgramDetail setIsModal={setIsModal} />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
