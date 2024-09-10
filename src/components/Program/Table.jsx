import {
  getShorterAddress,
  convertUnixTimestamp,
  getFormattedEther,
} from "../../utils/index";

export default function ProgramTable({ donations, setOpenDonorsModal }) {
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
            {donations.slice(0, 5).map((donation, i) => (
              <tr key={i}>
                <td>{++i}</td>
                <td>{getShorterAddress(donation.donator)}</td>
                <td>{convertUnixTimestamp(donation.createdAt, true)}</td>
                <td>{getFormattedEther(donation.amount)} ETH</td>
                <td>
                  {donation.message.substring(0, 22)}
                  {donation.message.length > 22 && "..."}
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
            {donations.slice(5, 10).map((donation, i) => (
              <tr key={i}>
                <td>{6 + i}</td>
                <td>{getShorterAddress(donation.donator)}</td>
                <td>
                  {convertUnixTimestamp(String(donation.createdAt), false)}
                </td>
                <td>{getFormattedEther(donation.amount)} ETH</td>
                <td>
                  {donation.message.substring(0, 22)}
                  {donation.message.length > 22 && "..."}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
