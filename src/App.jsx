import { Route, Routes } from "react-router-dom";

import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { defineChain } from "thirdweb";
import { ThirdwebProvider } from "thirdweb/react";

import HomePage from "./pages/HomePage";
import ProgramDetail from "./pages/ProgramDetail";
import ProgramCreate from "./pages/ProgramCreate";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Create client with ClientId
export const client = createThirdwebClient({
  clientId: import.meta.env.VITE_CLIENT_ID,
});

// Connect to contract
export const contract = getContract({
  client,
  chain: defineChain(11155420),
  address: "0x4D4962632398Dc6f01bAdD7bFC7c9E52b7D6e4ba",
});

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
