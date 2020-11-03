var highScores = document.querySelector("#highScores");
var reset = document.querySelector("#reset");
var back = document.querySelector("#back");

reset.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScores.appendChild(createLi);
    }
}

back.addEventListener("click", function () {
    window.location.replace("index.html");
});