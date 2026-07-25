// ==========================
// SELECT ELEMENTS
// ==========================

const dragItems = document.querySelectorAll(".drag-item");
const dropZones = document.querySelectorAll(".drop-zone");

const scoreBoard = document.getElementById("score");
const message = document.getElementById("message");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const winSound = document.getElementById("winSound");

let selectedItem = null;
let score = 0;

// ==========================
// SHUFFLE WORDS
// ==========================

const dragContainer = document.querySelector(".drag-container");

function shuffleWords() {

    const words = Array.from(dragContainer.children);

    for (let i = words.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [words[i], words[j]] = [words[j], words[i]];

    }

    words.forEach(word => dragContainer.appendChild(word));

}

shuffleWords();

// ==========================
// SELECT WORD
// ==========================

dragItems.forEach(item => {

    item.addEventListener("click", function () {

        // Remove previous selection
        dragItems.forEach(i => i.classList.remove("selected"));

        // Select this one
        selectedItem = this;
        this.classList.add("selected");

    });

});

// ==========================
// CHECK ANSWER
// ==========================

dropZones.forEach(zone => {

    zone.addEventListener("click", function () {

        if (!selectedItem) {

            showAlert("Select a word first!");

            return;

        }

        if (this.classList.contains("correct")) {

            return;

        }

        if (selectedItem.dataset.name === this.dataset.answer) {

            this.textContent = selectedItem.textContent;

            this.classList.add("correct");

            selectedItem.remove();

            selectedItem = null;

            correctSound.currentTime = 0;
            correctSound.play();

            score++;

            scoreBoard.textContent = "Score : " + score + " / 6";

            if (score === 6) {

                message.textContent = "🎉 Great Job! You matched them all!";

                winSound.play();

            }

        } else {

            wrongSound.currentTime = 0;
            wrongSound.play();

            showAlert("✖️ Oops! Try Again!");

            selectedItem.classList.remove("selected");
            selectedItem = null;

        }

    });

});

// ==========================
// CUSTOM ALERT
// ==========================

function showAlert(text) {

    document.getElementById("alertText").textContent = text;

    document.getElementById("customAlert").style.display = "flex";

}

function closeAlert() {

    document.getElementById("customAlert").style.display = "none";

}

