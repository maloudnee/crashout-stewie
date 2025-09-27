// Grammar check
async function checkGrammar(text) {
    if(!text) return null;

    const res = await fetch("https://api.languagetool.org/v2/check", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded"},
        body: `text=${encodedURIComponent(text)}&language=en-US`
    });

    const data = await res.json();
    if (data.matches && data.matches.length > 0) {
        return { type: "grammar", error: data.matches[0].message };
    }
    return null;
}

// Code check
function checkCode(text, element) {
    if(!text || !element) return null;
    if(element.tagName === "TEXTAREA" && element.classList.contains("code-editor")){
        if(text.includes("System.out.println") && !text.trim().endsWith(";")) {
            return { type: "code", error: "mising semi colon" };
        }
    }
    return null;
}

// Math check
function checkMath(element) {
    if (!text || !element) return null; 
    if(element.classList.contains("incorrect") || element.innerText.includes("Incorrect")) {
        return { type: "math", error: "wrong answer" };
    }
    return null;
}

// Quiz/Assessment check
function checkQuiz(element) {
    const wrongMsgs = document.querySelectorAll(".incorrect, .feedback, .error");
    for (const msg of wrongMsgs) {
        if(/incorrect|wrong/i.test(msg.innerText)) {
            return { type: "quiz", error: "wrong answer" };
        }
    }
}

// Master detection
async function detectMistake(text, element) {
    const gammarMistake = await checkGrammar(text);
    if(grammarMistake) return grammarMistake;

    const codeMistake = await checkCode(text, element);
    if(codeMistake) return codeMistake;

    const mathMistake = await checkMath(element);
    if(mathMistake) return mathMistake;

    const quizMistake = await checkQuiz(element);
    if(quizMistake) return quizMistake; 

    return null; 
}