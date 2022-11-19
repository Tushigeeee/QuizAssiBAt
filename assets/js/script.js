

var timerElement = document.getElementById("time-remaining");  //navigation bar 
var timerView = document.getElementById("timer");
var highScoreView = document.querySelector("#highscores");
var startButton = document.getElementById("start-quiz");

var mainElement = document.querySelector("#main-content"); //main content
var messageElement = document.querySelector("h1");
var textElement = document.querySelector("p");

var choicesListElement = document.getElementById("choices-list");   //questions choices
var indicatorElement = document.getElementById("indicator");

var formElement = document.createElement("div");
var highscoresElement = document.createElement("div");              //creating highscore section
var textInputElement = document.createElement("input"); 

//  creating buttons
var formButton = document.createElement("button");     
var backButton = document.createElement("button");
var clearButton = document.createElement("button");


var highscore = {  
    initials: "",
    score: 0,
};
var highscores = [];  
var secondsLeft;
var timerInterval;


// questions and choices
var questions = [   
    {
        question: "Commonly used data types DO Not include:",
        choices: [
        "A. strings", 
        "B. booleans", 
        "C. alert", 
        "D. numbers"],
        answer: 2,
    },

    {
        question: "The condition in an if/else statement is enclosed with______.",
        choices: [
            "A. quotes",
            "B. curly brackets",
            "C. parenthesis",
            "d. squire barckets",
        ],
        answer: 2,
    },

    {
        question:
            "Array in JavScript can be used to store ________.",
        choices: [
            "A. numbers and string",
            "B. other arrays",
            "C. booleans",
            "D. all of the above"
        ],
        answer: 3,
    },
    {
        question: "String values must be enclosed whitin ______ when being assigned to variables.",
        choices: [
            "A. commas",
            "B. curly brackets",
            "C. quotes",
            "D. parenthesis"
        ],
        answer: 2,
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: [
            "A. JavaScript",
            "B. terminal/bash",
            "C. for loops",
            "D. console.log",
        ],
        answer: 3,
    },
];


// Functions
init();

function init() {
    score = 0;
    secondsLeft = 10;          //timer 10 second 
}

function startQuiz() {           //when starting quiz timer start
    startButton.remove();
    textElement.remove();
    timerInterval = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = secondsLeft;

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
        }
    }, 1000);

    renderQuiz();
}

//rendering question and appending answers 
function renderQuiz(questionNumber) {
    questionNumber = questionNumber || 0;
    var questionItem = questions[questionNumber];
    messageElement.textContent = questionItem.question;

    var newChoices = document.createElement("div");
    choicesListElement.appendChild(newChoices);

    for (var i = 0; i < questionItem.choices.length; i++) {
        var choice = questionItem.choices[i];

        var li = document.createElement("li");
        li.setAttribute("data-index", i);
        li.textContent = choice;
        newChoices.appendChild(li);


        // when choose answer shows correct or wrong 
        li.addEventListener("click", function (event) {
            if (
                questionItem.answer ===
                parseInt(event.target.getAttribute("data-index"))
            ) {
                score += 10;
                indicatorElement.innerHTML = "<hr> CORRECT!";
                indicatorElement.setAttribute("style", "color: green");
            } else {
                secondsLeft -= 10;
                indicatorElement.innerHTML = "<hr> WRONG!";
                indicatorElement.setAttribute("style", "color: red");
            }

            // final section showing final score and  creating message "all done" 
            questionNumber++;

            if (questionNumber === questions.length) {
                clearInterval(timerInterval);
                indicatorElement.textContent = "";
                newChoices.remove();
                messageElement.textContent = "All done !";
                messageElement.appendChild(textElement);
                textElement.textContent = "Your final score is: " + score;

                renderForm();
            } else {
                setTimeout(function () {
                    renderQuiz(questionNumber);
                    newChoices.remove();
                    indicatorElement.textContent = "";
                }, 1000);
            }
        });
    }
}

// submit form function
function renderForm() {
    formElement.textContent = "ENTER NAME: ";
    formElement.setAttribute("style", "color: white");
    formButton.textContent = "SUBMIT";
    mainElement.appendChild(formElement);
    formElement.appendChild(textInputElement);
    formElement.appendChild(formButton);
}

function submitHighscore() {
    var initialInput = document.querySelector("input").value;
    highscore.initials = initialInput;
    highscore.score = score;
    console.log(highscore);
    localStorage.setItem("highscore", JSON.stringify(highscore));     //highscore localstorage
    mainElement.innerHTML = "";
    highScoreView.textContent = "";
    timerView.textContent = "";

    renderHighscores();
}
// rendering highscore 
function renderHighscores() {
    var storedHighscore = JSON.parse(localStorage.getItem("highscore"));
    console.log(storedHighscore);
    messageElement.innerHTML = "Highscores";
    messageElement.setAttribute("style", "color: red");
    mainElement.appendChild(messageElement);
    console.log(storedHighscore.initials);
    console.log(storedHighscore.score);
    highscoresElement.setAttribute("class", "highscore-element");
    highscoresElement.textContent = `${storedHighscore.initials} - ${storedHighscore.score}`;
    messageElement.appendChild(highscoresElement);
    backButton.textContent = "Home";
    clearButton.textContent = "Clear";
    mainElement.appendChild(backButton);          //appending back and clear buttons
    mainElement.appendChild(clearButton);
}

function clear() {
    highscoresElement.remove();  //removing high score when click clear button
}

function home() {
    location.reload();        //reloding page when click home button
}

highScoreView.addEventListener("click", function () {  //click event for button
    textElement.remove();
    startButton.remove();
    renderHighscores();
});
// buttons

startButton.addEventListener("click", startQuiz);
formButton.addEventListener("click", submitHighscore);
backButton.addEventListener("click", home);
clearButton.addEventListener("click", clear);
