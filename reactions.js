function showStewie(mood, quote) {
    // If an image of stewie is already there, remove it
    const oldStewie = document.getElementById("Stewie-container");
    if (oldStewie) oldStewie.remove()
    console.log("in show stewie function ..");

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
    image.src = chrome.runtime.getURL(`images/${mood}.png`);
    image.style.width = "256px"

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
    if (Math.random() < 0.3) {
        speakStewie(quote);
    }

    // Remove stewie's appearance after 5 seconds
    setTimeout(() => container.remove(), 5000);
}

function speakStewie(quote) {
    console.log("Speaking", quote);
    const utterance = new SpeechSynthesisUtterance(quote);
    utterance.lang = "en-GB"
    utterance.rate = 1;
    utterance.pitch = 0.2;

    window.speechSynthesis.speak(utterance);
}
