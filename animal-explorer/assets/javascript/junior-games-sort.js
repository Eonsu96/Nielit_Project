// ==========================
// SELECT ELEMENTS
// ==========================

const dragItems = document.querySelectorAll(".drag-item");
const dropZones = document.querySelectorAll(".big-zone");

const scoreBoard = document.getElementById("score");
const message = document.getElementById("message");

const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const winSound = document.getElementById("winSound");

let selectedItem = null;
let score = 0;


// ==========================
// SHUFFLE ANIMALS
// ==========================

const dragContainer = document.querySelector(".drag-container");

function shuffleAnimals() {

    const animals = Array.from(dragContainer.children);

    for (let i = animals.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [animals[i], animals[j]] = [animals[j], animals[i]];
    }

    animals.forEach(animal => dragContainer.appendChild(animal));
}

shuffleAnimals();


// ==========================
// SELECT ANIMAL
// ==========================

dragItems.forEach(item => {

    item.addEventListener("click", function () {

        if (this.classList.contains("correct")) return;

        dragItems.forEach(i => i.classList.remove("selected"));

        this.classList.add("selected");

        selectedItem = this;

    });

});


// ==========================
// CLICK CATEGORY
// ==========================

dropZones.forEach(zone => {

    zone.addEventListener("click", function () {

        if (!selectedItem) return;

        const animalGroup = selectedItem.dataset.group;
        const correctGroup = this.dataset.group;

        if (animalGroup === correctGroup) {

            correctSound.currentTime = 0;
            correctSound.play();

            score++;

            scoreBoard.textContent = "Score : " + score + " / 8";

            selectedItem.classList.remove("selected");
            selectedItem.classList.add("correct");

            selectedItem.style.cursor = "default";

            this.appendChild(selectedItem);

            selectedItem = null;

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


// ==========================
// WRONG ANSWER ALERT
// ==========================

function showAlert(message) {

    document.getElementById("alertText").textContent = message;

    document.getElementById("customAlert").style.display = "flex";

}

function closeAlert() {

    document.getElementById("customAlert").style.display = "none";

}