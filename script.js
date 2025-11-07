function attack(monsterHp, damages) {
    return monsterHp - damages;
}

let monsterHp = 35;
let playerHp = 20;
let player = 1;


// éléments HTML
const monsterDisplay = document.getElementById("monster-pv");
const playerDisplay = document.getElementById("player-num");
const messageDisplay = document.getElementById("message");
const damageInput = document.getElementById("damage-input");
const attackBtn = document.getElementById("attack-btn");
const restartBtn = document.getElementById("restart-btn");

function askDamages(player) {
    // On lit la valeur entrée dans l'input
    const value = Number.parseInt(damageInput.value);
    if (isNaN(value) || value < 1 || value > 6) {
        return null;
    }
    return value;
}

function trollAttack() {
    const trollDamage = Math.floor(Math.random() * 6) + 1; // dégâts du troll : 1 à 6
    playerHp -= trollDamage;
    messageDisplay.textContent += `The troll hits Player ${player}: ${trollDamage} time(s)!`;

    if (playerHp <= 0) {
        playerHp = 0;
        messageDisplay.textContent += `\n💀 Player ${player} has been defeated!`;
        attackBtn.style.display = "none"; // 👈 cache le bouton Attack
        restartBtn.style.display = "inline-block"; // 👈 on montre le bouton Restart
        return true; // indique que le joueur est mort
    }
    return false; // joueur encore en vie
}



function playTurn() {
    let damages = askDamages(player);
    if (damages === null) {
        alert("Enter a number between 1 and 6!");
        return;
    }


    monsterHp = attack(monsterHp, damages);
    if (monsterHp < 0) monsterHp = 0;

    /*    monsterDisplay.textContent = monsterPv; */
    messageDisplay.textContent = ``;

    //si le troll est vaincu
    if (monsterHp <= 0) {
        messageDisplay.textContent = `🎉 Player ${player} has won !`;
        attackBtn.style.display = "none"; // 👈 cache le bouton Attack
        restartBtn.style.display = "inline-block"; // 👈 on montre le bouton Restart


        const rightPanel = document.getElementById("right-panel");

        // Charger l'image du troll vaincu avant de changer le background
        const deadImg = new Image();
        deadImg.src = 'pictures/dead.png';
        deadImg.onload = () => {
            rightPanel.style.backgroundImage = "url('pictures/dead.png')";
        }
        return;
    }

    // attaque du troll
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

    // changement de joueur
    player = (player === 1) ? 2 : 1;
    playerDisplay.textContent = player;
    damageInput.value = "";
}

// 🔁 Fonction pour recommencer la partie
function restartGame() {
    // Réinitialiser les variables
    monsterHp = 35;
    playerHp = 20;
    player = 1;

    // Réinitialiser l'affichage
    playerDisplay.textContent = player;
    messageDisplay.textContent = "New game started! 🐉";
    damageInput.value = "";


    const rightPanel = document.getElementById("right-panel");
    rightPanel.style.backgroundImage = "url('background.png')"; // 👈 ton image de base
    attackBtn.disabled = false;
    restartBtn.style.display = "none"; // on cache le bouton Restart
}


// Initialisation
playerDisplay.textContent = player;

// Lancer un tour à chaque clic
attackBtn.addEventListener("click", playTurn);
restartBtn.addEventListener("click", restartGame);