import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { update as updateScore, menuPopup} from './UI.js'
import { outsideGrid, GRID_SIZE } from './grid.js'

let lastRenderTime = 0
let gameOver = false

const gameBoard = document.getElementById('game-board')
gameBoard.style.gridTemplateColumns = "repeat(" + GRID_SIZE + ", 1fr)"
gameBoard.style.gridTemplateRows = "repeat(" + GRID_SIZE + ", 1fr)"
function main(currentTime) {
  if (gameOver) {
    menuPopup();
    // if (alert('Lose!')) {
    //   window.location = '/'
    // }
    return
  }

  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  
  lastRenderTime = currentTime
  
  update()
  draw()
}

window.requestAnimationFrame(main)

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