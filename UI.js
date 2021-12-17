import {
    fruitEaten_Score,
    lastSnakeColor,
    SNAKE_SPEED
} from './snake.js'
var scoreBoard = document.querySelector("#score-board")
var controlPanel = document.querySelector("#control-panel")
let menuBoard = document.querySelector("#menu-board")
let score

export function update() {
    score = SNAKE_SPEED - 4;
    scoreBoard.style.backgroundColor = lastSnakeColor;
    scoreBoard.innerHTML = fruitEaten_Score;
    controlPanel.innerHTML = "<div>Current Speed:</div><div>" + score + "</div>"
}
export function menuPopup() {
    menuBoard.style.opacity = "1";
    // setTimeout(() => {
    //     menuBoard.style.display = "block";
    // }, 1000);
}