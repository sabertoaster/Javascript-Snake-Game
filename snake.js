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
  border_top: "5px solid black",
  border_bot: "5px solid black",
  border_left: "5px solid black",
  border_right: "5px solid black",
}] //snake initialization
let newSegments = 0
export var lastSnakeColor;
export var fruitEaten_Score = 0;
export function update() {
  addSegments()
  const inputDirection = getInputDirection()
  for (let i = snakeBody.length - 1; i > 0; i--) {
    let tempx = snakeBody[i - 1].x
    let tempy = snakeBody[i - 1].y
    snakeBody[i].x = tempx;
    snakeBody[i].y = tempy;
  }
  for (let i = snakeBody.length - 1; i > 1; i--) {
    let temp_border_top = snakeBody[i - 1].border_top
    let temp_border_bot = snakeBody[i - 1].border_bot
    let temp_border_left = snakeBody[i - 1].border_left
    let temp_border_right = snakeBody[i - 1].border_right
    snakeBody[i].border_top = temp_border_top;
    snakeBody[i].border_bot = temp_border_bot;
    snakeBody[i].border_left = temp_border_left;
    snakeBody[i].border_right = temp_border_right;
  }
  if (snakeBody.length > 1) {
    snakeBody[snakeBody.length - 1].color = lastSnakeColor;
  }
  snakeBody[0].border_top = "0.5vmin solid black"
  snakeBody[0].border_bot = "0.5vmin solid black"
  snakeBody[0].border_left = "0.5vmin solid black"
  snakeBody[0].border_right = "0.5vmin solid black"
  switch (inputDirection.x) {
    case 1:
      snakeBody[0].border_left = "0"
      break;
    case -1:
      snakeBody[0].border_right = "0"
      break;
  }
  switch (inputDirection.y) {
    case 1:
      snakeBody[0].border_top = "0"
      break;
    case -1:
      snakeBody[0].border_bot = "0"
      break;
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
    snakeElement.style.borderTop = segment.border_top;
    snakeElement.style.borderBottom = segment.border_bot;
    snakeElement.style.borderLeft = segment.border_left;
    snakeElement.style.borderRight = segment.border_right;
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement)
  })
}

export function expandSnake(amount) {
  newSegments += amount
}

export function onSnake(position, {
  ignoreHead = false
} = {}) {
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
  SNAKE_SPEED += 0.25;
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