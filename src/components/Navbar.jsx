import { useConnect, useDisconnect } from "thirdweb/react";
import { MetaMaskAvatar } from "react-metamask-avatar";

import { useStateContext } from "../context";
import { createWallet } from "thirdweb/wallets";
import { useState } from "react";

export default function Navbar() {
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const { client, accountLoading, account, wallet } = useStateContext();

  const { connect, isConnecting } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <nav className="container-wraper sticky top-0 z-20 border-b-2 border-slate-300 bg-white">
      <div className="wraper flex items-center justify-between">
        <a href="/" className="fontle text-3xl font-semibold text-primary">
          BeriKripto
        </a>
        {accountLoading ? (
          "Loading..."
        ) : account ? (
          <div className="flex items-center gap-5">
            <a href="/create" className="rounded-lg bg-primary px-5 py-3">
              <span className="font-lexend-deca text-lg font-semibold text-white">
                Buat Program
              </span>
            </a>
            <div className="relative">
              <button onClick={() => setOpenProfileModal(!openProfileModal)}>
                <MetaMaskAvatar address={account.address} size={48} />
              </button>
              {openProfileModal && (
                <button
                  onClick={() => {
                    disconnect(wallet);
                    setOpenProfileModal(false);
                  }}
                  className="absolute -left-6 bottom-0 translate-y-10"
                >
                  <span className="rounded-md border border-neutral-300 bg-slate-100 px-4 py-2 font-lexend-deca font-semibold text-red-500">
                    Putuskan
                  </span>
                </button>
              )}
            </div>
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
