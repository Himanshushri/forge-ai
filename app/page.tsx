"use client";

import { useState } from "react";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [response, setResponse] = useState<string | null>(null);

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
  };
  

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
    <h1 className="text-3xl font-bold mb-6 text-black">
  Forge AI — Build. Deploy. Evolve.
</h1>

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
