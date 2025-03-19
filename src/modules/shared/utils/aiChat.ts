import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: import.meta.env.VITE_APP_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getPopularRoadmaps = async () => {
  const response = await groq.chat.completions.create({
    model: "llama3-8b-8192",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. you should return response in this format: string[] for example [React,NextJs,French] etc, without any other text or explanation just and array of strings",
      },
      { role: "user", content: "Get me popular topics" },
    ],
  });
  return response;
};

// Interface for the roadmap advice parameters
interface RoadmapAdviceParams {
  roadmapName: string;
  roadmapDescription: string;
  modules: { name: string; description: string }[];
  difficulty: string;
}

/**
 * Generates advice and opinions for a roadmap using Groq AI
 * @param params Parameters containing roadmap information
 * @returns A string containing the advice from the Akinator character
 */
export const generateRoadmapAdvice = async (
  params: RoadmapAdviceParams
): Promise<string> => {
  const { roadmapName, roadmapDescription, modules, difficulty } = params;

  // Format the modules info for the prompt
  const modulesInfo = modules
    .map((module) => `- ${module.name}: ${module.description}`)
    .join("\n");

  const response = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      {
        role: "system",
        content:
          "You are a professional learning advisor who provides clear, concise, and engaging advice on learning roadmaps. Your tone should be professional but conversational. Please format your response as HTML to make it visually engaging. Use appropriate HTML elements like:\n\n- <h3> for section headings\n- <strong> or <em> for emphasis\n- <ul> and <li> for bullet points\n- <span> with inline style for color highlights (use colors like #4776e6, #8e54e9, #2ecc71)\n\nKeep your response focused and concise (150-200 words total). Your HTML should be valid and properly formatted. Use styling to highlight key points, but keep it clean and professional.",
      },
      {
        role: "user",
        content: `Please analyze this learning roadmap and provide your expert advice formatted with HTML:
        
Roadmap Name: ${roadmapName}
Difficulty Level: ${difficulty}
Description: ${roadmapDescription}

Modules:
${modulesInfo}

What practical advice can you provide for someone following this learning path? Make your response visually engaging with HTML formatting.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 400,
  });

  return (
    response.choices[0]?.message?.content ||
    "<p>I couldn't generate advice for this roadmap at the moment. Please try again later.</p>"
  );
};

// Interface for module advice parameters
interface ModuleAdviceParams {
  topicName: string;
  topicDifficulty: string;
  chapters: {
    name: string;
    description: string;
  }[];
  roadmapContext?: string;
}

/**
 * Generates teaching content and advice for a specific module/topic
 * @param params Parameters containing module/topic information
 * @returns A string containing HTML-formatted advice about the module
 */
export const generateModuleAdvice = async (
  params: ModuleAdviceParams
): Promise<string> => {
  const { topicName, topicDifficulty, chapters, roadmapContext } = params;

  // Format the chapters info for the prompt
  const chaptersInfo = chapters
    .map(
      (chapter) =>
        `- ${chapter.name}: ${
          chapter.description || "No description available"
        }`
    )
    .join("\n");

  const response = await groq.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      {
        role: "system",
        content:
          "You are an expert technical instructor providing guidance on specific learning topics. Your tone should be professional, clear, and engaging. Format your response with HTML to make it visually appealing and structured. Use elements like:\n\n- <h3> for section headings\n- <strong> or <em> for emphasis\n- <ul> and <li> for bullet points\n- <span> with inline style for color highlights (use #4776e6, #8e54e9, #2ecc71)\n- <code> for small code snippets or technical terms\n\nYour response should include:\n1. A brief explanation of why this topic is important\n2. Key concepts to understand\n3. Common challenges and how to overcome them\n4. Learning strategies specific to this topic\n5. How this topic connects to the broader subject\n\nKeep your response focused and concise (200-300 words total).",
      },
      {
        role: "user",
        content: `Please provide expert teaching advice about this specific module/topic, formatted with HTML:
        
Topic Name: ${topicName}
Difficulty Level: ${topicDifficulty}
${roadmapContext ? `Context: ${roadmapContext}` : ""}

Chapters/Sections:
${chaptersInfo}

What should I know about this topic? How should I approach learning it? What are the key concepts, potential challenges, and best strategies for mastering this topic? Make your response visually engaging with HTML formatting.`,
      },
    ],
    temperature: 0.7,
    max_tokens: 600,
  });

  return (
    response.choices[0]?.message?.content ||
    "<p>I couldn't generate advice for this topic at the moment. Please try again later.</p>"
  );
};
