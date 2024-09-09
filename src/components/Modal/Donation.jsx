import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useStateContext } from "../../context";
import { toWei } from "thirdweb";

export default function Donation({ openDonationModal, setOpenDonationModal }) {
  const { id } = useParams();

  const [amountDonation, setAmountDonation] = useState("");
  const [message, setMessage] = useState("");
  const [transactionLoading, setTransactionLoading] = useState(false);

  const { donateToProgram, isPending, isError, isSuccess } = useStateContext();

  useEffect(() => {
    if (openDonationModal) {
      document.body.addEventListener("click", (e) => {
        if (e.target.id === "donationModalContainer") {
          setOpenDonationModal(false);
        }
      });
    }
  }, [openDonationModal]);

  useEffect(() => {
    if (isPending) {
      setTransactionLoading(true);
    }

    if (isError) {
      setTransactionLoading(false);
    }

    if (isSuccess) {
      setTransactionLoading(false);
      setOpenDonationModal(false);
    }

    console.log("isPending: " + isPending);
    console.log("isError: " + isError);
    console.log("isSuccess " + isSuccess);
  }, [isPending, isError, isSuccess]);

  const onSubmitHandler = () => {
    donateToProgram({
      _id: id,
      _message: message,
      _amountDonation: toWei(amountDonation),
    });
  };

  return (
    <section
      id="donationModalContainer"
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-transparent backdrop-blur-md"
    >
      <div className="rounded-2xl border border-neutral-300 bg-white p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold text-slate-800">Donasi</h1>
          <button
            type="click"
            onClick={() => setOpenDonationModal(false)}
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
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-3 flex flex-col gap-4"
        >
          <label
            htmlFor="donation"
            className="flex flex-col gap-1 font-lexend-deca font-medium"
          >
            Jumlah Pemberian Donasi
            <input
              id="donation"
              value={amountDonation}
              onChange={(e) => setAmountDonation(e.target.value)}
              className="w-86 rounded-md bg-neutral-300 p-2"
            />
          </label>
          <label
            htmlFor="message"
            className="flex flex-col gap-1 font-lexend-deca font-medium"
          >
            Berikan Pesan Anda
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="max-h-44 w-86 rounded-md bg-neutral-300 p-2"
            ></textarea>
          </label>
          <button
            type="click"
            onClick={onSubmitHandler}
            className="rounded-md bg-dark p-2 font-lexend-deca text-xl font-semibold text-white"
          >
            {transactionLoading ? "Loading" : "Kirim"}
          </button>
        </form>
      </div>
    </section>
  );
}
