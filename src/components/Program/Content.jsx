import { convertUnixTimestamp, getShorterAddress } from "../../utils";
import { useStateContext } from "../../context";
import ProgramProgress from "./Progress";

import { useParams } from "react-router-dom";
import { MetaMaskAvatar } from "react-metamask-avatar";
import { useEffect } from "react";

export default function ProgramContent({
  program,
  isOwner,
  setOpenDonationModal,
  setOpenReportModal,
}) {
  const { id } = useParams();

  const dateTimeNow = Math.floor(Date.now() / 1000);

  const { getDonation, isPending, isError, isSuccess } = useStateContext();

  useEffect(() => {
    if (isPending) {
      // do something
    }

    if (isError) {
      // do something
    }

    if (isSuccess) {
      // do something
    }
  }, [isPending, isError, isSuccess]);

  return (
    <div className="flex gap-5">
      <div className="w-[70%] space-y-5">
        <img
          className="max-h-[490px] w-full rounded-2xl object-cover"
          src={program.image}
          alt="Header Image"
        />
        <ProgramProgress
          recipient={program.recipient}
          target={String(program.target)}
          amountCollected={String(program.amountCollected)}
        />
      </div>
      <div className="flex h-[490px] w-[30%] flex-col justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="font-lexend-deca font-medium">Judul</h2>
          <p className="line-clamp-2 text-pretty text-sm">{program.title}</p>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-lexend-deca font-medium">Cerita</h2>
          <div className="flex max-h-40 flex-col gap-2 overflow-auto">
            <p className="text-balance text-sm">{program.description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-lexend-deca font-medium">Pemilik</h2>
          <div className="flex items-center gap-2">
            <MetaMaskAvatar address={program.owner} size={32} />
            <p className="text-lg font-medium">
              {getShorterAddress(program.owner).toUpperCase()}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="flex flex-1 flex-col gap-1">
            <h2 className="font-lexend-deca font-medium">Dibuat</h2>
            <p className="text-sm">
              {convertUnixTimestamp(program.createdAt, false)}
            </p>
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <h2 className="font-lexend-deca font-medium">Selesai</h2>
            <p className="text-sm">
              {convertUnixTimestamp(program.deadline, false)}
            </p>
          </div>
        </div>
        {program.isFinish ? (
          <button
            onClick={() => {
              setOpenReportModal(true);
            }}
            className="rounded-lg bg-dark p-6 text-xl font-semibold text-white"
          >
            Laporan Penyaluran
          </button>
        ) : isOwner ? (
          <button
            onClick={() => getDonation(id)}
            className="rounded-lg bg-dark p-6 text-xl font-semibold text-white"
          >
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

        {/* New Logic */}
        <div className="">
          {program.isFinish
            ? "laporan penyaluran"
            : program.amountCollected >= program.target ||
                dateTimeNow >= program.deadline
              ? isOwner && "tarik donasi"
              : "donasi sekarang"}
        </div>
      </div>
    </div>
  );
}
