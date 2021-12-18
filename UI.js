import {
    fruitEaten_Score,
    lastSnakeColor,
    SNAKE_SPEED
} from './snake.js'
import {
    highscore,
    togglePause
} from './game.js'

var menuBoardText;
localStorage.setItem("settingsGrid","5")
var menuSettingsText = `<div>
<div id="menu-notification">Settings</div>
<div id="menu-sub-notification">
    <div>
        <input id="menu-grid-input"type="number" min="5" max="30">
        <button id="menu-setting-reset">Apply</button>
    </div>
</div>
</div>
<div>
<button id="menu-btn-back">Back</button>
</div>`

var scoreBoard = document.querySelector("#score-board")
var controlPanel = document.querySelector("#control-panel")
let menuBoard = document.querySelector("#menu-board")
let menuNotif = document.querySelector("#menu-notification")
let menuSubNotif = document.querySelector("#menu-sub-notification")
let score
let inSettings = false;
let btn1 = document.querySelector("#menu-btn1");
let btn2 = document.querySelector("#menu-btn2");
btn2.addEventListener("click", function () {
    openSettings()
});
let btnback
let btnreset
var oldHighScore = sessionStorage.getItem("oldHighScore");
sessionStorage.setItem("oldHighScore", sessionStorage.getItem("highscore"));


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
        btn1.removeEventListener("click", function () {
            document.location.reload()
        })
        btn1.addEventListener("click", function () {
            togglePause(false)
        })
        btn1.innerHTML = "Continue"
    }
    if (notif == "LOSE!!!!!") {
        btn1.addEventListener("click", function () {
            document.location.reload()
        })
        btn1.removeEventListener("click", function () {
            togglePause(false)
        })
        btn1.innerHTML = "Restart"
    }
    menuBoardText = menuBoard.innerHTML;
}

export function menuHidedown() {
    if (inSettings == true) {
        inSettings = false;
        returnToMenuBoard();
    }
    menuBoard.style.opacity = "0";
    menuBoard.style.zIndex = "-1";
}

export function displayHighestScore() {
    if (fruitEaten_Score >= oldHighScore) {
        menuSubNotif.innerHTML = "NEW HIGHSCORE!!! : " + highscore;
    } else {
        menuSubNotif.innerHTML = "Current highscore is: " + highscore;
    }
}

export function openSettings() {
    inSettings = true;
    menuBoard.innerHTML = menuSettingsText;
    btnreset = document.querySelector("#menu-setting-reset")
    btnreset.addEventListener("click", function () {
        let value = document.querySelector("#menu-grid-input").value
        localStorage.setItem("settingsGrid",String(value));
        document.location.reload();
    })
    btnback = document.querySelector("#menu-btn-back");
    btnback.addEventListener("click", function () {
        returnToMenuBoard();
    })
}

export function returnToMenuBoard() {
    menuBoard.innerHTML = menuBoardText;
    resetMenuBoard();

    //return event to button1
    if (menuNotif.innerHTML == "Paused") {
        btn1.removeEventListener("click", function () {
            document.location.reload()
        })
        btn1.addEventListener("click", function () {
            togglePause(false)
        })
        btn1.innerHTML = "Continue"
    }
    if (menuNotif.innerHTML == "LOSE!!!!!") {
        btn1.addEventListener("click", function () {
            document.location.reload()
        })
        btn1.removeEventListener("click", function () {
            togglePause(false)
        })
        btn1.innerHTML = "Restart"
    }
}

function resetMenuBoard() {
    btn1 = document.querySelector("#menu-btn1");
    btn2 = document.querySelector("#menu-btn2");
    scoreBoard = document.querySelector("#score-board")
    controlPanel = document.querySelector("#control-panel")
    menuBoard = document.querySelector("#menu-board")
    menuNotif = document.querySelector("#menu-notification")
    menuSubNotif = document.querySelector("#menu-sub-notification")
    btn2 = document.querySelector("#menu-btn2");
    btn2.addEventListener("click", function () {
        openSettings()
    });
}