import { GOOGLE_API_KEY } from "./config.js"
import { GoogleGenerativeAI } from "@google/gnerative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

let mistakeCount = 0;

export async function getStewiesReaction(mistake) {
    mistakeCount ++;

    const prompt = `
    You are Stewie Griffin from the cartoon show Family Guy.
    The mistake was:${mistake.details}.
    The number of mistakes that has been made so far is:${mistakeCount}.

    Choose ONE of the following moods:
    - confused
    - angry
    - rageful
    - crazed 
    - exasperated

    Then write one short dramatic, sarcastic reaction in a style similar to Stewie's. 
    Format your response as JSON like this:
    {
        "mood" : "angry",
        "quote" : "Blast! How could you get that wrong?"
    }
    `;

    const result = await model.generateContent(prompt);
    const json = JSON.parse(result.response.text());
    
   let reaction;
   try {
    reaction = JSON.parse(result.response.text());
   } catch (err) {
    console.error("Failed to parse API response:", err);
    reaction = {
        mood: "confused",
        quote: "Blast! What is this nonsense?"
    };

    // Show Stewie's face
    showStewie(reaction.mood, reaction.quote)
   }
}

function showStewie(mood, quote) {
    // If an image of stewie is already there, remove it
    const oldStewie = document.getElementById("Stewie-container");
    if (old) old.remove()

    // Container 
    const container = document.createElement("div");
    container.id="Stewie-container";
    container.style.position = "fixed";
    container.style.bottom = "20px";
    container.style.right = "20px";
    container.style.zIndex = "9999";
    container.style.textAlign = "center";

    // Image
    const image = document.createElement("img");
    img.src = chrome.runtime.getURL(`$images/$(mood).png`);
    img.style.width = "256px"

    // Speech buble
    const bubble = document.createElement("div");
    bubble.innerText = quote;
    bubble.style.background = "red";
    bubble.style.padding = "10px";
    bubble.style.borderRadius = "11px";
    bubble.style.marginTop = "8px";
    bubble.style.maxWidth = "200px";
    bubble.style.fontFamily = "Comic Sans MS, sans-serif";
    bubble.style.fontSize = "14px";

    container.appendChild(image);
    container.appendChild(bubble);
    document.body.appendChild(container);

    // Speak whats being said in the speech bubble
    speakieStewie(quote);

    // Remove stewie's appearance after 7 seconds
    setTimeout(() => container.remove(), 5000);
}

function speakStewie(quote) {
    const utterance = new SpeechSynthesisUtterance(quote);
    utterance.lang = "en-GB"
    utterance.rate = 1;
    utterance.pitch = 0.2

    window.speechSynthesis.speak(utterance);
}