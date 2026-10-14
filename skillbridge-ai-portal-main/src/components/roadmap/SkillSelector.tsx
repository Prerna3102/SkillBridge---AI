import { Button } from "@/components/ui/button";

type Props = {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
};

const skills = [
  "Python",
  "Java",
  "SQL",
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Git",
  "Excel",
  "MySQL",
  "MongoDB",
  "Flask",
  "AWS",
  "Linux",
  "Power BI",
];

export default function SkillsSelector({
  selectedSkills,
  onChange,
}: Props) {

  const toggleSkill = (skill: string) => {

    if (selectedSkills.includes(skill)) {

      onChange(
        selectedSkills.filter(
          (item) => item !== skill
        )
      );

    } else {

      onChange([
        ...selectedSkills,
        skill,
      ]);

    }
  };

  return (
    <div>

      <label className="text-sm font-medium">
        Current Skills
      </label>

      <div className="mt-3 flex flex-wrap gap-2">

        {skills.map((skill) => {

          const selected =
            selectedSkills.includes(skill);

          return (

            <Button
              key={skill}
              type="button"
              variant={selected ? "default" : "outline"}
              size="sm"
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </Button>

          );

        })}

      </div>

    </div>
  );
}