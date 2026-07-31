// ======================================
// LIFE CYCLES
// ======================================

const lifeCycles = [

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

const cycleTitle = document.getElementById("cycleTitle");

const dragContainer =
document.getElementById("dragContainer");

const orderBoxes =
document.querySelectorAll(".order-box");

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

let currentCycle = 0;

let score = 0;

let draggedItem = null;


// ======================================
// LOAD A LIFE CYCLE
// ======================================

function loadCycle(index){

    dragContainer.innerHTML = "";

    nextButton.style.display = "none";

    cycleTitle.textContent =
    lifeCycles[index].title;

    const stages =
    [...lifeCycles[index].stages];

    const shuffled =
    [...stages].sort(() => Math.random() - 0.5);


    orderBoxes.forEach((box, i) => {

        box.innerHTML = "Drop Here";

        box.classList.remove("correct");

        if(i < stages.length){

            box.style.display = "flex";

            box.dataset.answer = stages[i];

        }

        else{

            box.style.display = "none";

        }

    });


    shuffled.forEach(stage => {

        const item =
        document.createElement("div");

        item.className = "drag-item";

        item.draggable = true;

        item.textContent = stage;

        dragContainer.appendChild(item);

    });

    addDragEvents();

}
// ======================================
// ADD DRAG EVENTS
// ======================================

function addDragEvents(){

    const dragItems =
    document.querySelectorAll(".drag-item");

    dragItems.forEach(item => {

        item.addEventListener("dragstart", function(){

            draggedItem = this;

        });

    });

}


// ======================================
// DROP EVENTS
// ======================================

orderBoxes.forEach(box => {

    box.addEventListener("dragover", function(e){

        e.preventDefault();

        this.classList.add("drag-over");

    });


    box.addEventListener("dragleave", function(){

        this.classList.remove("drag-over");

    });


    box.addEventListener("drop", function(e){

        e.preventDefault();

        this.classList.remove("drag-over");

        if(!draggedItem) return;

        if(this.classList.contains("correct")) return;


        if(draggedItem.textContent === this.dataset.answer){

            this.textContent = draggedItem.textContent;

            this.classList.add("correct");

            draggedItem.remove();

            correctSound.currentTime = 0;
            correctSound.play();

            score++;

            const totalStages = lifeCycles.reduce(
                (total, cycle) => total + cycle.stages.length,
                0
            );

            scoreBoard.textContent =
            "Score : " + score + " / " + totalStages;

            const completed =
            document.querySelectorAll(".order-box.correct").length;

            if(completed === lifeCycles[currentCycle].stages.length){

                nextButton.style.display = "inline-block";

            }

        }

        else{

            wrongSound.currentTime = 0;
            wrongSound.play();

            showAlert("✖️ Oops! Try Again!");
        }

    });

});


// ======================================
// NEXT BUTTON
// ======================================

nextButton.addEventListener("click", function(){

    currentCycle++;

    if(currentCycle < lifeCycles.length){

        loadCycle(currentCycle);

    }

    else{

        message.textContent =
        "🎉 Excellent! You completed all the Life Cycles!";

        nextButton.style.display = "none";

        winSound.play();

    }

});


// ======================================
// START GAME
// ======================================

const totalStages = lifeCycles.reduce(
    (total, cycle) => total + cycle.stages.length,
    0
);

scoreBoard.textContent =
"Score : 0 / " + totalStages;

loadCycle(currentCycle);
// Wrong Answer
function showAlert(message) {
    document.getElementById("alertText").textContent = message;
    document.getElementById("customAlert").style.display = "flex";
}

function closeAlert() {
    document.getElementById("customAlert").style.display = "none";
}