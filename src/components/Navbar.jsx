import { useConnect } from "thirdweb/react";
import { MetaMaskAvatar } from "react-metamask-avatar";

import { useStateContext } from "../context";
import { createWallet } from "thirdweb/wallets";

export default function Navbar() {
  const { client, account } = useStateContext();

  const { connect, isConnecting } = useConnect();

  return (
    <nav className="container-wraper sticky top-0 z-20 border-b-2 border-slate-300 bg-white">
      <div className="wraper flex items-center justify-between">
        <a href="/" className="fontle text-3xl font-semibold text-primary">
          BeriKripto
        </a>
        {account ? (
          <div className="flex items-center gap-5">
            <a href="/create" className="rounded-lg bg-primary px-5 py-3">
              <span className="font-lexend-deca text-lg font-semibold text-white">
                Buat Program
              </span>
            </a>
            <MetaMaskAvatar address={account.address} size={48} />
          </div>
        ) : (
          <button
            onClick={() =>
              connect(async () => {
                const metamask = createWallet("io.metamask");

                await metamask.connect({ client });

                return metamask;
              })
            }
            className="rounded-lg bg-primary px-5 py-3"
          >
            <span className="font-lexend-deca text-lg font-semibold text-white">
              {isConnecting ? "Menghubungkan..." : "Hubungkan"}
            </span>
          </button>
        )}
      </div>
    </nav>
  );
}
