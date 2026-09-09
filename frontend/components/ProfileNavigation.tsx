"use client";

const sections = [
  "Personal",
  "Summary",
  "Education",
  "Experience",
  "Skills",
  "Projects",
  "Coding Profiles",
  "Achievements",
];

interface ProfileNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function ProfileNavigation({
  activeSection,
  onSectionChange,
}: ProfileNavigationProps) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-gray-300 pb-4">
      {sections.map((section) => (
        <button
          key={section}
          type="button"
          onClick={() => onSectionChange(section)}
          className={
            activeSection === section
              ? "rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
              : "rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
          }
        >
          {section}
        </button>
      ))}
    </div>
  );
}