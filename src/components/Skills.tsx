import skills from "../data/skill";
import SkillCard from "./ui/SkillCard";

export default function Skills() {
  return (
    <div className="my-6 px-6 sm:p-0">
      <h4 className="text-2xl font-semibold">Skills</h4>
      <p className="text-sm text-slate-400">Primary Skills</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mt-2">
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>
    </div>
  );
}
