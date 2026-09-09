"use client";


import type { ResumeProfile } from "@/types/profile";


import { useState } from "react";
import ProfileNavigation from "@/components/ProfileNavigation";
import PersonalForm, {
  PersonalInfo,
} from "@/components/PersonalForm";
import SummaryForm, {
  SummaryInfo,
} from "@/components/SummaryForm";
import ExperienceForm, {
  Experience,
} from "@/components/ExperienceForm";



import EducationForm, {
  Education,
} from "@/components/EducationForm";


import SkillsForm, {
  SkillCategory,
} from "@/components/SkillsForm";

import ProjectsForm, {
  Project,
} from "@/components/ProjectsForm";

import CodingProfilesForm, {
  CodingProfile,
} from "@/components/CodingProfilesForm";

import AchievementsForm, {
  Achievement,
} from "@/components/AchievementsForm";


export default function Home() {
  const [activeSection, setActiveSection] =
    useState("Personal");

  const [personalInfo, setPersonalInfo] =
    useState<PersonalInfo>({
      name: "",
      email: "",
      phone: "",
      location: "",
      portfolio: "",
      linkedin: "",
      github: "",
      leetcode: "",
    });

  const [summaryInfo, setSummaryInfo] =
    useState<SummaryInfo>({
      baseSummary: "",
      targetRoles: [],
      coreStrengths: [],
      domains: [],
    });

    

  const [experiences, setExperiences] =
    useState<Experience[]>([]);

    const [education, setEducation] =
  useState<Education[]>([]);

  const [skills, setSkills] =
  useState<SkillCategory[]>([]);

  const [projects, setProjects] =
  useState<Project[]>([]);

  const [codingProfiles, setCodingProfiles] =
  useState<CodingProfile[]>([]);

const [achievements, setAchievements] =
  useState<Achievement[]>([]);


  const profile: ResumeProfile = {
  personal: personalInfo,
  summary: summaryInfo,
  education,
  experience: experiences,
  skills,
  projects,
  codingProfiles,
  achievements,
};


  return (
    <main className="min-h-screen bg-white text-gray-900 p-10">
      <div className="mx-auto max-w-5xl">

        <h1 className="text-3xl font-bold text-gray-900">
          Resume Tailor
        </h1>

        <p className="mt-2 text-gray-600">
          Build a tailored resume for every job.
        </p>

        <div className="mt-8">
          <ProfileNavigation
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {activeSection === "Personal" && (
          <PersonalForm
            initialData={personalInfo}
            onSave={setPersonalInfo}
          />
        )}

        {activeSection === "Summary" && (
          <SummaryForm
            initialData={summaryInfo}
            onSave={setSummaryInfo}
          />
        )}

        {activeSection === "Experience" && (
          <ExperienceForm
            initialData={experiences}
            onSave={setExperiences}
          />
        )}

        {activeSection === "Education" && (
  <EducationForm
    initialData={education}
    onSave={setEducation}
  />
)}

{activeSection === "Skills" && (
  <SkillsForm
    initialData={skills}
    onSave={setSkills}
  />
)}

{activeSection === "Projects" && (
  <ProjectsForm
    initialData={projects}
    onSave={setProjects}
  />
)}

{activeSection === "Coding Profiles" && (
  <CodingProfilesForm
    initialData={codingProfiles}
    onSave={setCodingProfiles}
  />
)}


{activeSection === "Achievements" && (
  <AchievementsForm
    initialData={achievements}
    onSave={setAchievements}
  />
)}



      </div>
    </main>
  );
}