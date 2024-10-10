import { useEffect, useState } from "react";
import { toWei } from "thirdweb";
import { Wallet } from "@ethereumjs/wallet";

import NewAddressModal from "../components/Modal/NewAddress";
import SuccessModal from "../components/Modal/Success";
import AnimateLoading from "../components/AnimateLoading";
import { useStateContext } from "../context";

export default function ProgramCreate() {
  const [image, setImage] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false);

  const [newWallet, setNewWallet] = useState({});
  const [newWalletAddress, setNewWalletAddress] = useState("");
  const [openNewAddressModal, setOpenNewAddressModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const {
    transactionFeedback,
    createProgram,
    uploadToIpfs,
    isPending,
    isError,
    isSuccess,
  } = useStateContext();

  useEffect(() => {
    // When new wallet confirmed
    if (newWalletAddress != "") {
      if (
        newWallet.getAddressString().toLowerCase() ==
        newWalletAddress.toLowerCase()
      ) {
        setErrorMessage("");
        setOpenNewAddressModal(false);
        setLoading(true);

        createNewProgram();
      } else {
        setErrorMessage("Alamat akun tidak sesuai!");
      }
    }
  }, [newWalletAddress]);

  useEffect(() => {
    if (isPending) {
      setLoading(true);
    }

    if (isError) {
      setLoading(false);

      if (transactionFeedback.error.code === 3) {
        setErrorMessage("Saldo pengguna tidak mencukupi!");
      } else if (transactionFeedback.error.code === 4001) {
        setErrorMessage("Pengguna menolak melanjutkan transaksi!");
      } else {
        setErrorMessage(transactionFeedback.error.message);
      }
    }

    if (isSuccess) {
      setOpenSuccessModal(true);
    }
  }, [isSuccess, isError, isPending]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const wallet = Wallet.generate();

    setNewWallet(wallet);

    setOpenNewAddressModal(true);
  };

  const onUploadHandler = (e) => {
    setErrorMessage("");

    const file = e.target.files[0];

    if (file && !file.type.includes("image")) {
      setErrorMessage("Tipe file harus berupa gambar!");

      e.target.value = null;

      return false;
    }

    const image = URL.createObjectURL(file);

    const imgPreview = document.getElementById("imagePreview");
    imgPreview.style.backgroundImage = `url(${image})`;

    setImage(file);
  };

  const onDeadlineChangeHandler = (e) => {
    setErrorMessage("");

    if (e.target.value < new Date().toISOString().slice(0, -8)) {
      setErrorMessage("Deadline harus berupa waktu di masa depan!");

      return false;
    }

    setDeadline(e.target.value);
  };

  const onTargetChangeHandler = (e) => {
    setErrorMessage("");

    if (e.target.value < 0) {
      setErrorMessage("Target donasi tidak dapat kurang dari 0!");

      return false;
    }

    setTarget(e.target.value);
  };

  const createNewProgram = () => {
    uploadToIpfs(image, title).then((imgResult) => {
      createProgram({
        _recipient: newWalletAddress,
        _title: title,
        _description: description,
        _target: toWei(target),
        _deadline: Math.floor(new Date(deadline) / 1000),
        _image: imgResult,
      });
    });
  };

  return (
    <div className="container-wraper flex-col">
      {errorMessage && (
        <p className="max-w-[400px] font-poppins font-semibold text-red-500">
          {errorMessage}
        </p>
      )}
      <form
        onSubmit={onSubmitHandler}
        className="wraper grid grid-cols-3 gap-5"
      >
        <div className="col-span-2 flex h-full flex-col gap-2">
          <label
            htmlFor="imageUpload"
            className="font-lexend-deca text-lg font-medium"
          >
            Unggah Gambar Program
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
        <div className="flex h-full w-full flex-col gap-3">
          <label
            htmlFor="title"
            className="flex flex-col gap-2 font-lexend-deca text-lg font-medium"
          >
            Beri Judul Program
            <input
              className="w-full rounded-md bg-gray-200 p-2"
              type="text"
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </label>
          <label
            htmlFor="story"
            className="flex flex-col gap-2 font-lexend-deca text-lg font-medium"
          >
            Ceritakan tentang Program
            <textarea
              className="max-h-52 w-full rounded-md bg-gray-200 p-2"
              name="story"
              id="story"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </label>
          <label
            htmlFor="deadline"
            className="flex flex-col gap-2 font-lexend-deca text-lg font-medium"
          >
            Kapan Program Berakhir
            <input
              className="w-full rounded-md bg-gray-200 p-2"
              type="datetime-local"
              id="deadline"
              onChange={(e) => onDeadlineChangeHandler(e)}
              value={deadline}
              required
            />
          </label>
          <label
            htmlFor="target"
            className="flex flex-col gap-2 font-lexend-deca text-lg font-medium"
          >
            Target donasi program
            <input
              className="w-full rounded-md bg-gray-200 p-2"
              type="number"
              inputMode="text"
              id="target"
              onChange={(e) => onTargetChangeHandler(e)}
              value={target}
              required
            />
          </label>
          {loading ? (
            <span className="mt-4 inline-flex justify-center gap-3 rounded-lg bg-dark py-6 text-center text-2xl font-medium text-white">
              <AnimateLoading color="white" mr="0" size="6" />
              Menunggu Konfirmasi...
            </span>
          ) : (
            <button
              type="submit"
              className="mt-4 rounded-lg bg-dark py-6 text-2xl font-medium text-white"
            >
              Buat Program
            </button>
          )}
        </div>
      </form>
      {openNewAddressModal && (
        <NewAddressModal
          walletKey={newWallet.getPrivateKeyString()}
          setNewWalletAddress={setNewWalletAddress}
          setOpenNewAddressModal={setOpenNewAddressModal}
          errorMessage={errorMessage}
        />
      )}
      {openSuccessModal && (
        <SuccessModal message="Program telah berhasil dibuat!" navUrl={"/"} />
      )}
    </div>
  );
}
