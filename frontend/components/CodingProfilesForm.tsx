"use client";

import { useState } from "react";

export type CodingProfile = {
  id: string;
  platform: string;
  username: string;
  profileUrl: string;
  rating: string;
  problemsSolved: string;
  rank: string;
  achievements: string[];
  facts: string[];
};

type CodingProfilesFormProps = {
  initialData: CodingProfile[];
  onSave: (data: CodingProfile[]) => void;
};

const createEmptyProfile = (): CodingProfile => ({
  id: crypto.randomUUID(),
  platform: "",
  username: "",
  profileUrl: "",
  rating: "",
  problemsSolved: "",
  rank: "",
  achievements: [],
  facts: [],
});

export default function CodingProfilesForm({
  initialData,
  onSave,
}: CodingProfilesFormProps) {
  const [profiles, setProfiles] =
    useState<CodingProfile[]>(initialData);

  const addProfile = () => {
    setProfiles((current) => [
      ...current,
      createEmptyProfile(),
    ]);
  };

  const removeProfile = (id: string) => {
    setProfiles((current) =>
      current.filter((profile) => profile.id !== id)
    );
  };

  const updateProfile = (
    id: string,
    field:
      | "platform"
      | "username"
      | "profileUrl"
      | "rating"
      | "problemsSolved"
      | "rank",
    value: string
  ) => {
    setProfiles((current) =>
      current.map((profile) =>
        profile.id === id
          ? { ...profile, [field]: value }
          : profile
      )
    );
  };

  const addListItem = (
    id: string,
    field: "achievements" | "facts"
  ) => {
    setProfiles((current) =>
      current.map((profile) =>
        profile.id === id
          ? {
              ...profile,
              [field]: [...profile[field], ""],
            }
          : profile
      )
    );
  };

  const updateListItem = (
    id: string,
    field: "achievements" | "facts",
    index: number,
    value: string
  ) => {
    setProfiles((current) =>
      current.map((profile) => {
        if (profile.id !== id) return profile;

        const updatedList = [...profile[field]];
        updatedList[index] = value;

        return {
          ...profile,
          [field]: updatedList,
        };
      })
    );
  };

  const removeListItem = (
    id: string,
    field: "achievements" | "facts",
    index: number
  ) => {
    setProfiles((current) =>
      current.map((profile) => {
        if (profile.id !== id) return profile;

        return {
          ...profile,
          [field]: profile[field].filter(
            (_, i) => i !== index
          ),
        };
      })
    );
  };

  const handleSave = () => {
    console.log(
      "Coding Profiles form data:",
      profiles
    );

    onSave(profiles);
  };

  return (
    <section className="mt-8 rounded-xl border border-gray-300 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Coding Profiles
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add your competitive programming and coding
            platform profiles with measurable achievements.
          </p>
        </div>

        <button
          type="button"
          onClick={addProfile}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Add Profile
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {profiles.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-600">
              No coding profiles added yet.
            </p>

            <button
              type="button"
              onClick={addProfile}
              className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Add Your First Profile
            </button>
          </div>
        )}

        {profiles.map((profile, index) => (
          <div
            key={profile.id}
            className="rounded-xl border border-gray-300 bg-gray-50 p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Profile #{index + 1}
              </h3>

              <button
                type="button"
                onClick={() =>
                  removeProfile(profile.id)
                }
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Remove
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Platform
                </label>

                <input
                  value={profile.platform}
                  onChange={(e) =>
                    updateProfile(
                      profile.id,
                      "platform",
                      e.target.value
                    )
                  }
                  placeholder="e.g. LeetCode"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Username
                </label>

                <input
                  value={profile.username}
                  onChange={(e) =>
                    updateProfile(
                      profile.id,
                      "username",
                      e.target.value
                    )
                  }
                  placeholder="e.g. khanshahnwaz"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Profile URL
                </label>

                <input
                  value={profile.profileUrl}
                  onChange={(e) =>
                    updateProfile(
                      profile.id,
                      "profileUrl",
                      e.target.value
                    )
                  }
                  placeholder="https://leetcode.com/..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Rating
                </label>

                <input
                  value={profile.rating}
                  onChange={(e) =>
                    updateProfile(
                      profile.id,
                      "rating",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Knight / 1400+"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Problems Solved
                </label>

                <input
                  value={profile.problemsSolved}
                  onChange={(e) =>
                    updateProfile(
                      profile.id,
                      "problemsSolved",
                      e.target.value
                    )
                  }
                  placeholder="e.g. 850+"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Rank
                </label>

                <input
                  value={profile.rank}
                  onChange={(e) =>
                    updateProfile(
                      profile.id,
                      "rank",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Top 10%"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            <ListEditor
              title="Achievements"
              items={profile.achievements}
              placeholder="e.g. Knight rating on LeetCode"
              addLabel="Add Achievement"
              onAdd={() =>
                addListItem(
                  profile.id,
                  "achievements"
                )
              }
              onChange={(index, value) =>
                updateListItem(
                  profile.id,
                  "achievements",
                  index,
                  value
                )
              }
              onRemove={(index) =>
                removeListItem(
                  profile.id,
                  "achievements",
                  index
                )
              }
            />

            <ListEditor
              title="Additional Facts"
              items={profile.facts}
              placeholder="Any other factual information"
              addLabel="Add Fact"
              onAdd={() =>
                addListItem(
                  profile.id,
                  "facts"
                )
              }
              onChange={(index, value) =>
                updateListItem(
                  profile.id,
                  "facts",
                  index,
                  value
                )
              }
              onRemove={(index) =>
                removeListItem(
                  profile.id,
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
          Save Coding Profiles
        </button>
      </div>
    </section>
  );
}

type ListEditorProps = {
  title: string;
  items: string[];
  placeholder: string;
  addLabel: string;
  onAdd: () => void;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
};

function ListEditor({
  title,
  items,
  placeholder,
  addLabel,
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
          + {addLabel}
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
              onClick={() =>
                onRemove(index)
              }
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