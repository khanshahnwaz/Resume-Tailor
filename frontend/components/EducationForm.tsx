"use client";

import { useState } from "react";

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  grade: string;
  relevantCoursework: string[];
  achievements: string[];
  facts: string[];
};

type EducationFormProps = {
  initialData: Education[];
  onSave: (data: Education[]) => void;
};

const createEmptyEducation = (): Education => ({
  id: crypto.randomUUID(),
  institution: "",
  degree: "",
  field: "",
  location: "",
  startDate: "",
  endDate: "",
  grade: "",
  relevantCoursework: [],
  achievements: [],
  facts: [],
});

export default function EducationForm({
  initialData,
  onSave,
}: EducationFormProps) {
  const [education, setEducation] =
    useState<Education[]>(initialData);

  const updateEducation = (
    id: string,
    field: keyof Education,
    value: string | string[]
  ) => {
    setEducation((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const addEducation = () => {
    setEducation((current) => [
      ...current,
      createEmptyEducation(),
    ]);
  };

  const removeEducation = (id: string) => {
    setEducation((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const addListItem = (
    id: string,
    field:
      | "relevantCoursework"
      | "achievements"
      | "facts"
  ) => {
    setEducation((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: [...item[field], ""],
            }
          : item
      )
    );
  };

  const updateListItem = (
    id: string,
    field:
      | "relevantCoursework"
      | "achievements"
      | "facts",
    index: number,
    value: string
  ) => {
    setEducation((current) =>
      current.map((item) => {
        if (item.id !== id) return item;

        const updatedList = [...item[field]];
        updatedList[index] = value;

        return {
          ...item,
          [field]: updatedList,
        };
      })
    );
  };

  const removeListItem = (
    id: string,
    field:
      | "relevantCoursework"
      | "achievements"
      | "facts",
    index: number
  ) => {
    setEducation((current) =>
      current.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          [field]: item[field].filter(
            (_, i) => i !== index
          ),
        };
      })
    );
  };

  const handleSave = () => {
    onSave(education);
    console.log(education)
  };

  return (
    <section className="mt-8 rounded-xl border border-gray-300 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Education
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add your degrees, institutions, coursework,
            academic achievements, and other relevant facts.
          </p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Add Education
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {education.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-600">
              No education added yet.
            </p>

            <button
              type="button"
              onClick={addEducation}
              className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Add Your First Education
            </button>
          </div>
        )}

        {education.map((item, index) => (
          <div
            key={item.id}
            className="rounded-xl border border-gray-300 bg-gray-50 p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Education #{index + 1}
              </h3>

              <button
                type="button"
                onClick={() => removeEducation(item.id)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Remove
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Institution
                </label>

                <input
                  value={item.institution}
                  onChange={(e) =>
                    updateEducation(
                      item.id,
                      "institution",
                      e.target.value
                    )
                  }
                  placeholder="e.g. NIT Jamshedpur"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Degree
                </label>

                <input
                  value={item.degree}
                  onChange={(e) =>
                    updateEducation(
                      item.id,
                      "degree",
                      e.target.value
                    )
                  }
                  placeholder="e.g. MCA"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Field of Study
                </label>

                <input
                  value={item.field}
                  onChange={(e) =>
                    updateEducation(
                      item.id,
                      "field",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Computer Applications"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Location
                </label>

                <input
                  value={item.location}
                  onChange={(e) =>
                    updateEducation(
                      item.id,
                      "location",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Jamshedpur, India"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Start Date
                </label>

                <input
                  value={item.startDate}
                  onChange={(e) =>
                    updateEducation(
                      item.id,
                      "startDate",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Aug 2024"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  End Date
                </label>

                <input
                  value={item.endDate}
                  onChange={(e) =>
                    updateEducation(
                      item.id,
                      "endDate",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Jul 2027"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Grade / CGPA / Percentage
                </label>

                <input
                  value={item.grade}
                  onChange={(e) =>
                    updateEducation(
                      item.id,
                      "grade",
                      e.target.value
                    )
                  }
                  placeholder="e.g. CGPA 8.8 / 10"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            <ListEditor
              title="Relevant Coursework"
              items={item.relevantCoursework}
              placeholder="e.g. Data Structures & Algorithms"
              onAdd={() =>
                addListItem(
                  item.id,
                  "relevantCoursework"
                )
              }
              onChange={(index, value) =>
                updateListItem(
                  item.id,
                  "relevantCoursework",
                  index,
                  value
                )
              }
              onRemove={(index) =>
                removeListItem(
                  item.id,
                  "relevantCoursework",
                  index
                )
              }
            />

            <ListEditor
              title="Academic Achievements"
              items={item.achievements}
              placeholder="e.g. Department rank / scholarship / academic award"
              onAdd={() =>
                addListItem(
                  item.id,
                  "achievements"
                )
              }
              onChange={(index, value) =>
                updateListItem(
                  item.id,
                  "achievements",
                  index,
                  value
                )
              }
              onRemove={(index) =>
                removeListItem(
                  item.id,
                  "achievements",
                  index
                )
              }
            />

            <ListEditor
              title="Additional Facts"
              items={item.facts}
              placeholder="Any useful factual information"
              onAdd={() =>
                addListItem(item.id, "facts")
              }
              onChange={(index, value) =>
                updateListItem(
                  item.id,
                  "facts",
                  index,
                  value
                )
              }
              onRemove={(index) =>
                removeListItem(
                  item.id,
                  "facts",
                  index
                )
              }
            />
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-gray-300 pt-5">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-gray-900 px-5 py-2.5 font-medium text-white hover:bg-gray-800"
        >
          Save Education
        </button>
      </div>
    </section>
  );
}

type ListEditorProps = {
  title: string;
  items: string[];
  placeholder: string;
  onAdd: () => void;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
};

function ListEditor({
  title,
  items,
  placeholder,
  onAdd,
  onChange,
  onRemove,
}: ListEditorProps) {
  return (
    <div className="mt-6">
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          {title}
        </label>

        <button
          type="button"
          onClick={onAdd}
          className="text-sm font-medium text-gray-900 hover:underline"
        >
          + Add
        </button>
      </div>

      <div className="space-y-2">
        {items.map((value, index) => (
          <div
            key={index}
            className="flex gap-2"
          >
            <input
              value={value}
              onChange={(e) =>
                onChange(index, e.target.value)
              }
              placeholder={placeholder}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
            />

            <button
              type="button"
              onClick={() => onRemove(index)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}