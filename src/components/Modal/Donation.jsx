export default function Donation({ setOpenDonationModal }) {
  return (
    <section className="absolute bottom-0 top-0 z-50 flex h-full w-full items-center justify-center bg-neutral-300 bg-opacity-80">
      <div className="rounded-2xl bg-white p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold text-slate-800">Donasi</h1>
          <button
            type="click"
            onClick={() => setOpenDonationModal(false)}
            className="flex h-full items-center justify-center rounded-lg bg-slate-800 p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 fill-white"
              viewBox="0 0 320 512"
            >
              <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
          </button>
        </div>
        <form action="" className="mt-3 flex flex-col gap-4">
          <label
            htmlFor="donation"
            className="flex flex-col gap-1 font-lexend-deca font-medium"
          >
            Jumlah Pemberian Donasi
            <input
              className="w-86 rounded-md bg-neutral-300 p-2"
              id="donation"
              type="text"
            />
          </label>
          <label
            htmlFor="message"
            className="flex flex-col gap-1 font-lexend-deca font-medium"
          >
            Berikan Pesan Anda
            <textarea
              className="max-h-44 w-86 rounded-md bg-neutral-300 p-2"
              name="message"
              id="message"
            ></textarea>
          </label>
          <button
            type="submit"
            className="rounded-md bg-dark p-2 font-lexend-deca text-xl font-semibold text-white"
          >
            Kirim
          </button>
        </form>
      </div>
    </section>
  );
}
