export default function ProgramCard() {
  return (
    <div className="flex w-[402px] flex-col gap-4 rounded-2xl border-2 border-slate-200 bg-slate-100">
      <div className="relative">
        <span className="absolute left-5 top-5 rounded-lg bg-slate-800 bg-opacity-70 p-2.5 text-sm font-semibold text-white">
          by 0x123...456
        </span>
        <img
          className="h-40 w-full rounded-2xl object-cover"
          src="./thumb/frame-308.png"
          alt="Thumbnail"
        />
      </div>
      <div className="flex flex-col gap-2 px-5">
        <h1 className="text-xl font-semibold">
          Lorem ipsum dolor sit amet o...
        </h1>
        <p className="text-base text-gray-500">
          Check out our recent campaign. Let's start your investment journey
          from...
        </p>
      </div>
      <div className="flex flex-col gap-2 px-5">
        <div className="flex justify-between">
          <span>
            <b>17.5 ETH</b> terkumpul
          </span>
          <b>25 ETH</b>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-2 w-full rounded-md bg-neutral-300">
            <div
              className="h-2 rounded-md bg-violet-500"
              style={{ width: "45%" }}
            ></div>
          </div>
          70%
        </div>
      </div>
      <div className="my-6 flex justify-center">
        <a
          href="#"
          className="font-lexend-deca font-semibold text-slate-500 hover:text-primary"
        >
          Detail Program
        </a>
      </div>
    </div>
  );
}
