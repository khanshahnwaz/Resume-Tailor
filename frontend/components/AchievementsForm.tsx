"use client";

import { useState } from "react";

export type Achievement = {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  rankOrStatus: string;
  description: string;
  facts: string[];
};

type AchievementsFormProps = {
  initialData: Achievement[];
  onSave: (data: Achievement[]) => void;
};

const createEmptyAchievement = (): Achievement => ({
  id: crypto.randomUUID(),
  title: "",
  organization: "",
  date: "",
  category: "",
  rankOrStatus: "",
  description: "",
  facts: [],
});

export default function AchievementsForm({
  initialData,
  onSave,
}: AchievementsFormProps) {
  const [achievements, setAchievements] =
    useState<Achievement[]>(initialData);

  const addAchievement = () => {
    setAchievements((current) => [
      ...current,
      createEmptyAchievement(),
    ]);
  };

  const removeAchievement = (id: string) => {
    setAchievements((current) =>
      current.filter(
        (achievement) => achievement.id !== id
      )
    );
  };

  const updateAchievement = (
    id: string,
    field:
      | "title"
      | "organization"
      | "date"
      | "category"
      | "rankOrStatus"
      | "description",
    value: string
  ) => {
    setAchievements((current) =>
      current.map((achievement) =>
        achievement.id === id
          ? { ...achievement, [field]: value }
          : achievement
      )
    );
  };

  const addFact = (id: string) => {
    setAchievements((current) =>
      current.map((achievement) =>
        achievement.id === id
          ? {
              ...achievement,
              facts: [...achievement.facts, ""],
            }
          : achievement
      )
    );
  };

  const updateFact = (
    id: string,
    index: number,
    value: string
  ) => {
    setAchievements((current) =>
      current.map((achievement) => {
        if (achievement.id !== id) return achievement;

        const facts = [...achievement.facts];
        facts[index] = value;

        return {
          ...achievement,
          facts,
        };
      })
    );
  };

  const removeFact = (
    id: string,
    index: number
  ) => {
    setAchievements((current) =>
      current.map((achievement) => {
        if (achievement.id !== id) return achievement;

        return {
          ...achievement,
          facts: achievement.facts.filter(
            (_, i) => i !== index
          ),
        };
      })
    );
  };

  const handleSave = () => {
    console.log(
      "Achievements form data:",
      achievements
    );

    onSave(achievements);
  };

  return (
    <section className="mt-8 rounded-xl border border-gray-300 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Achievements
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Store awards, competitions, rankings,
            certifications, recognitions, and other
            accomplishments.
          </p>
        </div>

        <button
          type="button"
          onClick={addAchievement}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Add Achievement
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {achievements.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-600">
              No achievements added yet.
            </p>

            <button
              type="button"
              onClick={addAchievement}
              className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Add Your First Achievement
            </button>
          </div>
        )}

        {achievements.map((achievement, index) => (
          <div
            key={achievement.id}
            className="rounded-xl border border-gray-300 bg-gray-50 p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Achievement #{index + 1}
              </h3>

              <button
                type="button"
                onClick={() =>
                  removeAchievement(achievement.id)
                }
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Remove
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Achievement Title
                </label>

                <input
                  value={achievement.title}
                  onChange={(e) =>
                    updateAchievement(
                      achievement.id,
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Flipkart GRiD 6.0 National Semifinalist"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Organization / Event
                </label>

                <input
                  value={achievement.organization}
                  onChange={(e) =>
                    updateAchievement(
                      achievement.id,
                      "organization",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Flipkart GRiD"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Date
                </label>

                <input
                  value={achievement.date}
                  onChange={(e) =>
                    updateAchievement(
                      achievement.id,
                      "date",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Sep 2025"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Category
                </label>

                <input
                  value={achievement.category}
                  onChange={(e) =>
                    updateAchievement(
                      achievement.id,
                      "category",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Competition"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Rank / Status
                </label>

                <input
                  value={achievement.rankOrStatus}
                  onChange={(e) =>
                    updateAchievement(
                      achievement.id,
                      "rankOrStatus",
                      e.target.value
                    )
                  }
                  placeholder="e.g. National Semifinalist"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  value={achievement.description}
                  onChange={(e) =>
                    updateAchievement(
                      achievement.id,
                      "description",
                      e.target.value
                    )
                  }
                  rows={3}
                  placeholder="Briefly describe the achievement."
                  className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Supporting Facts
                </label>

                <button
                  type="button"
                  onClick={() =>
                    addFact(achievement.id)
                  }
                  className="text-sm font-medium text-gray-900 hover:underline"
                >
                  + Add Fact
                </button>
              </div>

              <div className="space-y-2">
                {achievement.facts.map(
                  (fact, factIndex) => (
                    <div
                      key={factIndex}
                      className="flex gap-2"
                    >
                      <input
                        value={fact}
                        onChange={(e) =>
                          updateFact(
                            achievement.id,
                            factIndex,
                            e.target.value
                          )
                        }
                        placeholder="Additional factual detail"
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeFact(
                            achievement.id,
                            factIndex
                          )
                        }
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Remove
                      </button>
                    </div>
                  )
                )}
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
          Save Achievements
        </button>
      </div>
    </section>
  );
}