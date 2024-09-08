import {
  getFormattedEther,
  getShorterAddress,
  getTargetPercentage,
} from "../../utils";

export default function ProgramProgress({
  recipient,
  target,
  amountCollected,
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-5">
        <div className="h-5 w-full rounded-full bg-neutral-200">
          <div
            className="h-5 rounded-full bg-violet-500"
            style={{
              width: `${getTargetPercentage(amountCollected, target)}%`,
            }}
          ></div>
        </div>
        <span className="text-2xl font-semibold">
          {getTargetPercentage(amountCollected, target)}%
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col">
          <h2 className="font-lexend-deca font-medium">Target Donasi</h2>
          <p className="text-sm">{getFormattedEther(target)} ETH</p>
        </div>
        <div className="flex flex-col items-end">
          <h2 className="font-lexend-deca font-medium">Lacak Donasi</h2>
          <a
            className="text-sm underline"
            href={`https://optimism-sepolia.blockscout.com/address/${recipient}`}
            target="_blank"
          >
            {"blockscout.com/" + getShorterAddress(recipient)}
          </a>
        </div>
        <div className="flex flex-col">
          <h2 className="font-lexend-deca font-medium">Donasi Terkumpul</h2>
          <p className="text-sm">{getFormattedEther(amountCollected)} ETH</p>
        </div>
      </div>
    </div>
  );
}
