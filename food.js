import { onSnake, expandSnake, onSnakeButColor } from './snake.js'
import { randomGridPosition } from './grid.js'
var randomColor = String("#" + Math.floor(Math.random()*16777215).toString(16));
let food = getRandomFoodPosition()
const EXPANSION_RATE = 1;


export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE)
    onSnakeButColor(randomColor);
    randomColor = String("#" + Math.floor(Math.random()*16777215).toString(16));
    food = getRandomFoodPosition()
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.style.backgroundColor = randomColor;
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}