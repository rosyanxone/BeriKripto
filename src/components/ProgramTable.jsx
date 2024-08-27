export default function ProgramTable() {
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
            <tr>
              <td>1</td>
              <td className="font-medium">0xa715...c0fe</td>
              <td>5 jam lalu</td>
              <td>2 ETH</td>
              <td>Cepat Sembuh</td>
            </tr>
            <tr>
              <td>2</td>
              <td className="font-medium">0xa715...c0fe</td>
              <td>5 jam lalu</td>
              <td>2 ETH</td>
              <td>Cepat Sembuh</td>
            </tr>
            <tr>
              <td>3</td>
              <td className="font-medium">0xa715...c0fe</td>
              <td>5 jam lalu</td>
              <td>2 ETH</td>
              <td>Cepat Sembuh</td>
            </tr>
            <tr>
              <td>4</td>
              <td className="font-medium">0xa715...c0fe</td>
              <td>5 jam lalu</td>
              <td>2 ETH</td>
              <td>Cepat Sembuh</td>
            </tr>
            <tr>
              <td>5</td>
              <td className="font-medium">0xa715...c0fe</td>
              <td>5 jam lalu</td>
              <td>2 ETH</td>
              <td>Cepat Sembuh</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full">
        <div className="mb-4 flex items-center justify-end">
          <button className="rounded-lg bg-neutral-200 px-3 py-2 font-semibold">
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
            <tr>
              <td>1</td>
              <td className="font-medium">0xa715...c0fe</td>
              <td>5 jam lalu</td>
              <td>2 ETH</td>
              <td>Cepat Sembuh</td>
            </tr>
            <tr>
              <td>2</td>
              <td className="font-medium">0xa715...c0fe</td>
              <td>5 jam lalu</td>
              <td>2 ETH</td>
              <td>Cepat Sembuh</td>
            </tr>
            <tr>
              <td>3</td>
              <td className="font-medium">0xa715...c0fe</td>
              <td>5 jam lalu</td>
              <td>2 ETH</td>
              <td>Cepat Sembuh</td>
            </tr>
            <tr>
              <td>4</td>
              <td className="font-medium">0xa715...c0fe</td>
              <td>5 jam lalu</td>
              <td>2 ETH</td>
              <td>Cepat Sembuh</td>
            </tr>
            <tr>
              <td>5</td>
              <td className="font-medium">0xa715...c0fe</td>
              <td>5 jam lalu</td>
              <td>2 ETH</td>
              <td>Cepat Sembuh</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
