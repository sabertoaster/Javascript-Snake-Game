import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { update as updateScore, menuPopup, menuHidedown} from './UI.js'
import { outsideGrid, GRID_SIZE } from './grid.js'

let lastRenderTime = 0
let gameOver = false;
let globalId; //pause machine
alert("Dùng phím p để dừng, phím mũi tên để di chuyển")
const gameBoard = document.getElementById('game-board')
gameBoard.style.gridTemplateColumns = "repeat(" + GRID_SIZE + ", 1fr)"
gameBoard.style.gridTemplateRows = "repeat(" + GRID_SIZE + ", 1fr)"
export function main(currentTime) {
  if (gameOver) {
    menuPopup("LOSE!!!!!");
    return
  }
  globalId = window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  
  lastRenderTime = currentTime
  
  update()
  draw()
}
globalId = window.requestAnimationFrame(main) // start the program

function update() {
  updateSnake()
  updateFood()
  updateScore()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

export function togglePause(state) {
  if (state == true) {
    menuPopup("Paused")
    window.cancelAnimationFrame(globalId);
  }
  if (state == false) {
    menuHidedown()
    window.requestAnimationFrame(main);
  }
}