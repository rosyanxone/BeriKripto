export default function Navbar() {
  return (
    <nav className="container-wraper sticky top-0 z-20 border-b-2 border-slate-300 bg-white">
      <div className="wraper flex items-center justify-between">
        <a href="/" className="fontle text-3xl font-semibold text-primary">
          BeriKripto
        </a>
        <button className="rounded-lg bg-primary px-5 py-3">
          <span className="font-lexend-deca text-lg font-semibold text-white">
            Hubungkan
          </span>
        </button>
      </div>
    </nav>
  );
}
