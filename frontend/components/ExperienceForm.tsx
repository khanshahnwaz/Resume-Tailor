"use client";

import { useState } from "react";

export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  technologies: string[];
  responsibilities: string[];
  achievements: string[];
  metrics: string[];
  facts: string[];
}

interface ExperienceFormProps {
  initialData?: Experience[];
  onSave?: (data: Experience[]) => void;
}

const createEmptyExperience = (): Experience => ({
  id: crypto.randomUUID(),
  company: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  technologies: [],
  responsibilities: [],
  achievements: [],
  metrics: [],
  facts: [],
});

export default function ExperienceForm({
  initialData = [],
  onSave,
}: ExperienceFormProps) {
  const [experiences, setExperiences] =
    useState<Experience[]>(initialData);

  function addExperience() {
    setExperiences((previous) => [
      ...previous,
      createEmptyExperience(),
    ]);
  }

  function removeExperience(id: string) {
    setExperiences((previous) =>
      previous.filter((experience) => experience.id !== id)
    );
  }

  function updateExperience(
    id: string,
    field: keyof Experience,
    value: string | string[]
  ) {
    setExperiences((previous) =>
      previous.map((experience) =>
        experience.id === id
          ? {
              ...experience,
              [field]: value,
            }
          : experience
      )
    );
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onSave?.(experiences);

    console.log("Experience:", experiences);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Experience
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add your complete professional experience.
          </p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          + Add Experience
        </button>
      </div>

      <div className="mt-6 space-y-8">
        {experiences.length === 0 && (
          <div className="rounded-md border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
            No experience added yet.
            <br />
            Click "Add Experience" to create your first entry.
          </div>
        )}

        {experiences.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            index={index}
            onUpdate={updateExperience}
            onRemove={removeExperience}
          />
        ))}
      </div>

      {experiences.length > 0 && (
        <button
          type="submit"
          className="mt-8 rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Save Experience
        </button>
      )}
    </form>
  );
}

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  onUpdate: (
    id: string,
    field: keyof Experience,
    value: string | string[]
  ) => void;
  onRemove: (id: string) => void;
}

function ExperienceCard({
  experience,
  index,
  onUpdate,
  onRemove,
}: ExperienceCardProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">
          Experience #{index + 1}
        </h3>

        <button
          type="button"
          onClick={() => onRemove(experience.id)}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Remove
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <InputField
          label="Company"
          value={experience.company}
          onChange={(value) =>
            onUpdate(experience.id, "company", value)
          }
          placeholder="Accenture"
          required
        />

        <InputField
          label="Role"
          value={experience.role}
          onChange={(value) =>
            onUpdate(experience.id, "role", value)
          }
          placeholder="Generative AI Engineer Intern"
          required
        />

        <InputField
          label="Location"
          value={experience.location}
          onChange={(value) =>
            onUpdate(experience.id, "location", value)
          }
          placeholder="Bengaluru, India"
        />

        <InputField
          label="Start Date"
          value={experience.startDate}
          onChange={(value) =>
            onUpdate(experience.id, "startDate", value)
          }
          placeholder="May 2026"
          required
        />

        <InputField
          label="End Date"
          value={experience.endDate}
          onChange={(value) =>
            onUpdate(experience.id, "endDate", value)
          }
          placeholder="Jul 2026"
          required
        />
      </div>

      <TagInput
        label="Technologies"
        placeholder="e.g. Python"
        items={experience.technologies}
        onChange={(items) =>
          onUpdate(experience.id, "technologies", items)
        }
      />

      <TextList
        label="Responsibilities"
        description="What were you responsible for?"
        items={experience.responsibilities}
        placeholder="e.g. Developed preprocessing workflows..."
        onChange={(items) =>
          onUpdate(experience.id, "responsibilities", items)
        }
      />

      <TextList
        label="Achievements"
        description="What did you accomplish or improve?"
        items={experience.achievements}
        placeholder="e.g. Improved model evaluation..."
        onChange={(items) =>
          onUpdate(experience.id, "achievements", items)
        }
      />

      <TextList
        label="Metrics / Results"
        description="Numbers make your resume stronger. Add measurable results whenever available."
        items={experience.metrics}
        placeholder="e.g. Reduced processing time by 30%"
        onChange={(items) =>
          onUpdate(experience.id, "metrics", items)
        }
      />

      <TextList
        label="Additional Facts"
        description="Anything technically important that may be useful for future tailoring."
        items={experience.facts}
        placeholder="e.g. Worked with model evaluation pipeline..."
        onChange={(items) =>
          onUpdate(experience.id, "facts", items)
        }
      />
    </div>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-black focus:ring-1 focus:ring-black"
      />
    </div>
  );
}

interface TagInputProps {
  label: string;
  placeholder: string;
  items: string[];
  onChange: (items: string[]) => void;
}

function TagInput({
  label,
  placeholder,
  items,
  onChange,
}: TagInputProps) {
  const [input, setInput] = useState("");

  function addItem() {
    const value = input.trim();

    if (!value) return;

    onChange([...items, value]);
    setInput("");
  }

  function removeItem(index: number) {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="mt-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addItem();
            }
          }}
          placeholder={placeholder}
          className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-black focus:ring-1 focus:ring-black"
        />

        <button
          type="button"
          onClick={addItem}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50"
        >
          Add
        </button>
      </div>

      {items.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
            >
              {item}

              <button
                type="button"
                onClick={() => removeItem(index)}
                className="ml-2 text-gray-500 hover:text-black"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

interface TextListProps {
  label: string;
  description: string;
  items: string[];
  placeholder: string;
  onChange: (items: string[]) => void;
}

function TextList({
  label,
  description,
  items,
  placeholder,
  onChange,
}: TextListProps) {
  function addItem() {
    onChange([...items, ""]);
  }

  function updateItem(index: number, value: string) {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>

      <div className="mt-3 space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex gap-2">
            <textarea
              value={item}
              onChange={(event) =>
                updateItem(index, event.target.value)
              }
              rows={2}
              placeholder={placeholder}
              className="flex-1 resize-y rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-black focus:ring-1 focus:ring-black"
            />

            <button
              type="button"
              onClick={() => removeItem(index)}
              className="px-2 text-sm text-gray-500 hover:text-red-600"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="mt-3 text-sm font-medium text-gray-700 hover:text-black"
      >
        + Add {label}
      </button>
    </div>
  );
}