"use client";

import { useState } from "react";

type ForgeProject = {
  id: string;
  idea: string;
  plan: string;
  createdAt: string;
};

export default function Home() {
  const [idea, setIdea] = useState("");
  const [response, setResponse] = useState<string | null>(null);

  const [projects, setProjects] = useState<ForgeProject[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const handleGenerate = async () => {
    setResponse("Thinking...");

    const res = await fetch("/api/forge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idea }),
    });

    const data = await res.json();

    const formattedResponse = `
App Summary:
${data.summary}

Detected Context:
• App Type: ${data.detected.appType}
• Target User: ${data.detected.targetUser}

Key Features:
${data.features.map((f: string) => `• ${f}`).join("\n")}

Tech Stack:
• Frontend: ${data.techStack.frontend}
• Backend: ${data.techStack.backend}
• Database: ${data.techStack.database}

Next Steps:
${data.nextSteps.map((s: string) => `• ${s}`).join("\n")}
`;

    setResponse(formattedResponse);

    const newProject: ForgeProject = {
      id: crypto.randomUUID(),
      idea,
      plan: formattedResponse,
      createdAt: new Date().toLocaleString(),
    };

    setProjects((prev) => [newProject, ...prev]);
    setActiveProjectId(newProject.id);
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6 text-black">
        Forge AI — Build. Deploy. Evolve.
      </h1>

      <div className="w-full max-w-xl mb-6">
        <h2 className="text-lg font-semibold mb-2 text-black">
          Your Projects
        </h2>

        {projects.length === 0 && (
          <p className="text-gray-500 text-sm">
            No projects yet. Generate your first idea.
          </p>
        )}

        <ul className="space-y-2">
          {projects.map((project) => (
            <li
              key={project.id}
              className={`p-3 rounded border cursor-pointer ${
                project.id === activeProjectId
                  ? "border-black bg-gray-100"
                  : "border-gray-300"
              }`}
              onClick={() => {
                setActiveProjectId(project.id);
                setResponse(project.plan);
              }}
            >
              <p className="font-medium text-black truncate">
                {project.idea}
              </p>
              <p className="text-xs text-gray-500">
                {project.createdAt}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <textarea
        className="w-full max-w-xl p-4 border border-gray-300 rounded mb-4 text-black"
        placeholder="Describe your app idea..."
        rows={4}
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />

      <button
        className="bg-black text-white px-6 py-2 rounded mb-6 hover:bg-gray-800"
        onClick={handleGenerate}
      >
        Generate Plan
      </button>

      {response && (
        <div className="w-full max-w-xl bg-white p-6 rounded shadow">
          <pre className="whitespace-pre-wrap text-black">
            {response}
          </pre>
        </div>
      )}
    </main>
  );
}
