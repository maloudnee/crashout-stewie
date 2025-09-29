// if (typeof chrome === "undefined" || !chrome.runtime) {
//     console.error("❌ Not running as a Chrome extension (chrome.runtime is undefined).");
//   } else {
//     console.log("✅ Running inside Chrome extension context.");
//   }

// Watch input text in all text areas
document.addEventListener("input", async(e) => {
    console.log("Content script running");
    const target = e.target;

    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
        const text = target.value;
        console.log("Input text:", text);

        try {
            // Check for mistakes
            const mistake = await detectMistake(text);

            // Activate stewie if mistakes are found
            if(mistake) {
                console.log("Mistake detected:", mistake);
                chrome.runtime.sendMessage(
                    { 
                        type: "getStewiesReaction", 
                        details: mistake.error
                    },
                    (response) => {
                        if (chrome.runtime.lastError) {
                            console.warn("Message failed:", chrome.runtime.lastError)
                        } else {
                            console.log("Stewie response:", response);
                            if (response && response.mood && response.quote) {
                                showStewie(response.mood, response.quote);
                            }
                        }
                    }

                );
            }
        } catch (err) {
            console.error("Detection failed:", err);
        }
    }
});