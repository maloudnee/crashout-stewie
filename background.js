const GOOGLE_API_KEY = "AIzaSyACSe2bmcXs8g1uET1e_rgJoXsNb06TA_4";

let mistakeCount = 0;

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    console.log("I dont know");
    if (message.type === "getStewiesReaction") {
        try {
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
            Do not choose the mood confused. 
            `;
    
            try {
                const res = await fetch(
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GOOGLE_API_KEY,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            contents : [{ role: "user", parts: [{ text: prompt }] }]
                        })
                    }
                );
    
                const data = await res.json();
    
                // Making gemini's response text output
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
                let reaction;
                try {
                    reaction = JSON.parse(text);
                } catch {
                    reaction = { mood: "confused",  quote: "Im always in catch. " };
                }
    
                console.log("AI raw response:", data);
                console.log("Reaction parsed:", reaction);
    
    
                sendResponse(reaction);
           } catch (err) {
                console.error("AI failed:", err);
                sendResponse({
                    mood: "confused",
                    quote: "WHY AI"
                });
            }
        } catch (err) {
            console.error("AI failed:", err);
            sendResponse({mood: "confused", quote: "Blast! What is this nonsense?"})
        }
    }
    // Keep channel open for async
    return true;
});