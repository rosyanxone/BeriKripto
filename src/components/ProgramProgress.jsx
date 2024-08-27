export default function ProgramProgress() {
  return (
    <div className="flex">
      <div className="flex w-[70%] flex-col gap-4 pr-4">
        <div className="flex items-center gap-5">
          <div className="h-5 w-full rounded-full bg-light">
            <div
              className="h-5 rounded-full bg-violet-500"
              style={{ width: "45%" }}
            ></div>
          </div>
          <span className="text-2xl font-semibold">70%</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <h2 className="font-lexend-deca font-medium">Target Donasi</h2>
            <p className="text-sm">12 ETH</p>
          </div>
          <div className="flex flex-col items-end">
            <h2 className="font-lexend-deca font-medium">Lacak Donasi</h2>
            <a className="text-sm underline" href="#">
              etherscan.io/F3C7C2
            </a>
          </div>
          <div className="flex flex-col">
            <h2 className="font-lexend-deca font-medium">Donasi Terkumpul</h2>
            <p className="text-sm">11.2 ETH</p>
          </div>
        </div>
      </div>
    </div>
  );
}
