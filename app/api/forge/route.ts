import { NextResponse } from "next/server";

function analyzeIdea(idea: string) {
  const text = idea.toLowerCase();

  let appType = "General App";
  if (text.includes("ai")) appType = "AI-powered App";
  else if (text.includes("marketplace")) appType = "Marketplace";
  else if (text.includes("saas") || text.includes("dashboard"))
    appType = "SaaS Product";
  else if (text.includes("website")) appType = "Website";

  let targetUser = "General Users";
  if (text.includes("student")) targetUser = "Students";
  else if (text.includes("creator")) targetUser = "Content Creators";
  else if (text.includes("business")) targetUser = "Businesses";

  return { appType, targetUser };
}

function generatePlan(idea: string) {
  const { appType, targetUser } = analyzeIdea(idea);

  const features = [
    "User authentication",
    "Core feature based on the idea",
    "Basic settings page",
  ];

  if (appType === "AI-powered App") {
    features.push("AI interaction interface", "Prompt handling logic");
  }

  if (appType === "Marketplace") {
    features.push("Listings", "Search & filtering", "Payments integration");
  }

  if (targetUser === "Students") {
    features.push("Progress tracking", "Simple onboarding");
  }

  return {
    summary: `This ${appType} is designed for ${targetUser}.`,
    detected: {
      appType,
      targetUser,
    },
    features,
    techStack: {
      frontend: "Next.js",
      backend: "Node.js",
      database: "Supabase",
    },
    nextSteps: [
      "Design product wireframe",
      "Set up project structure",
      "Implement core features",
      "Prepare MVP for deployment",
    ],
  };
}

export async function POST(req: Request) {
  const body = await req.json();
  const idea = body.idea || "";

  const response = generatePlan(idea);

  return NextResponse.json(response);
}
