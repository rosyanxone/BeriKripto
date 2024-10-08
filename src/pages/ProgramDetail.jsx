import ProgramTable from "../components/Program/Table";
import ProgramContent from "../components/Program/Content";
import DonationModal from "../components/Modal/Donation";
import DonorsModal from "../components/Modal/Donors";
import ReportModal from "../components/Modal/Report";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStateContext } from "../context";

export default function ProgramDetail() {
  const { id } = useParams();

  const [openDonationModal, setOpenDonationModal] = useState(false);
  const [openDonorsModal, setOpenDonorsModal] = useState(false);
  const [openReportModal, setOpenReportModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  const { getProgram, account } = useStateContext();
  const { program, isLoading } = getProgram(id);

  const [donations, setDonations] = useState({});
  const [isSortedByDonation, setIsSortedByDonation] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      onSortHandler(false);
      setIsOwner(() => account && program.owner === account.address);
    }
  }, [isLoading, account]);

  useEffect(() => {
    const body = document.body;
    body.style.overflow = "unset";

    if (openDonationModal || openDonorsModal || openReportModal) {
      body.style.overflow = "hidden";
    }
  }, [openDonationModal, openDonorsModal, openReportModal]);

  const onSortHandler = (bool) => {
    setIsSortedByDonation(bool);

    if (bool) {
      program.donations.sort((a, b) => parseInt(b.amount) - parseInt(a.amount)); // donation
    } else {
      program.donations.sort((a, b) => a.createdAt - b.createdAt); // date
    }

    setDonations(program.donations)
  };

  return (
    <section className="container-wraper">
      {!isLoading ? (
        <>
          <div className="wraper flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h1 className="font-lexend-deca text-3xl font-semibold text-slate-800">
                  Program
                </h1>
                <a
                  href="/"
                  className="flex h-full items-center justify-center rounded-lg bg-slate-800 p-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 fill-white"
                    viewBox="0 0 320 512"
                  >
                    <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                  </svg>
                </a>
              </div>
              <ProgramContent
                program={program}
                isOwner={isOwner}
                setOpenDonationModal={setOpenDonationModal}
                setOpenReportModal={setOpenReportModal}
              />
            </div>
            <ProgramTable
              donations={donations}
              setOpenDonorsModal={setOpenDonorsModal}
              isSortedByDonation={isSortedByDonation}
              onSortHandler={onSortHandler}
            />
          </div>
          {openDonationModal && (
            <DonationModal
              openDonationModal={openDonationModal}
              setOpenDonationModal={setOpenDonationModal}
            />
          )}
          {openDonorsModal && (
            <DonorsModal
              donations={donations}
              openDonorsModal={openDonorsModal}
              setOpenDonorsModal={setOpenDonorsModal}
            />
          )}
          {openReportModal && (
            <ReportModal
              isOwner={isOwner}
              openReportModal={openReportModal}
              setOpenReportModal={setOpenReportModal}
            />
          )}
        </>
      ) : (
        "Loading..."
      )}
    </section>
  );
}
