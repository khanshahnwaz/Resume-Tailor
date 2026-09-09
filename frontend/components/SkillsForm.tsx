"use client";

import { useState } from "react";

export type SkillCategory = {
  id: string;
  category: string;
  skills: string[];
  facts: string[];
};

type SkillsFormProps = {
  initialData: SkillCategory[];
  onSave: (data: SkillCategory[]) => void;
};

const createEmptyCategory = (): SkillCategory => ({
  id: crypto.randomUUID(),
  category: "",
  skills: [],
  facts: [],
});

export default function SkillsForm({
  initialData,
  onSave,
}: SkillsFormProps) {
  const [categories, setCategories] =
    useState<SkillCategory[]>(initialData);

  const addCategory = () => {
    setCategories((current) => [
      ...current,
      createEmptyCategory(),
    ]);
  };

  const removeCategory = (id: string) => {
    setCategories((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const updateCategory = (
    id: string,
    field: "category",
    value: string
  ) => {
    setCategories((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const addSkill = (id: string) => {
    setCategories((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              skills: [...item.skills, ""],
            }
          : item
      )
    );
  };

  const updateSkill = (
    id: string,
    index: number,
    value: string
  ) => {
    setCategories((current) =>
      current.map((item) => {
        if (item.id !== id) return item;

        const skills = [...item.skills];
        skills[index] = value;

        return {
          ...item,
          skills,
        };
      })
    );
  };

  const removeSkill = (
    id: string,
    index: number
  ) => {
    setCategories((current) =>
      current.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          skills: item.skills.filter(
            (_, i) => i !== index
          ),
        };
      })
    );
  };

  const addFact = (id: string) => {
    setCategories((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              facts: [...item.facts, ""],
            }
          : item
      )
    );
  };

  const updateFact = (
    id: string,
    index: number,
    value: string
  ) => {
    setCategories((current) =>
      current.map((item) => {
        if (item.id !== id) return item;

        const facts = [...item.facts];
        facts[index] = value;

        return {
          ...item,
          facts,
        };
      })
    );
  };

  const removeFact = (
    id: string,
    index: number
  ) => {
    setCategories((current) =>
      current.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          facts: item.facts.filter(
            (_, i) => i !== index
          ),
        };
      })
    );
  };

  const handleSave = () => {
    console.log("Skills form data:", categories);
    onSave(categories);
  };

  return (
    <section className="mt-8 rounded-xl border border-gray-300 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Skills
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Organize your technical skills into meaningful
            categories. These will later be matched against
            job descriptions.
          </p>
        </div>

        <button
          type="button"
          onClick={addCategory}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Add Category
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {categories.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-600">
              No skill categories added yet.
            </p>

            <button
              type="button"
              onClick={addCategory}
              className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Add Your First Category
            </button>
          </div>
        )}

        {categories.map((item, categoryIndex) => (
          <div
            key={item.id}
            className="rounded-xl border border-gray-300 bg-gray-50 p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Category #{categoryIndex + 1}
              </h3>

              <button
                type="button"
                onClick={() => removeCategory(item.id)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Remove
              </button>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category Name
              </label>

              <input
                value={item.category}
                onChange={(e) =>
                  updateCategory(
                    item.id,
                    "category",
                    e.target.value
                  )
                }
                placeholder="e.g. Programming Languages"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
              />
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Skills
                </label>

                <button
                  type="button"
                  onClick={() => addSkill(item.id)}
                  className="text-sm font-medium text-gray-900 hover:underline"
                >
                  + Add Skill
                </button>
              </div>

              <div className="space-y-2">
                {item.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex gap-2"
                  >
                    <input
                      value={skill}
                      onChange={(e) =>
                        updateSkill(
                          item.id,
                          index,
                          e.target.value
                        )
                      }
                      placeholder="e.g. C++"
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeSkill(item.id, index)
                      }
                      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Supporting Facts
                </label>

                <button
                  type="button"
                  onClick={() => addFact(item.id)}
                  className="text-sm font-medium text-gray-900 hover:underline"
                >
                  + Add Fact
                </button>
              </div>

              <p className="mb-2 text-xs text-gray-500">
                Add evidence that shows how you actually
                used these skills.
              </p>

              <div className="space-y-2">
                {item.facts.map((fact, index) => (
                  <div
                    key={index}
                    className="flex gap-2"
                  >
                    <input
                      value={fact}
                      onChange={(e) =>
                        updateFact(
                          item.id,
                          index,
                          e.target.value
                        )
                      }
                      placeholder="e.g. Built an HNSW index from scratch in C++"
                      className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeFact(item.id, index)
                      }
                      className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 border-t border-gray-300 pt-5">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg bg-gray-900 px-5 py-2.5 font-medium text-white hover:bg-gray-800"
        >
          Save Skills
        </button>
      </div>
    </section>
  );
}