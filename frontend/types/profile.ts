import type { PersonalInfo } from "@/components/PersonalForm";
import type { SummaryInfo } from "@/components/SummaryForm";
import type { Education } from "@/components/EducationForm";
import type { Experience } from "@/components/ExperienceForm";
import type { SkillCategory } from "@/components/SkillsForm";
import type { Project } from "@/components/ProjectsForm";
import type { CodingProfile } from "@/components/CodingProfilesForm";
import type { Achievement } from "@/components/AchievementsForm";

export type ResumeProfile = {
  personal: PersonalInfo;
  summary: SummaryInfo;
  education: Education[];
  experience: Experience[];
  skills: SkillCategory[];
  projects: Project[];
  codingProfiles: CodingProfile[];
  achievements: Achievement[];
};