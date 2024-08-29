import donorsData from "./../../utils/data";
import { shortingAddress, convertUnixTimestamp } from "../../utils/index";

export default function Donors({ setOpenDonorsModal }) {
  return (
    <section className="absolute bottom-0 top-0 z-50 flex h-full w-full items-center justify-center bg-neutral-300 bg-opacity-80">
      <div className="rounded-2xl bg-white p-6">
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
        <div className="relative h-[445px] overflow-y-scroll">
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
              {donorsData.map((donor, i) => (
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
          <div className="sticky bottom-0 h-12 w-full bg-white bg-opacity-60"></div>
        </div>
      </div>
    </section>
  );
}
