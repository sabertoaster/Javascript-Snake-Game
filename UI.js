import {
    fruitEaten_Score,
    lastSnakeColor,
    SNAKE_SPEED
} from './snake.js'
import {
    togglePause
} from './game.js'
var scoreBoard = document.querySelector("#score-board")
var controlPanel = document.querySelector("#control-panel")
let menuBoard = document.querySelector("#menu-board")
let menuNotif = document.querySelector("#menu-notification")
let score

export function update() {
    score = SNAKE_SPEED - 4;
    scoreBoard.style.backgroundColor = lastSnakeColor;
    scoreBoard.innerHTML = fruitEaten_Score;
    controlPanel.innerHTML = "<div>Current Speed:</div><div>" + score + "</div>"
}
export function menuPopup(notif) {
    menuNotif.innerHTML = notif;
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