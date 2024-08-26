import Navbar from "./components/Navbar";
import ProgramCard from "./components/ProgramCard";

export default function App() {
  return (
    <>
      <div className="min-h-screen font-poppins">
        <Navbar />
        <section className="container-wraper" id="programs">
          <div className="wraper">
            <p className="text-xl font-medium">Semua Program (6)</p>
            <div className="grid grid-cols-3 justify-between gap-y-8 py-4">
              <ProgramCard />
              <ProgramCard />
              <ProgramCard />
              <ProgramCard />
              <ProgramCard />
              <ProgramCard />
              <ProgramCard />
              <ProgramCard />
            </div>
          </div>
        </section>
      </div>
      <footer className="container-wraper w-full bg-slate-800">
        <span className="text-sm font-medium text-white">
          BeriEther © 2024
        </span>
      </footer>
    </>
  );
}
