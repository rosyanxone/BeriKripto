import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useStateContext } from "../../context";

export default function Report({
  isOwner,
  openReportModal,
  setOpenReportModal,
}) {
  const { id } = useParams();

  const { getReport } = useStateContext();

  const { report } = getReport(id);

  useEffect(() => {
    if (openReportModal) {
      document.body.addEventListener("click", (e) => {
        if (e.target.id === "reportModalContainer") {
          setOpenReportModal(false);
        }
      });
    }
  }, [openReportModal]);

  return (
    <section
      id="reportModalContainer"
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-transparent backdrop-blur-md"
    >
      <div className="max-w-[1020px] rounded-2xl border border-neutral-300 bg-white p-6">
        <div className="mb-2 flex items-center justify-between">
          <h1 className="text-4xl font-semibold text-slate-800">Penyaluran</h1>
          <button
            onClick={() => setOpenReportModal(false)}
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
        {report ? (
          <div className="flex gap-4">
            <img
              src="/thumb/frame-308 (2).png"
              className="w-[60%] rounded-xl object-cover"
              alt="Report Image"
            />
            <div className="w-[40%]">
              <h1 className="text-pretty text-lg font-medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at
                mollis turpis, id commodo quam.
              </h1>
              <p className="mt-4 text-balance text-sm">
                Aliquam erat volutpat. Donec dapibus libero in augue tristique
                vestibulum. Aliquam gravida justo in est ultrices mollis. Sed
                feugiat suscipit scelerisque. Suspendisse potenti. Praesent
                dignissim ipsum sit amet tincidunt efficitur. Praesent vel
                mollis nibh.
              </p>
            </div>
          </div>
        ) : isOwner ? (
          <form action="" className="flex min-h-[320px] w-[860px] gap-5">
            <div className="flex w-[60%] flex-col gap-2">
              <label
                htmlFor="changeImage"
                className="font-lexend-deca font-medium"
              >
                Unggah Gambar Penyaluran
              </label>
              <div
                className="relative h-full rounded-md bg-neutral-300 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("/thumb/frame-308.png")',
                }}
              >
                <button
                  id="changeImage"
                  type="click"
                  className="absolute bottom-4 left-4 rounded-md bg-light px-4 py-2 text-sm"
                >
                  Ubah Gambar
                </button>
              </div>
            </div>
            <div className="flex w-[40%] flex-1 flex-col gap-3">
              <label
                htmlFor="title"
                className="flex flex-col gap-2 font-lexend-deca font-medium"
              >
                Judul Laporan Penyaluran
                <input
                  className="w-full rounded-md bg-neutral-300 p-2"
                  type="text"
                  id="title"
                />
              </label>
              <label
                htmlFor="story"
                className="flex flex-col gap-2 font-lexend-deca font-medium"
              >
                Ceritakan Proses Penyaluran
                <textarea
                  className="h-48 max-h-60 w-full rounded-md bg-neutral-300 p-2"
                  name="story"
                  id="story"
                ></textarea>
              </label>
              <button className="rounded-lg bg-dark py-4 text-2xl font-semibold text-white">
                Buat
              </button>
            </div>
          </form>
        ) : (
          <div className="flex h-[440px] w-[860px] flex-1 items-center justify-center">
            <span className="mb-5 font-lexend-deca text-2xl font-medium text-slate-500">
              Laporan Belum Dibuat
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
