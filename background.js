import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_API_KEY = "YOUR_KEY_HERE";
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({model: "gemini-1.5-flash"});

let mistakeCount = 0;

chrome.runtime.onMessage.addListener(async (mesage, sender, sendResponse) => {
    if (message.type === "getStewiesReaction") {
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
        
       let reaction;
       try {
        const result = await model.generateContent(prompt);
        const text = await result.respone.text();
        const json = JSON.parse(result.response.text());
        sendResponse(json);
       } catch (err) {
            console.error("AI failed:", err);
            sendResponse({
                mood: "confused",
                quote: "Blast! What is this nonsense?"
            });
        }
        // Keep channel open for async
        return true;
    }
});