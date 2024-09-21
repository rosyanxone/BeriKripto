import { useState } from "react";
import { toWei } from "thirdweb";
import { upload } from "thirdweb/storage";
import { Wallet } from "@ethereumjs/wallet";

import { useStateContext } from "../context";
import { slugify } from "../utils";

export default function ProgramCreate() {
  const [image, setImage] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [target, setTarget] = useState("");

  const { client, createProgram } = useStateContext();

  const onSubmitHandler = (e) => {
    e.preventDefault();

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
      const wallet = Wallet.generate();

      // get new wallet account
      console.log(wallet.getPrivateKeyString());

      createProgram({
        _recipient: wallet.getAddressString(),
        _title: title,
        _description: description,
        _target: toWei(target),
        _deadline: Math.floor(new Date(deadline) / 1000),
        _image: imgResult,
      });
    });
  };

  const onUploadHandler = (e) => {
    const file = e.target.files[0];
    const image = URL.createObjectURL(file);

    const imgPreview = document.getElementById("imagePreview");
    imgPreview.style.backgroundImage = `url(${image})`;

    setImage(file);
  };

  return (
    <div className="container-wraper">
      <form
        onSubmit={onSubmitHandler}
        className="wraper grid grid-cols-2 gap-5"
      >
        <div className="flex h-full flex-col gap-2">
          <label
            htmlFor="imageUpload"
            className="font-lexend-deca text-lg font-medium"
          >
            Unggah Gambar Program
          </label>
          <div
            id="imagePreview"
            className="relative h-full rounded-md bg-neutral-300 bg-cover bg-center"
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
              className="w-full rounded-md bg-neutral-300 p-2"
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
              className="w-full rounded-md bg-neutral-300 p-2"
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
              className="w-full rounded-md bg-neutral-300 p-2"
              type="number"
              inputMode="numeric"
              id="target"
              onChange={(e) => setTarget(e.target.value)}
              value={target}
              min={0}
              required
            />
          </label>
          <button
            type="submit"
            className="mt-4 rounded-lg bg-dark py-6 text-2xl font-medium text-white"
          >
            Buat Program
          </button>
        </div>
      </form>
    </div>
  );
}
