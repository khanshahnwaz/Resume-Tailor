"use client";

import { useState } from "react";

export type Project = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  url: string;
  technologies: string[];
  description: string;
  features: string[];
  technicalDetails: string[];
  achievements: string[];
  metrics: string[];
  facts: string[];
};

type ProjectsFormProps = {
  initialData: Project[];
  onSave: (data: Project[]) => void;
};

const createEmptyProject = (): Project => ({
  id: crypto.randomUUID(),
  name: "",
  startDate: "",
  endDate: "",
  url: "",
  technologies: [],
  description: "",
  features: [],
  technicalDetails: [],
  achievements: [],
  metrics: [],
  facts: [],
});

export default function ProjectsForm({
  initialData,
  onSave,
}: ProjectsFormProps) {
  const [projects, setProjects] =
    useState<Project[]>(initialData);

  const addProject = () => {
    setProjects((current) => [
      ...current,
      createEmptyProject(),
    ]);
  };

  const removeProject = (id: string) => {
    setProjects((current) =>
      current.filter((project) => project.id !== id)
    );
  };

  const updateProject = (
    id: string,
    field:
      | "name"
      | "startDate"
      | "endDate"
      | "url"
      | "description",
    value: string
  ) => {
    setProjects((current) =>
      current.map((project) =>
        project.id === id
          ? { ...project, [field]: value }
          : project
      )
    );
  };

  const addListItem = (
    id: string,
    field:
      | "technologies"
      | "features"
      | "technicalDetails"
      | "achievements"
      | "metrics"
      | "facts"
  ) => {
    setProjects((current) =>
      current.map((project) =>
        project.id === id
          ? {
              ...project,
              [field]: [...project[field], ""],
            }
          : project
      )
    );
  };

  const updateListItem = (
    id: string,
    field:
      | "technologies"
      | "features"
      | "technicalDetails"
      | "achievements"
      | "metrics"
      | "facts",
    index: number,
    value: string
  ) => {
    setProjects((current) =>
      current.map((project) => {
        if (project.id !== id) return project;

        const updatedList = [...project[field]];
        updatedList[index] = value;

        return {
          ...project,
          [field]: updatedList,
        };
      })
    );
  };

  const removeListItem = (
    id: string,
    field:
      | "technologies"
      | "features"
      | "technicalDetails"
      | "achievements"
      | "metrics"
      | "facts",
    index: number
  ) => {
    setProjects((current) =>
      current.map((project) => {
        if (project.id !== id) return project;

        return {
          ...project,
          [field]: project[field].filter(
            (_, i) => i !== index
          ),
        };
      })
    );
  };

  const handleSave = () => {
    console.log("Projects form data:", projects);
    onSave(projects);
  };

  return (
    <section className="mt-8 rounded-xl border border-gray-300 bg-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Projects
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Store detailed project evidence. The tailoring
            engine will later select the most relevant details
            for each job description.
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          + Add Project
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {projects.length === 0 && (
          <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-600">
              No projects added yet.
            </p>

            <button
              type="button"
              onClick={addProject}
              className="mt-3 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Add Your First Project
            </button>
          </div>
        )}

        {projects.map((project, index) => (
          <div
            key={project.id}
            className="rounded-xl border border-gray-300 bg-gray-50 p-5"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Project #{index + 1}
              </h3>

              <button
                type="button"
                onClick={() => removeProject(project.id)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Remove
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Project Name
                </label>

                <input
                  value={project.name}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Vector Database & HNSW ANN Index"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Start Date
                </label>

                <input
                  value={project.startDate}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "startDate",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Jan 2026"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  End Date
                </label>

                <input
                  value={project.endDate}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "endDate",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Mar 2026"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Project URL
                </label>

                <input
                  value={project.url}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "url",
                      e.target.value
                    )
                  }
                  placeholder="https://github.com/..."
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Short Description
                </label>

                <textarea
                  value={project.description}
                  onChange={(e) =>
                    updateProject(
                      project.id,
                      "description",
                      e.target.value
                    )
                  }
                  rows={3}
                  placeholder="What is the project and what problem does it solve?"
                  className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400"
                />
              </div>
            </div>

            <ListEditor
              title="Technologies"
              items={project.technologies}
              placeholder="e.g. C++"
              addLabel="Add Technology"
              onAdd={() =>
                addListItem(
                  project.id,
                  "technologies"
                )
              }
              onChange={(index, value) =>
                updateListItem(
                  project.id,
                  "technologies",
                  index,
                  value
                )
              }
              onRemove={(index) =>
                removeListItem(
                  project.id,
                  "technologies",
                  index
                )
              }
            />

            <ListEditor
              title="Features"
              items={project.features}
              placeholder="What functionality did you build?"
              addLabel="Add Feature"
              onAdd={() =>
                addListItem(
                  project.id,
                  "features"
                )
              }
              onChange={(index, value) =>
                updateListItem(
                  project.id,
                  "features",
                  index,
                  value
                )
              }
              onRemove={(index) =>
                removeListItem(
                  project.id,
                  "features",
                  index
                )
              }
            />

            <ListEditor
              title="Technical Details"
              items={project.technicalDetails}
              placeholder="Describe an important technical implementation or design decision"
              addLabel="Add Technical Detail"
              onAdd={() =>
                addListItem(
                  project.id,
                  "technicalDetails"
                )
              }
              onChange={(index, value) =>
                updateListItem(
                  project.id,
                  "technicalDetails",
                  index,
                  value
                )
              }
              onRemove={(index) =>
                removeListItem(
                  project.id,
                  "technicalDetails",
                  index
                )
              }
            />

            <ListEditor
              title="Achievements"
              items={project.achievements}
              placeholder="What did you accomplish?"
              addLabel="Add Achievement"
              onAdd={() =>
                addListItem(
                  project.id,
                  "achievements"
                )
              }
              onChange={(index, value) =>
                updateListItem(
                  project.id,
                  "achievements",
                  index,
                  value
                )
              }
              onRemove={(index) =>
                removeListItem(
                  project.id,
                  "achievements",
                  index
                )
              }
            />

            <ListEditor
              title="Metrics"
              items={project.metrics}
              placeholder="e.g. 95.3% Recall@10, 3.91ms latency"
              addLabel="Add Metric"
              onAdd={() =>
                addListItem(
                  project.id,
                  "metrics"
                )
              }
              onChange={(index, value) =>
                updateListItem(
                  project.id,
                  "metrics",
                  index,
                  value
                )
              }
              onRemove={(index) =>
                removeListItem(
                  project.id,
                  "metrics",
                  index
                )
              }
            />

            <ListEditor
              title="Additional Facts"
              items={project.facts}
              placeholder="Any other factual information about this project"
              addLabel="Add Fact"
              onAdd={() =>
                addListItem(
                  project.id,
                  "facts"
                )
              }
              onChange={(index, value) =>
                updateListItem(
                  project.id,
                  "facts",
                  index,
                  value
                )
              }
              onRemove={(index) =>
                removeListItem(
                  project.id,
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
          Save Projects
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