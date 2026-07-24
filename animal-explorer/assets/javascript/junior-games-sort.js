// ==========================
// SELECT ELEMENTS
// ==========================

const dragItems = document.querySelectorAll(".drag-item");
const dropZones = document.querySelectorAll(".big-zone");

const dragContainer = document.querySelector(".drag-container");

const scoreBoard = document.getElementById("score");
const message = document.getElementById("message");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const winSound = document.getElementById("winSound");

let draggedItem = null;
let score = 0;


// ==========================
// SHUFFLE WORDS
// ==========================

function shuffleWords() {

    const items = Array.from(dragContainer.children);

    for (let i = items.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [items[i], items[j]] = [items[j], items[i]];
    }

    items.forEach(item => dragContainer.appendChild(item));

}

shuffleWords();


// ==========================
// DRAG EVENTS
// ==========================

dragItems.forEach(item => {

    item.addEventListener("dragstart", function () {

        draggedItem = this;

    });

});


// ==========================
// DROP EVENTS
// ==========================

dropZones.forEach(zone => {

    zone.addEventListener("dragover", function (e) {

        e.preventDefault();

        this.classList.add("drag-over");

    });


    zone.addEventListener("dragleave", function () {

        this.classList.remove("drag-over");

    });


    zone.addEventListener("drop", function (e) {

        e.preventDefault();

        this.classList.remove("drag-over");

        if (!draggedItem) return;

        const animalGroup = draggedItem.dataset.group;

        const correctGroup = this.dataset.group;


        if (animalGroup === correctGroup) {

            this.appendChild(draggedItem);

            draggedItem.setAttribute("draggable", "false");

            draggedItem.style.cursor = "default";

            correctSound.currentTime = 0;
            correctSound.play();

            score++;

            scoreBoard.textContent = "Score : " + score + " / 8";

            if (score === 8) {

                message.textContent =
                "🎉 Excellent! You sorted all the animals correctly!";

                winSound.play();

            }

        }

        else {

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