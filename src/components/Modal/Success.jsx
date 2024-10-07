import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  return (
    <section
      id="donationModalContainer"
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-transparent backdrop-blur-md"
    >
      <div className="rounded-2xl border border-neutral-300 bg-white p-6">
        <div className="flex flex-col items-center gap-7">
          <img className="h-12 w-12" src="./assets/img/icons8-success.gif" alt="" />
          <span className="text-xl font-light">
            Program telah berhasil dibuat!
          </span>
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-blue-400 px-5 py-3 text-sm font-semibold text-white"
          >
            OK
          </button>
        </div>
      </div>
    </section>
  );
}
