// ======================================
// LIFE CYCLES
// ======================================

const gameSets = [

{
    title: "Life Cycle 1 of 5",

    stages: [
        "Egg",
        "Caterpillar",
        "Chrysalis",
        "Butterfly"
    ]
},

{
    title: "Life Cycle 2 of 5",

    stages: [
        "Egg",
        "Tadpole",
        "Froglet",
        "Adult Frog"
    ]
},

{
    title: "Life Cycle 3 of 5",

    stages: [
        "Egg",
        "Chick",
        "Adult Chicken"
    ]
},

{
    title: "Life Cycle 4 of 5",

    stages: [
        "Kitten",
        "Young Cat",
        "Adult Cat"
    ]
},

{
    title: "Life Cycle 5 of 5",

    stages: [
        "Calf",
        "Young Elephant",
        "Adult Elephant"
    ]
}

];


// ======================================
// SELECT ELEMENTS
// ======================================

const gameTitle =
document.getElementById("gameTitle");

const dragContainer =
document.getElementById("dragContainer");

const sequenceRows =
document.querySelectorAll(".sequence-row");

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


// ======================================
// VARIABLES
// ======================================

let currentGame = 0;

let score = 0;

let selectedItem = null;

const totalStages =
gameSets.reduce(

    (total, game) => total + game.stages.length,

    0

);

scoreBoard.textContent =
"Score : 0 / " + totalStages;


// ======================================
// SHUFFLE FUNCTION
// ======================================

function shuffle(array){

    for(let i = array.length - 1; i > 0; i--){

        const j =
        Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
        [array[j], array[i]];

    }

    return array;

}


// ======================================
// LOAD GAME
// ======================================

function loadGame(index){

    selectedItem = null;

    dragContainer.innerHTML = "";

    nextButton.style.display = "none";

    gameTitle.textContent =
    gameSets[index].title;

    const stages =
    [...gameSets[index].stages];

    const shuffled =
    shuffle([...stages]);


    // -----------------------------
    // RESET SLOTS
    // -----------------------------

    sequenceRows.forEach((row, i)=>{

        const slot =
        row.querySelector(".sequence-slot");

        slot.textContent = "Drop Here";

        slot.classList.remove("correct");

        slot.dataset.answer = "";

        if(i < stages.length){

            row.style.display = "flex";

            slot.dataset.answer =
            stages[i];

        }

        else{

            row.style.display = "none";

        }

    });


    // -----------------------------
    // CREATE STAGE CARDS
    // -----------------------------

    shuffled.forEach(stage=>{

        const item =
        document.createElement("div");

        item.className =
        "drag-item";

        item.dataset.name =
        stage;

        item.textContent =
        stage;

        dragContainer.appendChild(item);

    });

    setupGame();

}
// ======================================
// GAME LOGIC
// ======================================

function setupGame(){

    const dragItems =
    document.querySelectorAll(".drag-item");


    // -----------------------------
    // SELECT A STAGE
    // -----------------------------

    dragItems.forEach(item=>{

        item.addEventListener("click",function(){

            dragItems.forEach(card=>{

                card.classList.remove("selected");

            });

            selectedItem = this;

            this.classList.add("selected");

        });

    });


    // -----------------------------
    // CLICK A SLOT
    // -----------------------------

    sequenceSlots.forEach(slot=>{

        slot.onclick = function(){

            if(!selectedItem) return;

            if(this.classList.contains("correct")) return;

            if(
                selectedItem.dataset.name ===
                this.dataset.answer
            ){

                this.textContent =
                selectedItem.textContent;

                this.classList.add("correct");

                selectedItem.remove();

                selectedItem = null;

                correctSound.currentTime = 0;
                correctSound.play();

                score++;

                scoreBoard.textContent =
                "Score : " +
                score +
                " / " +
                totalStages;


                const visibleSlots =
                [...sequenceSlots].filter(slot=>
                    slot.parentElement.style.display !== "none"
                );

                const completed =
                visibleSlots.every(slot=>
                    slot.classList.contains("correct")
                );


                if(completed){

                    nextButton.style.display =
                    "inline-block";

                }

            }

            else{

                wrongSound.currentTime = 0;
                wrongSound.play();

                showAlert("✖️ Oops! Try Again!");

            }

        };

    });

}


// ======================================
// NEXT BUTTON
// ======================================

nextButton.addEventListener("click",function(){

    currentGame++;

    if(currentGame < gameSets.length){

        loadGame(currentGame);

    }

    else{

        message.textContent =
        "🎉 Excellent! You completed all the Life Cycles!";

        nextButton.style.display =
        "none";

        winSound.play();

    }

});


// ======================================
// CUSTOM ALERT
// ======================================

function showAlert(message){

    document.getElementById("alertText").textContent =
    message;

    document.getElementById("customAlert").style.display =
    "flex";

}

function closeAlert(){

    document.getElementById("customAlert").style.display =
    "none";

}


// ======================================
// START GAME
// ======================================

loadGame(currentGame);