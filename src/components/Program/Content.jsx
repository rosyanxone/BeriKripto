import { convertUnixTimestamp, getShorterAddress } from "../../utils";
import ProgramProgress from "./Progress";

import { MetaMaskAvatar } from "react-metamask-avatar";

export default function ProgramContent({
  recipient,
  image,
  target,
  amountCollected,
  title,
  description,
  owner,
  deadline,
  isFinish,
  createdAt,
  isOwner,
  setOpenDonationModal,
  setOpenReportModal,
}) {
  return (
    <div className="flex gap-5">
      <div className="w-[70%] space-y-5">
        <img
          className="max-h-[490px] w-full rounded-2xl object-cover"
          src={image}
          alt="Header Image"
        />
        <ProgramProgress
          recipient={recipient}
          target={String(target)}
          amountCollected={String(amountCollected)}
        />
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
            <MetaMaskAvatar address={owner} size={32} />
            <p className="text-lg font-medium">
              {getShorterAddress(owner).toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="flex flex-1 flex-col gap-1">
            <h2 className="font-lexend-deca font-medium">Dibuat</h2>
            <p className="text-sm">{convertUnixTimestamp(createdAt, false)}</p>
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <h2 className="font-lexend-deca font-medium">Selesai</h2>
            <p className="text-sm">{convertUnixTimestamp(deadline, false)}</p>
          </div>
        </div>
        {isFinish ? (
          <button
            onClick={() => {
              setOpenReportModal(true);
            }}
            className="rounded-lg bg-dark p-6 text-xl font-semibold text-white"
          >
            {isOwner ? "Buat Laporan Penyaluran" : "Laporan Penyaluran"}
          </button>
        ) : isOwner ? (
          <button className="rounded-lg bg-dark p-6 text-xl font-semibold text-white">
            Tarik Donasi
          </button>
        ) : (
          <button
            onClick={() => {
              setOpenDonationModal(true);
            }}
            className="rounded-lg bg-dark p-6 text-xl font-semibold text-white"
          >
            Donasi Sekarang
          </button>
        )}
      </div>
    </div>
  );
}
