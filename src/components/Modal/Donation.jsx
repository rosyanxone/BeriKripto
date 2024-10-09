import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toWei } from "thirdweb";

import { useStateContext } from "../../context";
import SuccessModal from "./Success";
import AnimateLoading from "../AnimateLoading";

export default function Donation({ openDonationModal, setOpenDonationModal }) {
  const { id } = useParams();

  const [amountDonation, setAmountDonation] = useState("");
  const [message, setMessage] = useState("");
  const [transactionLoading, setTransactionLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const {
    transactionFeedback,
    donateToProgram,
    isPending,
    isError,
    isSuccess,
  } = useStateContext();

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

      if (transactionFeedback.error.code === 3) {
        setErrorMessage("Saldo pengguna tidak mencukupi!");
      } else if (transactionFeedback.error.code === 4001) {
        setErrorMessage("Pengguna menolak melanjutkan transaksi!");
      } else if (transactionFeedback.error.name === "TransactionError") {
        setErrorMessage("Pemberian donasi harus lebih dari 0!");
      } else {
        setErrorMessage(transactionFeedback.error.message);
      }
    }

    if (isSuccess) {
      setTransactionLoading(false);
    }
  }, [isPending, isError, isSuccess]);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    donateToProgram({
      _id: id,
      _message: message,
      _amountDonation: toWei(amountDonation),
    });
  };

  return (
    <>
      {!isSuccess ? (
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
            {errorMessage && (
              <p className="mt-2 max-w-[400px] overflow-auto font-poppins font-semibold text-red-500">
                {errorMessage}
              </p>
            )}
            <form
              onSubmit={onSubmitHandler}
              className="mt-3 flex flex-col gap-4"
            >
              <label
                htmlFor="donation"
                className="flex flex-col gap-1 font-lexend-deca font-medium"
              >
                Jumlah Pemberian Donasi
                <input
                  className="w-86 rounded-md bg-gray-200 p-2"
                  type="number"
                  inputMode="text"
                  id="donation"
                  onChange={(e) =>
                    e.target.value < 0
                      ? false
                      : setAmountDonation(e.target.value)
                  }
                  value={amountDonation}
                  required
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
                  className="max-h-44 w-86 rounded-md bg-gray-200 p-2"
                  required
                ></textarea>
              </label>
              <button
                type="submit"
                className="flex justify-center rounded-md bg-dark p-3 font-lexend-deca text-xl font-semibold text-white"
              >
                {transactionLoading ? (
                  <AnimateLoading size="7" color="white" />
                ) : (
                  "Kirim"
                )}
              </button>
            </form>
          </div>
        </section>
      ) : (
        <SuccessModal
          message="Donasi telah berhasil dikirim!"
          navUrl={`/detail/${id}`}
        />
      )}
    </>
  );
}
