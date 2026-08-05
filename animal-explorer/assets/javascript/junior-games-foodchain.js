// FOOD CHAINS
const foodChains = [

{
    title: "Food Chain 1 of 4",

    labels: [
        "Primary Producer",
        "Primary Consumer",
        "Secondary Consumer",
        "Tertiary Consumer",
        "Apex Predator"
    ],

    stages: [
        "Grass",
        "Deer",
        "Lion"
    ]
},

{
    title: "Food Chain 2 of 4",

    labels: [
        "Primary Producer",
        "Primary Consumer",
        "Secondary Consumer",
        "Tertiary Consumer",
        "Apex Predator"
    ],

    stages: [
        "Leaves",
        "Caterpillar",
        "Bird",
        "Eagle"
    ]
},

{
    title: "Food Chain 3 of 4",

    labels: [
        "Primary Producer",
        "Primary Consumer",
        "Secondary Consumer",
        "Tertiary Consumer",
        "Apex Predator"
    ],

    stages: [
        "Grass",
        "Grasshopper",
        "Frog",
        "Snake",
        "Eagle"
    ]
},

{
    title: "Food Chain 4 of 4",

    labels: [
        "Primary Producer",
        "Primary Consumer",
        "Secondary Consumer",
        "Tertiary Consumer",
        "Apex Predator"
    ],

    stages: [
        "Water Plants",
        "Small Fish",
        "Shark"
    ]
}

];

// SELECT ELEMENTS
const gameTitle = document.getElementById("gameTitle");

const dragContainer = document.getElementById("dragContainer");

const sequenceLabels =
document.querySelectorAll(".sequence-label");

const sequenceSlots =
document.querySelectorAll(".sequence-slot");

const scoreBoard =
document.getElementById("score");

const nextButton =
document.getElementById("nextButton");

const message =
document.getElementById("message");

const correctSound =
document.getElementById("correctSound");

const wrongSound =
document.getElementById("wrongSound");

const winSound =
document.getElementById("winSound");

// VARIABLES
let currentGame = 0;

let score = 0;

let selectedItem = null;

// TOTAL SCORE
const totalStages =
foodChains.reduce(

(total, chain) => total + chain.stages.length,

0

);

scoreBoard.textContent =
"Score : 0 / " + totalStages;

// LOAD GAME
function loadGame(index){

    dragContainer.innerHTML = "";

    nextButton.style.display = "none";

    message.textContent = "";

    selectedItem = null;

    const game = foodChains[index];

    gameTitle.textContent = game.title;

    // Labels
    sequenceLabels.forEach((label, i) => {

        if(i < game.labels.length){

            label.textContent = game.labels[i];

            label.parentElement.style.display = "flex";

        }

        else{

            label.parentElement.style.display = "none";

        }

    });

    //Slots
    sequenceSlots.forEach((slot, i) => {

        slot.classList.remove("correct");

        slot.textContent = "Drop Here";

        slot.dataset.answer = game.stages[i] || "";

        if(i < game.labels.length){

            slot.parentElement.style.display = "flex";

        }

        else{

            slot.parentElement.style.display = "none";

        }

    });

    //Shuffle
    const shuffled =
    [...game.stages].sort(() => Math.random() - 0.5);

    //Create Stage Cards
    shuffled.forEach(stage => {

        const item =
        document.createElement("div");

        item.className = "drag-item";

        item.textContent = stage;

        item.addEventListener("click", function(){

            document
            .querySelectorAll(".drag-item")
            .forEach(card => {

                card.classList.remove("selected");

            });

            selectedItem = this;

            this.classList.add("selected");

        });

        dragContainer.appendChild(item);

    });

}

// SLOT CLICK EVENTS
sequenceSlots.forEach(slot => {

    slot.addEventListener("click", function(){

        if(!selectedItem) return;

        if(this.classList.contains("correct")) return;

        if(selectedItem.textContent === this.dataset.answer){

            this.textContent = selectedItem.textContent;

            this.classList.add("correct");

            correctSound.currentTime = 0;
            correctSound.play();

            selectedItem.remove();

            selectedItem = null;

            score++;

            scoreBoard.textContent =
            "Score : " + score + " / " + totalStages;


            // Check whether current food chain is complete

            const currentStages =
            foodChains[currentGame].stages.length;

            let completed = 0;

            sequenceSlots.forEach((box, index) => {

                if(index < currentStages &&
                   box.classList.contains("correct")){

                    completed++;

                }

            });


            if(completed === currentStages){

                if(currentGame < foodChains.length - 1){

                    nextButton.style.display = "inline-block";

                }

                else{

                    message.textContent =
                    "🎉 Excellent! You completed all the Food Chains!";

                    winSound.play();

                }

            }

        }

        else{

            wrongSound.currentTime = 0;
            wrongSound.play();

            showAlert("✖️ Oops! Try Again!");

        }

    });

});

// NEXT BUTTON
nextButton.addEventListener("click", function(){

    currentGame++;

    loadGame(currentGame);

});

// ALERT FUNCTIONS
function showAlert(text){

    document.getElementById("alertText").textContent = text;

    document.getElementById("customAlert").style.display = "flex";

}

function closeAlert(){

    document.getElementById("customAlert").style.display = "none";

}

// START GAME
loadGame(currentGame);