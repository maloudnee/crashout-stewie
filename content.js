import { detectMistake } from "./detectors.js";
import { getStewiesReaction } from "./reactions.js";

// Watch input text in all text areas
function watchInputs() {
    document.addEventListener("input", async(e) => {
        const target = e.target;

        if (target.tagName == "INPUT" || target.tagArea == "TEXTAREA") {
            const text = target.value;

            // Check for mistakes
            const mistake = await detectMistake(text);

            // Activate stewie if mistakes are found
            for (const mistake of mistakes) {
                await getStewiesReaction(mistake);
            }
        }
            
    });
}