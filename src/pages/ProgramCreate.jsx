export default function ProgramCreate() {
  return (
    <div className="container-wraper">
      <form action="" className="wraper grid grid-cols-2 gap-5">
        <div className="flex h-full flex-col gap-2">
          <label
            htmlFor="changeImage"
            className="font-lexend-deca text-lg font-medium"
          >
            Unggah Gambar Program
          </label>
          <div
            className="relative h-full rounded-md bg-red-500 bg-cover bg-center"
            style={{
              backgroundImage: 'url("./thumb/frame-308.png")',
            }}
          >
            <button
              id="changeImage"
              type="click"
              className="absolute bottom-4 left-4 rounded-md bg-light px-5 py-3 text-base"
            >
              Ubah Gambar
            </button>
          </div>
        </div>
        <div className="flex h-full w-full flex-1 flex-col gap-3">
          <label
            htmlFor="title"
            className="flex flex-col gap-2 font-lexend-deca text-lg font-medium"
          >
            Beri Judul Program
            <input
              className="w-full rounded-md bg-neutral-300 p-2"
              type="text"
              id="title"
            />
          </label>
          <label
            htmlFor="story"
            className="flex flex-col gap-2 font-lexend-deca text-lg font-medium"
          >
            Ceritakan tentang Program
            <textarea
              className="w-full rounded-md bg-neutral-300 p-2"
              name="story"
              id="story"
            ></textarea>
          </label>
          <label
            htmlFor="deadline"
            className="flex flex-col gap-2 font-lexend-deca text-lg font-medium"
          >
            Kapan Program Berakhir
            <input
              className="w-full rounded-md bg-neutral-300 p-2"
              type="date"
              id="deadline"
            />
          </label>
          <label
            htmlFor="target"
            className="flex flex-col gap-2 font-lexend-deca text-lg font-medium"
          >
            Target donasi program
            <input
              className="w-full rounded-md bg-neutral-300 p-2"
              type="text"
              inputMode="numeric"
              id="target"
            />
          </label>
          <button className="mt-4 rounded-lg bg-dark py-6 text-2xl font-medium text-white">
            Buat Program
          </button>
        </div>
      </form>
    </div>
  );
}
