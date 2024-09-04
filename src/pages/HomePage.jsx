import { useEffect, useState } from "react";

import ProgramCard from "../components/Program/Card";
import { useStateContext } from "../context";

export default function HomePage() {
  const [totalPrograms, setTotalPrograms] = useState(0);

  const { getPrograms } = useStateContext();
  const { programs, isLoading } = getPrograms();

  useEffect(() => {
    if (!isLoading) {
      setTotalPrograms(programs.length);
    }
  }, [programs]);

  return (
    <section className="container-wraper" id="programs">
      <div className="wraper flex flex-col gap-12">
        <div className="">
          <p className="text-xl font-medium">Semua Program ({totalPrograms})</p>
          <div className="grid grid-cols-3 justify-between gap-y-8 py-4">
            {!isLoading
              ? programs.map((program, i) => (
                  <ProgramCard key={i} {...program} id={i} />
                ))
              : "Loading..."}
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
