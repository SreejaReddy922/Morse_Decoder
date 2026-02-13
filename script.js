// ===============================
// MORSE DICTIONARY
// ===============================
const morseCode = {
    A: ".-", B: "-...", C: "-.-.", D: "-..",
    E: ".", F: "..-.", G: "--.", H: "....",
    I: "..", J: ".---", K: "-.-", L: ".-..",
    M: "--", N: "-.", O: "---", P: ".--.",
    Q: "--.-", R: ".-.", S: "...", T: "-",
    U: "..-", V: "...-", W: ".--", X: "-..-",
    Y: "-.--", Z: "--..",
    0: "-----", 1: ".----", 2: "..---", 3: "...--",
    4: "....-", 5: ".....", 6: "-....", 7: "--...",
    8: "---..", 9: "----.",
    " ": "/"
};

// ===============================
// TEXT → MORSE
// ===============================
function textToMorse() {
    let input = document.getElementById("inputText").value.toUpperCase();

    let result = input.split("").map(char => {
        return morseCode[char] || "";
    }).join(" ");

    document.getElementById("output").innerText = result;
}

// ===============================
// MORSE → TEXT
// ===============================
function morseToText() {

    const reverseMorse = Object.fromEntries(
        Object.entries(morseCode).map(([key, value]) => [value, key])
    );

    let input = document.getElementById("inputText").value.trim();
    let result = input.split(" ").map(code => {
        return reverseMorse[code] || "";
    }).join("").replace(/\//g, " ");

    document.getElementById("output").innerText = result;
}

// ===============================
// PLAY MORSE SOUND
// ===============================
function playMorseSound() {

    const output = document.getElementById("output").innerText;
    if (!output) return;

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const dotDuration = 0.1;
    const dashDuration = 0.3;
    const frequency = 600;

    let time = audioContext.currentTime;

    output.split("").forEach(symbol => {

        if (symbol === "." || symbol === "-") {

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.frequency.value = frequency;
            oscillator.type = "sine";

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start(time);

            if (symbol === ".") {
                oscillator.stop(time + dotDuration);
                time += dotDuration;
            } else {
                oscillator.stop(time + dashDuration);
                time += dashDuration;
            }

            time += 0.1;

        } else if (symbol === " ") {
            time += 0.2;
        } else if (symbol === "/") {
            time += 0.5;
        }

    });
}

// ===============================
// CLEAR FUNCTION
// ===============================
function clearFields() {
    document.getElementById("inputText").value = "";
    document.getElementById("output").innerText = "";
}
// Create AudioContext globally
let audioContext = null;

function playMorseSound() {

    const output = document.getElementById("output").innerText;
    if (!output) {
        alert("No Morse code to play!");
        return;
    }

    // Create AudioContext only after user clicks
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Resume if browser suspended it
    if (audioContext.state === "suspended") {
        audioContext.resume();
    }

    const dotDuration = 0.1;   // 100ms
    const dashDuration = 0.3;  // 300ms
    const frequency = 600;

    let time = audioContext.currentTime;

    for (let symbol of output) {

        if (symbol === "." || symbol === "-") {

            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.frequency.value = frequency;
            oscillator.type = "sine";

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.start(time);

            if (symbol === ".") {
                oscillator.stop(time + dotDuration);
                time += dotDuration;
            } else {
                oscillator.stop(time + dashDuration);
                time += dashDuration;
            }

            time += 0.1; // small gap
        }

        else if (symbol === " ") {
            time += 0.2; // gap between letters
        }

        else if (symbol === "/") {
            time += 0.5; // gap between words
        }
    }
}
