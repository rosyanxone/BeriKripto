import ProgramTable from "../components/ProgramTable";
import ProgramProgress from "../components/ProgramProgress";
import ProgramContent from "../components/ProgramContent";

export default function ProgramDetail() {
  return (
    <section className="container-wraper">
      <div className="wraper flex flex-col gap-5">
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
          <ProgramContent />
        </div>
        <ProgramProgress />
        <ProgramTable />
      </div>
    </section>
  );
}
