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

let draggedItem = null;
let score = 0;

// ==========================
// SHUFFLE THE WORDS
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
// DRAG START
// ==========================

dragItems.forEach(item => {

    item.addEventListener("dragstart", function () {

        draggedItem = this;

    });

});

// ==========================
// DROP ZONES
// ==========================

dropZones.forEach(zone => {

    zone.addEventListener("dragover", function (e) {

        e.preventDefault();

    });

    zone.addEventListener("drop", function (e) {

        e.preventDefault();

        // Prevent replacing a correct answer
        if (this.classList.contains("correct")) {
            return;
        }

        if (draggedItem.dataset.name === this.dataset.answer) {

            this.textContent = draggedItem.textContent;

            this.classList.add("correct");

            draggedItem.remove();

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

        }

    });

});
// Wrong Answer
function showAlert(message) {
    document.getElementById("alertText").textContent = message;
    document.getElementById("customAlert").style.display = "flex";
}

function closeAlert() {
    document.getElementById("customAlert").style.display = "none";
}
