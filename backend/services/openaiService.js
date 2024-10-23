// services/openaiService.js
const OpenAI = require('openai');  
const dotenv = require("dotenv");

dotenv.config();

const apiKey = process.env.API_KEY;

const openai = new OpenAI({
  apiKey : apiKey
});

async function callGPT(promptContent, systemContent, previousChat) {
  try {
    const messages = [];

    const userPrompt = {
      role: "user",
      content: promptContent,
    };
    const systemPrompt = {
      role: "system",
      content: systemContent,
    };
    const assistantPrompt = {
      role: "assistant",
      content: previousChat,
    };

    messages.push(userPrompt);
    messages.push(systemPrompt);
    messages.push(assistantPrompt);

    const response = await openai.chat.completions.create({
      model: "gpt-4", // Switch to different models if necessary
      //   model: "gpt-3.5-turbo",
      messages: messages,
    });

    console.log("-------", response.choices);
    console.log(response.choices[0].message.content);
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    return `An error occurred while processing the request: ${error}`;
  }
}

module.exports = { callGPT };
