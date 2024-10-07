import { useEffect, useState } from "react";
import { toWei } from "thirdweb";
import { upload } from "thirdweb/storage";
import { Wallet } from "@ethereumjs/wallet";

import NewAddressModal from "../components/Modal/NewAddress";
import SuccessModal from "../components/Modal/Success";
import { useStateContext } from "../context";
import { slugify } from "../utils";

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

  const { client, createProgram, isSuccess, isPending } = useStateContext();

  useEffect(() => {
    // When new wallet confirmed
    if (newWalletAddress != "") {
      if (
        newWallet.getAddressString().toLowerCase() ==
        newWalletAddress.toLowerCase()
      ) {
        setOpenNewAddressModal(false);

        setLoading(true);

        createNewProgram();
      } else {
        console.error("Alamat akun tidak sesuai!");
      }
    }
  }, [newWalletAddress]);

  useEffect(() => {
    if (isPending) {
      setLoading(true);
    }

    if (!isPending) {
      setLoading(false);
    }

    if (isSuccess) {
      setOpenSuccessModal(true);
    }
  }, [isSuccess, isPending]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const wallet = Wallet.generate();

    setNewWallet(wallet);

    setOpenNewAddressModal(true);
  };

  const onUploadHandler = (e) => {
    const file = e.target.files[0];
    const image = URL.createObjectURL(file);

    const imgPreview = document.getElementById("imagePreview");
    imgPreview.style.backgroundImage = `url(${image})`;

    setImage(file);
  };

  const createNewProgram = () => {
    const uploadToIpfs = async (image) => {
      const uris = await upload({
        client,
        files: [new File([image], slugify(title))],
      });

      const ipfsUrl = import.meta.env.VITE_IPFS;
      const imageFile = uris.split("ipfs://")[1];

      return ipfsUrl + imageFile;
    };

    uploadToIpfs(image).then((imgResult) => {
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
    <div className="container-wraper">
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
              onChange={(e) => setDeadline(e.target.value)}
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
              onChange={(e) =>
                e.target.value < 0 ? false : setTarget(e.target.value)
              }
              value={target}
              required
            />
          </label>
          {loading ? (
            <span className="mt-4 rounded-lg bg-dark py-6 text-center text-2xl font-medium text-white">
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
        />
      )}
      {openSuccessModal && <SuccessModal />}
    </div>
  );
}
