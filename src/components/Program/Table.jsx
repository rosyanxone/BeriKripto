import donors from "./../../utils/data";
import { shortingAddress, convertUnixTimestamp } from "../../utils/index";

export default function ProgramTable({ setOpenDonorsModal }) {
  return (
    <div className="mb-8 flex justify-evenly gap-8">
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
            {donors.slice(0, 5).map((donor, i) => (
              <tr key={i}>
                <td>{++i}</td>
                <td>{shortingAddress(donor.address)}</td>
                <td>{convertUnixTimestamp(donor.timestamp)}</td>
                <td>{donor.donation} ETH</td>
                <td>
                  {donor.message.substring(0, 22)}
                  {donor.message.length > 22 && "..."}
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
              globalThis.scrollTo({ top: 0 });
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
            {donors.slice(5, 10).map((donor, i) => (
              <tr key={i}>
                <td>{6 + i}</td>
                <td>{shortingAddress(donor.address)}</td>
                <td>{convertUnixTimestamp(donor.timestamp)}</td>
                <td>{donor.donation} ETH</td>
                <td>
                  {donor.message.substring(0, 22)}
                  {donor.message.length > 22 && "..."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
