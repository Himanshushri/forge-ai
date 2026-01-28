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
    const text = idea.toLowerCase();
    const { appType, targetUser } = analyzeIdea(idea);
  
    const features = [
      "User authentication",
      "Core feature based on the idea",
      "Basic settings page",
    ];
  
    // App-type-based features
    if (appType === "AI-powered App") {
      features.push("AI interaction interface", "Prompt handling logic");
    }
  
    if (appType === "Marketplace") {
      features.push("Listings", "Search & filtering", "Payments integration");
    }
  
    // Target-user-based features
    if (targetUser === "Students") {
      features.push("Progress tracking", "Simple onboarding");
    }
  
    if (targetUser === "Businesses") {
      features.push("Admin dashboard", "Analytics and reporting");
    }
  
    // 🔁 ITERATION-AWARE RULES (THIS IS THE KEY FIX)
  
    if (text.includes("monetization")) {
      features.push(
        "Subscription plans",
        "Payment gateway integration",
        "Pricing page"
      );
    }
  
    if (text.includes("simplify")) {
      features.push(
        "Minimal UI",
        "Reduced feature set",
        "Quick onboarding flow"
      );
    }
  
    if (text.includes("advanced")) {
      features.push(
        "Advanced settings",
        "Role-based access control",
        "Customization options"
      );
    }
  
    if (text.includes("beginner")) {
      features.push(
        "Guided tutorials",
        "Tooltips and help prompts"
      );
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
    const iteration = body.iteration || null;
    const previousPlan = body.previousPlan || null;
  
    let contextIdea = idea;
  
    if (iteration && previousPlan) {
      contextIdea = `${idea}. User wants to modify the project: ${iteration}`;
    }
  
    const response = generatePlan(contextIdea);
  
    return NextResponse.json(response);
  }
  
