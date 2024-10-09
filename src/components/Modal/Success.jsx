export default function Success({ message, navUrl }) {
  return (
    <section
      id="donationModalContainer"
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-transparent backdrop-blur-md"
    >
      <div className="rounded-2xl border border-neutral-300 bg-white p-6">
        <div className="flex flex-col items-center gap-7">
          <img
            className="h-12 w-12"
            src="/assets/img/icons8-success.gif"
            alt="success icon"
          />
          <span className="text-xl font-light">{message}</span>
          <a
            href={navUrl}
            className="rounded-lg bg-blue-400 px-5 py-3 text-sm font-semibold text-white"
          >
            OK
          </a>
        </div>
      </div>
    </section>
  );
}
