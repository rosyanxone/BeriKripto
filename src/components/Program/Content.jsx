import { convertUnixTimestamp, getShorterAddress } from "../../utils";
import ProgramProgress from "./Progress";

export default function ProgramContent({
  image,
  target,
  amountCollected,
  title,
  description,
  owner,
  deadline,
  setOpenDonationModal,
}) {
  return (
    <div className="flex gap-5">
      <div className="w-[70%] space-y-5">
        <img
          className="max-h-[490px] w-full rounded-2xl object-cover"
          src={image}
          alt="Header Image"
        />
        <ProgramProgress target={String(target)} amountCollected={String(amountCollected)} />
      </div>
      <div className="flex h-[490px] w-[30%] flex-col justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-lexend-deca font-medium">Judul</h2>
          <p className="line-clamp-2 text-pretty text-sm">{title}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-lexend-deca font-medium">Cerita</h2>
          <div className="flex flex-col gap-2">
            <p className="line-clamp-[8] text-balance text-sm">{description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-lexend-deca font-medium">Pemilik</h2>
          <div className="flex items-center gap-2">
            <img
              className="h-8 rounded-full object-contain"
              src="/thumb/frame-308-4x4.png"
              alt="Avatar Image"
            />
            <p className="text-lg font-medium">{getShorterAddress(owner)}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="flex flex-1 flex-col gap-1">
            <h2 className="font-lexend-deca font-medium">Dibuat</h2>
            <p className="text-sm">7 Juli 2024</p>
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <h2 className="font-lexend-deca font-medium">Selesai</h2>
            <p className="text-sm">{convertUnixTimestamp(deadline, false)}</p>
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
