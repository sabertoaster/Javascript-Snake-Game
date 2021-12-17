import {
    fruitEaten_Score,
    lastSnakeColor,
    SNAKE_SPEED
} from './snake.js'
import {
    highscore
} from './game.js'
var scoreBoard = document.querySelector("#score-board")
var controlPanel = document.querySelector("#control-panel")
let menuBoard = document.querySelector("#menu-board")
let menuNotif = document.querySelector("#menu-notification")
let menuSubNotif = document.querySelector("#menu-sub-notification")
let score
var oldHighScore = sessionStorage.getItem("oldHighScore");
    sessionStorage.setItem("oldHighScore", sessionStorage.getItem("highscore"));
    console.log(sessionStorage.getItem("highscore"),oldHighScore);
export function update() {
    score = SNAKE_SPEED - 4;
    scoreBoard.style.backgroundColor = lastSnakeColor;
    scoreBoard.innerHTML = fruitEaten_Score;
    controlPanel.innerHTML = "<div>Current Speed:</div><div>" + score + "</div>"
}
export function menuPopup(notif) {
    menuNotif.innerHTML = notif;
    displayHighestScore();
    menuBoard.style.opacity = "1";
    menuBoard.style.zIndex = "1";
    if (notif == "Paused") {
        // btn1.removeEventListener("onclick",document.location.reload())
        // btn1.addEventListener("onclick",togglePause(false))
        menuBoard.innerHTML = menuBoard.innerHTML.replace('Restart', 'Continue')
    }
    if (notif == "LOSE!!!!!") {
        menuBoard.innerHTML = menuBoard.innerHTML.replace('Paused', "LOSE!!!!!")
        // btn1.addEventListener("onclick",document.location.reload())
        // btn1.removeEventListener("onclick",togglePause(false))
        menuBoard.innerHTML = menuBoard.innerHTML.replace('Continue', 'Restart')
    }
}

export function menuHidedown() {
    menuBoard.style.opacity = "0";
    menuBoard.style.zIndex = "-1";
}

export function displayHighestScore() {
    // if (fruitEaten_Score > oldHighScore) {
    //     menuSubNotif.innerHTML = "NEW HIGHSCORE!!! : " + highscore;
    // } else {
    menuSubNotif.innerHTML = "Current highscore is: " + highscore;
    // }
}
