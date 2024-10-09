import { useEffect, useState } from "react";

import ProgramCard from "../components/Program/Card";
import AnimateLoading from "../components/AnimateLoading";
import { useStateContext } from "../context";

export default function HomePage() {
  const [totalPrograms, setTotalPrograms] = useState(0);
  const [programs, setPrograms] = useState({});
  const [loading, setLoading] = useState(true);

  const { account, getPrograms } = useStateContext();
  const { programs: programsRaw, isLoading } = getPrograms();

  useEffect(() => {
    if (!isLoading) {
      let countProgram = 0;

      programsRaw.map((program) => {
        if (!account || program.owner != account.address) {
          countProgram++;
        }
      });

      programsRaw.sort((a, b) => b.createdAt - a.createdAt);

      setTotalPrograms(countProgram);
      setPrograms(programsRaw);
      setLoading(false);
    }
  }, [isLoading, account]);

  return (
    <section className="container-wraper" id="programs">
      <div className="wraper flex flex-col gap-12">
        <div className="">
          <p className="text-xl font-medium">Semua Program ({totalPrograms})</p>
          <div className="grid grid-cols-3 justify-between gap-y-8 py-4">
            {!loading ? (
              programs.map((program, i) => {
                if (!account || program.owner != account.address) {
                  return (
                    <ProgramCard
                      key={i}
                      {...program}
                      id={Math.abs(i - (programsRaw.length - 1))}
                    />
                  );
                }
              })
            ) : (
              <AnimateLoading />
            )}
          </div>
        </div>
        {!loading ? (
          <div className="">
            {totalPrograms != programsRaw.length && (
              <>
                <p className="text-xl font-medium">
                  Program Saya ({programsRaw.length - totalPrograms})
                </p>
                <div className="grid grid-cols-3 justify-between gap-y-8 py-4">
                  {programs.map((program, i) => {
                    if (account && program.owner === account.address) {
                      return (
                        <ProgramCard
                          key={i}
                          {...program}
                          id={Math.abs(i - (programsRaw.length - 1))}
                        />
                      );
                    }
                  })}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="">
            <p className="mb-4 text-xl font-medium">Program Saya (0)</p>
            <AnimateLoading />
          </div>
        )}
      </div>
    </section>
  );
}
