import {
  getFormattedEther,
  getShorterAddress,
  getTargetPercentage,
} from "../../utils";

export default function ProgramCard({
  owner,
  image,
  title,
  description,
  amountCollected,
  target,
  id,
}) {
  return (
    <div className="flex w-[402px] flex-col gap-4 rounded-2xl border-2 border-slate-200 bg-slate-100">
      <div className="relative">
        <span className="absolute left-5 top-5 rounded-lg bg-slate-500 bg-opacity-50 p-2.5 text-sm font-semibold text-white">
          by {getShorterAddress(owner).toLowerCase()}
        </span>
        <img
          className="h-40 w-full rounded-2xl object-cover p-0.5 pb-0"
          src={image}
          alt="Thumbnail"
        />
      </div>
      <div className="flex flex-col gap-2 px-5">
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-pretty text-base text-gray-500">{description}</p>
      </div>
      <div className="flex flex-col gap-2 px-5">
        <div className="flex justify-between">
          <span>
            <b>{getFormattedEther(amountCollected)} ETH</b> terkumpul
          </span>
          <b>{getFormattedEther(target)} ETH</b>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-2 w-full rounded-md bg-neutral-200">
            <div
              className="h-2 rounded-full bg-violet-500"
              style={{ width: `${getTargetPercentage(amountCollected, target)}%` }}
            ></div>
          </div>
          {getTargetPercentage(amountCollected, target)}%
        </div>
      </div>
      <div className="my-6 flex justify-center">
        <a
          href={`/detail/${id}`}
          className="font-lexend-deca font-semibold text-primary hover:text-slate-500"
        >
          Detail Program
        </a>
      </div>
    </div>
  );
}
