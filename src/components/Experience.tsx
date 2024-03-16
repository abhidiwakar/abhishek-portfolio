import { experience } from "@/data/experience";
import Alert from "./ui/Alert";
import Timeline from "./ui/Timeline";

export default function Experience() {
  return (
    <div className="my-6 px-6 sm:p-0">
      <h4 className="text-2xl font-semibold">Professional Experience</h4>
      <p className="text-sm text-slate-400">
        Below is a list of companies I have worked for over the years.
      </p>
      {experience.length > 0 ? (
        <div className="my-6">
          <Timeline experience={experience} />
        </div>
      ) : (
        <Alert className="mt-2">
          <p>No experience to show here at the moment.</p>
        </Alert>
      )}
    </div>
  );
}
