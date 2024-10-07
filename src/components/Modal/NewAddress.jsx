import { useState } from "react";

export default function NewAddress({
  walletKey,
  setNewWalletAddress,
  setOpenNewAddressModal,
}) {
  const [isShow, setIsShow] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [publicAddress, setPublicAddress] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    setNewWalletAddress(publicAddress);
  };

  const onCopyText = () => {
    navigator.clipboard.writeText(walletKey);

    setIsCopied(true);
  };

  return (
    <section
      id="donationModalContainer"
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-transparent backdrop-blur-md"
    >
      <div className="rounded-2xl border border-neutral-300 bg-white p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold text-slate-800">
            Program Baru
          </h1>
          <button
            type="click"
            onClick={() => setOpenNewAddressModal(false)}
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
        <form onSubmit={onSubmitHandler} className="mt-3 flex flex-col gap-6">
          <label
            htmlFor="privateKey"
            className="relative flex flex-col gap-1.5 text-lg font-medium"
          >
            Private Key
            <input
              id="privateKey"
              type={isShow ? "text" : "password"}
              className="w-full rounded-md bg-gray-200 p-2 pr-20"
              value={walletKey}
              disabled
            />
            <button
              type="button"
              onClick={() => setIsShow(!isShow)}
              className="absolute end-2 top-1/2 inline-flex -translate-x-9 -translate-y-[38%] items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            >
              {isShow ? (
                <span id="show-icon">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z" />
                  </svg>
                </span>
              ) : (
                <span id="hide-icon">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                  >
                    <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm9.4 130.3C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5l-41.9-33zM192 256c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5z" />
                  </svg>
                </span>
              )}
            </button>
            <button
              onClick={onCopyText}
              type="button"
              className="absolute end-2 top-1/2 inline-flex -translate-y-[40%] items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100"
            >
              {isCopied ? (
                <span id="success-icon" className="inline-flex items-center">
                  <svg
                    className="h-5 w-5 text-blue-700 dark:text-blue-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                </span>
              ) : (
                <span id="default-icon">
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z" />
                  </svg>
                </span>
              )}
            </button>
            <p className="text-sm">
              Salin <b>Key</b> berikut untuk mendapatkan akun penerima donasi
              <span className="text-red-500">*</span>
            </p>
          </label>
          <label
            htmlFor="publicAddress"
            className="flex flex-col gap-1.5 text-lg font-medium"
          >
            Public Address
            <input
              id="publicAddress"
              type="text"
              className="w-full rounded-md bg-gray-200 p-2"
              value={publicAddress}
              onChange={(e) => setPublicAddress(e.target.value)}
            />
            <p className="text-sm">
              Tempel alamat akun baru yang didapatkan sebelumnya
              <span className="text-red-500">*</span>
            </p>
          </label>
          <button
            type="submit"
            className="rounded-md bg-dark p-3 font-lexend-deca text-xl font-semibold text-white"
          >
            Konfirmasi
          </button>
        </form>
      </div>
    </section>
  );
}
