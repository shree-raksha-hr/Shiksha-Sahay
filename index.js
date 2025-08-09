import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCyBIVWSjKzMBEwfuS1LU6ra5UcrgZsIc4");

async function runGemini() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent("explain how ai works");

  console.log(result.response.text());
}

runGemini();

