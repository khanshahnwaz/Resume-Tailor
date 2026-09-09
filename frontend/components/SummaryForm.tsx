"use client";

import { useState } from "react";

export interface SummaryInfo {
  baseSummary: string;
  targetRoles: string[];
  coreStrengths: string[];
  domains: string[];
}

interface SummaryFormProps {
  initialData?: SummaryInfo;
  onSave?: (data: SummaryInfo) => void;
}

const emptyData: SummaryInfo = {
  baseSummary: "",
  targetRoles: [],
  coreStrengths: [],
  domains: [],
};

export default function SummaryForm({
  initialData = emptyData,
  onSave,
}: SummaryFormProps) {
  const [formData, setFormData] =
    useState<SummaryInfo>(initialData);

  const [roleInput, setRoleInput] = useState("");
  const [strengthInput, setStrengthInput] = useState("");
  const [domainInput, setDomainInput] = useState("");

  function handleSummaryChange(value: string) {
    setFormData((previous) => ({
      ...previous,
      baseSummary: value,
    }));
  }

  function addItem(
    field: "targetRoles" | "coreStrengths" | "domains",
    value: string
  ) {
    const trimmedValue = value.trim();

    if (!trimmedValue) return;

    setFormData((previous) => ({
      ...previous,
      [field]: [...previous[field], trimmedValue],
    }));
  }

  function removeItem(
    field: "targetRoles" | "coreStrengths" | "domains",
    index: number
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: previous[field].filter(
        (_, itemIndex) => itemIndex !== index
      ),
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onSave?.(formData);

    console.log("Summary information:", formData);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-4xl">
       <h2 className="text-2xl font-semibold text-gray-900">
        Summary & Positioning
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Tell the system how you want to be positioned.
        The final resume will be tailored to each job.
      </p>

      {/* Base Summary */}

      <div className="mt-6">
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Base Summary
        </label>

        <textarea
          value={formData.baseSummary}
          onChange={(event) =>
            handleSummaryChange(event.target.value)
          }
          rows={6}
          placeholder="Write a general professional summary about yourself..."
          className="w-full resize-y rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-black focus:ring-1 focus:ring-black"
        />

        <p className="mt-1 text-xs text-gray-500">
          This is your source material. The AI may rewrite it
          for a particular job.
        </p>
      </div>

      {/* Target Roles */}

      <TagInput
        label="Target Roles"
        placeholder="e.g. Software Engineer"
        inputValue={roleInput}
        setInputValue={setRoleInput}
        items={formData.targetRoles}
        onAdd={() => {
          addItem("targetRoles", roleInput);
          setRoleInput("");
        }}
        onRemove={(index) =>
          removeItem("targetRoles", index)
        }
      />

      {/* Core Strengths */}

      <TagInput
        label="Core Strengths"
        placeholder="e.g. Backend Development"
        inputValue={strengthInput}
        setInputValue={setStrengthInput}
        items={formData.coreStrengths}
        onAdd={() => {
          addItem("coreStrengths", strengthInput);
          setStrengthInput("");
        }}
        onRemove={(index) =>
          removeItem("coreStrengths", index)
        }
      />

      {/* Domains */}

      <TagInput
        label="Domains / Interests"
        placeholder="e.g. Distributed Systems"
        inputValue={domainInput}
        setInputValue={setDomainInput}
        items={formData.domains}
        onAdd={() => {
          addItem("domains", domainInput);
          setDomainInput("");
        }}
        onRemove={(index) =>
          removeItem("domains", index)
        }
      />

      <button
        type="submit"
        className="mt-8 rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
      >
        Save Summary
      </button>
    </form>
  );
}

interface TagInputProps {
  label: string;
  placeholder: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  items: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
}

function TagInput({
  label,
  placeholder,
  inputValue,
  setInputValue,
  items,
  onAdd,
  onRemove,
}: TagInputProps) {
  return (
    <div className="mt-6">
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(event) =>
            setInputValue(event.target.value)
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              onAdd();
            }
          }}
          placeholder={placeholder}
          className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-black focus:ring-1 focus:ring-black"
        />

        <button
          type="button"
          onClick={onAdd}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Add
        </button>
      </div>

      {items.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {items.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700"
            >
              {item}

              <button
                type="button"
                onClick={() => onRemove(index)}
                className="text-gray-500 hover:text-black"
                aria-label={`Remove ${item}`}
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