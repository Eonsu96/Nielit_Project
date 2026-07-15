//===== QUIZ FUNCTION =====
function checkQuiz() {
    let score = 0;

    // Correct answers
    if (document.getElementById("q1c").checked) {
        score++;
    }
    if (document.getElementById("q2c").checked) {
        score++;
    }
    if (document.getElementById("q3b").checked) {
        score++;
    }

    alert("Your score is: " + score + " out of 3");
}

// ===== TRUE / FALSE FUNCTION =====
function checkTrueFalse() {
    let correct = 0;

    // Correct statements: 1 and 3
    if (document.getElementById("q1").checked) {
        correct++;
    }
    if (document.getElementById("q3").checked) {
        correct++;
    }

    alert("You marked " + correct + " correct statements.");
}
