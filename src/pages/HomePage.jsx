import ProgramCard from "../components/Program/Card";

export default function HomePage() {
  return (
    <section className="container-wraper" id="programs">
      <div className="wraper flex flex-col gap-12">
        <div className="">
          <p className="text-xl font-medium">Semua Program (6)</p>
          <div className="grid grid-cols-3 justify-between gap-y-8 py-4">
            {Array(5)
              .fill(1)
              .map((x, i) => (
                <ProgramCard key={i} />
              ))}
          </div>
        </div>
        <div className="">
          <p className="text-xl font-medium">Program Saya (4)</p>
          <div className="grid grid-cols-3 justify-between gap-y-8 py-4">
            {Array(4)
              .fill(1)
              .map((x, i) => (
                <ProgramCard key={i} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
