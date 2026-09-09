"use client";

import { useState } from "react";

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  portfolio: string;
  linkedin: string;
  github: string;
  leetcode: string;
}

interface PersonalFormProps {
  initialData?: PersonalInfo;
  onSave?: (data: PersonalInfo) => void;
}

const emptyData: PersonalInfo = {
  name: "",
  email: "",
  phone: "",
  location: "",
  portfolio: "",
  linkedin: "",
  github: "",
  leetcode: "",
};

export default function PersonalForm({
  initialData = emptyData,
  onSave,
}: PersonalFormProps) {
  const [formData, setFormData] = useState<PersonalInfo>(initialData);

  function handleChange(
    field: keyof PersonalInfo,
    value: string
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (onSave) {
      onSave(formData);
    }

    console.log("Personal information:", formData);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-3xl">
      <h2 className="text-2xl font-semibold">
        Personal Information
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        This information will appear on your generated resume.
      </p>

      <div className="mt-6 grid gap-5">
        <InputField
          label="Full Name"
          value={formData.name}
          onChange={(value) => handleChange("name", value)}
          placeholder="Shahnwaz Khan"
          required
        />

        <InputField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(value) => handleChange("email", value)}
          placeholder="shahnwaz@example.com"
          required
        />

        <InputField
          label="Phone"
          value={formData.phone}
          onChange={(value) => handleChange("phone", value)}
          placeholder="+91 9876543210"
          required
        />

        <InputField
          label="Location"
          value={formData.location}
          onChange={(value) => handleChange("location", value)}
          placeholder="Jamshedpur, Jharkhand"
        />

        <InputField
          label="Portfolio"
          type="url"
          value={formData.portfolio}
          onChange={(value) => handleChange("portfolio", value)}
          placeholder="https://yourportfolio.com"
        />

        <InputField
          label="LinkedIn"
          type="url"
          value={formData.linkedin}
          onChange={(value) => handleChange("linkedin", value)}
          placeholder="https://linkedin.com/in/username"
        />

        <InputField
          label="GitHub"
          type="url"
          value={formData.github}
          onChange={(value) => handleChange("github", value)}
          placeholder="https://github.com/username"
        />

        <InputField
          label="LeetCode"
          type="url"
          value={formData.leetcode}
          onChange={(value) => handleChange("leetcode", value)}
          placeholder="https://leetcode.com/username"
        />
      </div>

      <button
        type="submit"
        className="mt-8 rounded-md bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
      >
        Save Personal Information
      </button>
    </form>
  );
}

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-black focus:ring-1 focus:ring-black"
      />
    </div>
  );
}