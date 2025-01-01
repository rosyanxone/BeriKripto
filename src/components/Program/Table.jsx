import {
  getShorterAddress,
  convertUnixTimestamp,
  getFormattedEther,
} from "../../utils/index";

export default function ProgramTable({
  donations,
  setOpenDonorsModal,
  isSortedByDonation,
  onSortHandler,
}) {
  return (
    <>
      {donations.length > 0 ? (
        <div className="mb-8 flex justify-evenly gap-8">
          <div className="w-full">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="font-lexend-deca text-3xl font-semibold text-slate-800">
                Donatur
              </h1>
              <div
                id="filter-container"
                className={`flex items-center gap-1 rounded-lg ${isSortedByDonation ? "bg-gray-200" : "bg-gray-100"} `}
              >
                <button
                  onClick={() => !isSortedByDonation && onSortHandler(true)}
                  className="rounded-lg px-3 py-2 font-semibold"
                >
                  Teratas
                </button>
                <button
                  onClick={() => isSortedByDonation && onSortHandler(false)}
                  id="filter-earlier"
                  className={`rounded-lg px-3 py-2 font-semibold ${!isSortedByDonation ? "bg-gray-200" : "bg-gray-100"}`}
                >
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
                </tr>
              </thead>
              <tbody>
                {donations.slice(0, 5).map((donation, i) => (
                  <tr key={i}>
                    <td>{++i}</td>
                    <td>{getShorterAddress(donation.donator)}</td>
                    <td>{convertUnixTimestamp(donation.createdAt, true)}</td>
                    <td>{getFormattedEther(donation.amount)} ETH</td>
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
                className="rounded-lg bg-gray-100 px-3 py-2 font-semibold hover:bg-gray-200"
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
