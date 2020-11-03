var questions = [
    {
        title: "when describing an array, what is the 'i' in (var i=0) short for?",
        choices: ["interval", "intigrate", "integer", "if"],
        answer: "integer"
    },
    {
        title: "What are the 2 items Brian asks us to do before we start class everyday?",
        choices: ["say present and download the homework", "mark yourself here in bootcamp spot and do a git pull", "go to the bathroom and get coffee", "10 jumping jacks and 15 sit ups"],
        answer: "mark yourself here in bootcamp spot and do a git pull"
    },
    {
        title: "A boolean value is ____.",
        choices: ["either right and wrong", "has a grey area", "either true or false", "all of the above"],
        answer: "either true or false"
    },
    {
        title: "When using a sticky footer, the position should be set to ____.",
        choices: ["relative", "absolute", "auto", "500px"],
        answer: "absolute"
    },
    {
        title: "The small icon at the top of a browser tab for any given site is called a _____.",
        choices: ["favicon", "flavor icon", "small icon", "bookmark icon"],
        answer: "favicon"
    },

];

var score = 0;
var questionIndex = 0;

var clock = document.querySelector("#clock");
var timer = document.querySelector("#startButton");
var questionSection = document.querySelector("#questionSection");
var box = document.querySelector("#box");


var secondsLeft = 60;
var holdInterval = 0;
var penalty = 8;
var ulCreate = document.createElement("ul");

timer.addEventListener("click", function () {
        if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            clock.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                clock.textContent = "Time has run out!";
            }
        }, 1000);
    }
    render(questionIndex);
});

function render(questionIndex) {
    questionSection.innerHTML = "";
    ulCreate.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionSection.textContent = userQuestion;
    }
    
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionSection.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct!";
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer was:  " + questions[questionIndex].answer;
        }

    }
    
    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "Your score  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionSection.appendChild(createDiv);

}

function allDone() {
    questionSection.innerHTML = "";
    clock.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionSection.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionSection.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionSection.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionSection.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionSection.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "Submit";

    questionSection.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("highscore.html");
        }
    });

}
