import {
  getInputDirection
} from "./input.js"
import {
  GRID_SIZE
} from './grid.js'

export var SNAKE_SPEED = 5 //speed of the snake
const snakeBody = [{
  color: "blue",
  x: Math.floor(GRID_SIZE / 2),
  y: Math.floor(GRID_SIZE / 2),
}] //snake initialization
let newSegments = 0
export var lastSnakeColor;
export var fruitEaten_Score=0;
export function update() {
  addSegments()
  const inputDirection = getInputDirection()
  for (let i = snakeBody.length - 1; i > 0; i--) {
    let tempx = snakeBody[i - 1].x
    let tempy = snakeBody[i - 1].y
    snakeBody[i].x = tempx;
    snakeBody[i].y = tempy;
  }
  if (snakeBody.length > 1) {
    snakeBody[snakeBody.length - 1].color = lastSnakeColor;
  }
  snakeBody[0].x += inputDirection.x
  snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
  snakeBody.forEach((segment, index) => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart = segment.x
    // console.log(snakeBody[0].color)
    snakeElement.style.backgroundColor = segment.color;
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement)
  })
}

export function expandSnake(amount) {
  newSegments += amount
}

export function onSnake(position, {ignoreHead = false} = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) {
      return false
    } else {
      
      return equalPositions(segment, position)
    }
  })
}
export function onSnakeButColor(color) {
  lastSnakeColor = color;
  fruitEaten_Score += 1;
  SNAKE_SPEED +=0.25;
}

export function getSnakeHead() {
  return snakeBody[0]
}

export function snakeIntersection() {
  return onSnake(snakeBody[0], {
    ignoreHead: true
  })
}

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({
      ...snakeBody[snakeBody.length]
    })
  }
  newSegments = 0
}