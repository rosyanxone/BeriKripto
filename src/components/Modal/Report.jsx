import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useStateContext } from "../../context";

export default function Report({
  isOwner,
  openReportModal,
  setOpenReportModal,
}) {
  const { id } = useParams();

  const [reportImage, setReportImage] = useState({});
  const [reportTitle, setReportTitle] = useState("");
  const [reportStory, setReportStory] = useState("");
  const [loading, setLoading] = useState(true);

  const { createReport, getReport, uploadToIpfs } = useStateContext();

  const { report } = getReport(id);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (openReportModal) {
      document.body.addEventListener("click", (e) => {
        if (e.target.id === "reportModalContainer") {
          setOpenReportModal(false);
        }
      });
    }
  }, [openReportModal]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    uploadToIpfs(reportImage, reportTitle).then((imgResult) => {
      createReport({
        _id: id,
        _title: reportTitle,
        _story: reportStory,
        _image: imgResult,
      });
    });
  };

  const onUploadHandler = (e) => {
    const file = e.target.files[0];
    const image = URL.createObjectURL(file);

    const imgPreview = document.getElementById("imagePreview");
    imgPreview.style.backgroundImage = `url(${image})`;

    setReportImage(file);
  };

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
        {!loading ? (
          <>
            {report ? (
              <div className="flex min-h-[320px] w-[860px] gap-5">
                <img
                  src={report.image}
                  className="w-[60%] rounded-xl object-cover"
                  alt="Report Image"
                />
                <div className="w-[40%]">
                  <h1 className="text-pretty text-lg font-medium">
                    {report.title}
                  </h1>
                  <p className="mt-4 text-balance text-sm">{report.story}</p>
                </div>
              </div>
            ) : isOwner ? (
              <form
                onSubmit={onSubmitHandler}
                className="flex min-h-[320px] w-[860px] gap-5"
              >
                <div className="flex w-[60%] flex-col gap-2">
                  <label
                    htmlFor="changeImage"
                    className="font-lexend-deca font-medium"
                  >
                    Unggah Gambar Penyaluran
                  </label>
                  <div
                    id="imagePreview"
                    className="relative h-full rounded-md bg-gray-200 bg-cover bg-center"
                    style={{
                      backgroundImage: 'url("/thumb/frame-308.png")',
                    }}
                  >
                    <input
                      id="imageUpload"
                      type="file"
                      className="absolute bottom-4 left-4 text-slate-500 file:mr-4 file:cursor-pointer file:rounded-md file:border-0 file:bg-neutral-100 file:px-5 file:py-3 file:text-base"
                      onChange={onUploadHandler}
                      accept="image/*"
                      required
                    />
                  </div>
                </div>
                <div className="flex w-[40%] flex-1 flex-col gap-3">
                  <label
                    htmlFor="title"
                    className="flex flex-col gap-2 font-lexend-deca font-medium"
                  >
                    Judul Laporan Penyaluran
                    <input
                      className="w-full rounded-md bg-gray-200 p-2"
                      type="text"
                      id="title"
                      onChange={(e) => setReportTitle(e.target.value)}
                      value={reportTitle}
                      required
                    />
                  </label>
                  <label
                    htmlFor="story"
                    className="flex flex-col gap-2 font-lexend-deca font-medium"
                  >
                    Ceritakan Proses Penyaluran
                    <textarea
                      className="h-48 max-h-60 w-full rounded-md bg-gray-200 p-2"
                      name="story"
                      id="story"
                      onChange={(e) => setReportStory(e.target.value)}
                      value={reportStory}
                      required
                    ></textarea>
                  </label>
                  <button
                    type="submit"
                    className="rounded-lg bg-dark py-4 text-2xl font-semibold text-white"
                  >
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
          </>
        ) : (
          <div className="flex h-[440px] w-[860px] flex-1 items-center justify-center">
            <span className="mb-5 font-lexend-deca text-2xl font-medium text-slate-500">
              Mohon tunggu...
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
