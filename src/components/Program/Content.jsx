export default function ProgramContent({ setOpenDonationModal }) {
  return (
    <div className="flex h-[490px] max-h-[490px] gap-5">
      <img
        className="w-[70%] rounded-2xl object-cover"
        src="./thumb/frame-308.png"
        alt="Header Image"
      />
      <div className="flex w-[30%] flex-col justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-lexend-deca font-medium">Judul</h2>
          <p className="line-clamp-2 text-pretty text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, faucibus ac
            elit nec, mattis posuere dui.
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-lexend-deca font-medium">Cerita</h2>
          <div className="flex flex-col gap-2">
            <p className="line-clamp-[8] text-balance text-sm">
              Maecenas ac metus ut erat maximus interdum. Donec vel ex vel
              sapien convallis maximus pharetra at velit. Maecenas tincidunt
              turpis nisl. Vivamus pharetra, felis in porttitor porta, turpis
              erat facilisis nunc, eu fermentum lectus augue in lorem. Integer
              maximus sem et tellus interdum fermentum. Mauris elit orci,
              consequat sed leo scelerisque, ornare volutpat tortor.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-lexend-deca font-medium">Pemilik</h2>
          <div className="flex items-center gap-2">
            <img
              className="h-8 rounded-full object-contain"
              src="./thumb/frame-308-4x4.png"
              alt="Avatar Image"
            />
            <p className="text-lg font-medium">0X0E...2E95</p>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="flex flex-1 flex-col gap-1">
            <h2 className="font-lexend-deca font-medium">Dibuat</h2>
            <p className="text-sm">7 Juli 2024</p>
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <h2 className="font-lexend-deca font-medium">Selesai</h2>
            <p className="text-sm">30 Juli 2024</p>
          </div>
        </div>
        <button
          onClick={() => {
            setOpenDonationModal(true);
            globalThis.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="rounded-lg bg-dark p-6 text-xl font-semibold text-white"
        >
          Donasi Sekarang
        </button>
      </div>
    </div>
  );
}
