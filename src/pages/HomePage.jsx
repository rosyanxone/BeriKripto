import { readContract } from "thirdweb";
import { useEffect, useState } from "react";

import ProgramCard from "../components/Program/Card";
import { contract } from "../App";

const getPrograms = async () => {
  const data = await readContract({
    contract,
    method:
      "function getPrograms() view returns ((address owner, address recipient, string title, string description, uint256 deadline, uint256 target, uint256 amountCollected, string image, address[] donators, uint256[] donations, string[] messages, bool isFinish)[])",
    params: [],
  });

  return data;
};

export default function HomePage() {
  const [totalPrograms, setTotalPrograms] = useState(0);
  const [programs, setPrograms] = useState([]);

  const fetchContract = async () => {
    const data = await getPrograms();
    setTotalPrograms(data.length);
    setPrograms(data);

    console.log(data);
  };

  useEffect(() => {
    fetchContract();
  }, []);

  return (
    <section className="container-wraper" id="programs">
      <div className="wraper flex flex-col gap-12">
        <div className="">
          <p className="text-xl font-medium">Semua Program ({totalPrograms})</p>
          <div className="grid grid-cols-3 justify-between gap-y-8 py-4">
            {programs.map((program, i) => (
              <ProgramCard key={i} {...program} id={i} />
            ))}
          </div>
        </div>
        {/* <div className="">
          <p className="text-xl font-medium">Program Saya (4)</p>
          <div className="grid grid-cols-3 justify-between gap-y-8 py-4">
            {Array(4)
              .fill(1)
              .map((x, i) => (
                <ProgramCard key={i} />
              ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}
