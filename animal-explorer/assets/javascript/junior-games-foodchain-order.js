// ======================================
// FOOD CHAINS
// ======================================

const foodChains = [

{
    title: "Food Chain 1 of 4",

    stages: [
        "Grass",
        "Deer",
        "Lion"
    ]
},

{
    title: "Food Chain 2 of 4",

    stages: [
        "Leaves",
        "Caterpillar",
        "Bird",
        "Eagle"
    ]
},

{
    title: "Food Chain 3 of 4",

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

    stages: [
        "Water Plants",
        "Small Fish",
        "Shark"
    ]
}

];


// ======================================
// SELECT ELEMENTS
// ======================================

const chainTitle = document.getElementById("chainTitle");

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

let currentChain = 0;

let score = 0;

let draggedItem = null;


// ======================================
// LOAD A FOOD CHAIN
// ======================================

function loadChain(index){

    dragContainer.innerHTML = "";

    nextButton.style.display = "none";

    chainTitle.textContent =
    foodChains[index].title;

    const stages =
    [...foodChains[index].stages];

    const shuffled =
    [...stages].sort(() => Math.random() - 0.5);


    orderBoxes.forEach((box,i)=>{

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


    shuffled.forEach(stage=>{

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

    dragItems.forEach(item=>{

        item.addEventListener("dragstart",function(){

            draggedItem = this;

        });

    });

}


// ======================================
// DROP EVENTS
// ======================================

orderBoxes.forEach(box=>{

    box.addEventListener("dragover",function(e){

        e.preventDefault();

        this.classList.add("drag-over");

    });


    box.addEventListener("dragleave",function(){

        this.classList.remove("drag-over");

    });


    box.addEventListener("drop",function(e){

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

            const totalStages = foodChains.reduce(
    (total, chain) => total + chain.stages.length,
    0
);

scoreBoard.textContent =
"Score : " + score + " / " + totalStages;

            const completed =
            document.querySelectorAll(".order-box.correct").length;

            if(completed === foodChains[currentChain].stages.length){

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

nextButton.addEventListener("click",function(){

    currentChain++;

    if(currentChain < foodChains.length){

        loadChain(currentChain);

    }

    else{

        message.textContent =
        "🎉 Excellent! You completed all the Food Chains!";

        nextButton.style.display = "none";

        winSound.play();

    }

});


// ======================================
// START GAME
// ======================================

loadChain(currentChain);
// Wrong Answer
function showAlert(message) {
    document.getElementById("alertText").textContent = message;
    document.getElementById("customAlert").style.display = "flex";
}

function closeAlert() {
    document.getElementById("customAlert").style.display = "none";
}