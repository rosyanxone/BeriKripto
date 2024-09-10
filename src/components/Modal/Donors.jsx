import donorsData from "./../../utils/data";
import { getShorterAddress, convertUnixTimestamp, getFormattedEther } from "../../utils/index";

import { useEffect } from "react";

export default function Donors({ donations, openDonorsModal, setOpenDonorsModal }) {
  useEffect(() => {
    if (openDonorsModal) {
      document.body.addEventListener("click", (e) => {
        if (e.target.id === "donorsModalContainer") {
          setOpenDonorsModal(false);
        }
      });
    }
  }, [openDonorsModal]);

  return (
    <section
      id="donorsModalContainer"
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-transparent backdrop-blur-md"
    >
      <div className="rounded-2xl border border-neutral-300 bg-white p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-semibold text-slate-800">Donasi</h1>
          <button
            onClick={() => setOpenDonorsModal(false)}
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
        <div className="relative h-[445px] overflow-y-auto">
          <table className="donors w-full">
            <thead className="border-b border-black">
              <tr>
                <th>No</th>
                <th>Donatur</th>
                <th>Waktu</th>
                <th>Donasi</th>
                <th>Pesan</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, i) => (
                <tr key={i}>
                  <td>{++i}</td>
                  <td>{getShorterAddress(donation.donator)}</td>
                  <td>{convertUnixTimestamp(String(donation.createdAt), true)}</td>
                  <td>{getFormattedEther(donation.amount)} ETH</td>
                  <td>
                    {donation.message.substring(0, 22)}
                    {donation.message.length > 22 && "..."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="sticky bottom-0 h-12 w-full bg-white bg-opacity-60"></div>
        </div>
      </div>
    </section>
  );
}
