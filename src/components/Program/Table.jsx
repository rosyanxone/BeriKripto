import donors from "./../../utils/data";
import {
  getShorterAddress,
  convertUnixTimestamp,
  getFormattedEther,
} from "../../utils/index";

import { useStateContext } from "../../context";
import { useParams } from "react-router-dom";

export default function ProgramTable({ setOpenDonorsModal }) {
  const { id } = useParams();

  const { getDonators } = useStateContext();

  const { donators, isLoading } = getDonators(id);

  return (
    <div className="mb-8 flex justify-evenly gap-8">
      {!isLoading ? (
        <>
          <div className="w-full">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="font-lexend-deca text-3xl font-semibold text-slate-800">
                Donatur
              </h1>
              <div className="flex items-center gap-1 rounded-lg bg-light">
                <button className="rounded-lg px-3 py-2 font-semibold">
                  Teratas
                </button>
                <button className="rounded-lg bg-neutral-200 px-3 py-2 font-semibold">
                  Terbaru
                </button>
              </div>
            </div>
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
                {donators.slice(0, 5).map((donator, i) => (
                  <tr key={i}>
                    <td>{++i}</td>
                    <td>{getShorterAddress(donator.donator)}</td>
                    <td>
                      {convertUnixTimestamp(String(donator.createdAt), false)}
                    </td>
                    <td>{getFormattedEther(donator.amount)} ETH</td>
                    <td>
                      {donator.message.substring(0, 22)}
                      {donator.message.length > 22 && "..."}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full">
            <div className="mb-4 flex items-center justify-end">
              <button
                type="click"
                onClick={() => {
                  setOpenDonorsModal(true);
                }}
                className="rounded-lg bg-neutral-200 px-3 py-2 font-semibold"
              >
                Lihat Semua
              </button>
            </div>
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
                {donators.slice(5, 10).map((donator, i) => (
                  <tr key={i}>
                    <td>{6 + i}</td>
                    <td>{getShorterAddress(donator.donator)}</td>
                    <td>
                      {convertUnixTimestamp(String(donator.createdAt), false)}
                    </td>
                    <td>{getFormattedEther(donator.amount)} ETH</td>
                    <td>
                      {donator.message.substring(0, 22)}
                      {donator.message.length > 22 && "..."}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
