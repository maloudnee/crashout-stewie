import { detectMistake } from "./detectors.js";
import { getStewiesReaction } from "./reactions.js";

// Watch input text in all text areas
document.addEventListener("input", async(e) => {
    const target = e.target;

    if (target.tagName == "INPUT" || target.tagName == "TEXTAREA") {
        const text = target.value;

        // Check for mistakes
        const mistake = await detectMistake(text);

        // Activate stewie if mistakes are found
        if(mistake) {
            chrome.runtime.sendMessage(
                { type: "getStewiesReaction", mistake },
                (reaction) => {
                    if (reaction) {
                        showStewie(reaction.mood, reaction.quote);
                    }
                }

            );
        }
    }
        
});