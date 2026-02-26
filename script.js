function attack(monsterHp, damages) {
    return monsterHp - damages;
}

let monsterHp = 35;
let playerHp = 20;
let player = 1;

const monsterDisplay = document.getElementById("monster-pv");
const playerDisplay = document.getElementById("player-num");
const messageDisplay = document.getElementById("message");
const damageInput = document.getElementById("damage-input");
const attackBtn = document.getElementById("attack-btn");
const restartBtn = document.getElementById("restart-btn");

function askDamages(player) {
   
    const value = Number.parseInt(damageInput.value);
    if (isNaN(value) || value < 1 || value > 6) {
        return null;
    }
    return value;
}

function trollAttack() {
    const trollDamage = Math.floor(Math.random() * 5) + 1;
    playerHp -= trollDamage;
    messageDisplay.textContent += `The troll hits Player ${player}: ${trollDamage} time(s)!`;

    if (playerHp <= 0) {
        playerHp = 0;
        messageDisplay.textContent += `\n💀 Player ${player} has been defeated!`;
        attackBtn.style.display = "none";
        restartBtn.style.display = "inline-block"; 
        return true; 
    }
    return false; 
}

function playTurn() {
    let damages = askDamages(player);
    if (damages === null) {
        alert("Enter a number between 1 and 6!");
        return;
    }


    monsterHp = attack(monsterHp, damages);
    if (monsterHp < 0) monsterHp = 0;

   
    messageDisplay.textContent = ``;


    if (monsterHp <= 0) {
        messageDisplay.textContent = `🎉 Player ${player} has won !`;
        attackBtn.style.display = "none"; 
        restartBtn.style.display = "inline-block"; 


        const rightPanel = document.getElementById("right-panel");

  
        const deadImg = new Image();
        deadImg.src = 'pictures/dead.png';
        deadImg.onload = () => {
            rightPanel.style.backgroundImage = "url('pictures/dead.png')";
        }
        return;
    }


    const playerDead = trollAttack();
    if (playerDead) {
        const rightPanel = document.getElementById("right-panel");
        const loseImg = new Image();
        loseImg.src = 'pictures/lose.png';
        loseImg.onload = () => {
            rightPanel.style.backgroundImage = "url('pictures/lose.png')";

        };
        return;
    }

 
    player = (player === 1) ? 2 : 1;
    playerDisplay.textContent = player;
    damageInput.value = "";
}

function restartGame() {

    monsterHp = 35;
    playerHp = 20;
    player = 1;

    playerDisplay.textContent = player;
    messageDisplay.textContent = "New game started! 🐉";
    damageInput.value = "";


    const rightPanel = document.getElementById("right-panel");
    rightPanel.style.backgroundImage = "url('pictures/background.png')"; // image de base
    attackBtn.style.display = "inline-block"; 
    attackBtn.disabled = false; 
    restartBtn.style.display = "none"; 
}


playerDisplay.textContent = player;

attackBtn.addEventListener("click", playTurn);
restartBtn.addEventListener("click", restartGame);