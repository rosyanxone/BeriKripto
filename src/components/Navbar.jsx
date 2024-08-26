export default function Navbar() {
  return (
    <nav className="container-wraper border-b-2 border-slate-300">
      <div className="wraper flex items-center justify-between">
        <span className="text-3xl font-semibold fontle text-primary">BeriKripto</span>
        <button className="rounded-lg bg-primary px-5 py-3">
          <span className="text-lg font-semibold font-lexend-deca text-white">Hubungkan</span>
        </button>
      </div>
    </nav>
  );
}
