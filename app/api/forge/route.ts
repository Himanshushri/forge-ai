import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const idea = body.idea || "";

  // 🧠 MOCK AI LOGIC
  const response = {
    summary: `This is a product based on the idea: "${idea}"`,
    features: [
      "User authentication",
      "Core feature based on the idea",
      "Clean dashboard UI",
      "Basic settings page"
    ],
    techStack: {
      frontend: "Next.js",
      backend: "Node.js",
      database: "Supabase"
    },
    nextSteps: [
      "Design UI wireframes",
      "Set up backend APIs",
      "Implement core feature",
      "Deploy MVP"
    ]
  };

  return NextResponse.json(response);
}
