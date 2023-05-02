function getComputerChoice() {
    num = Math.floor(Math.random() * 3);
    if (num == 0) {
        return "rock"
    } else if (num == 1) {
        return "paper"
    } else {
        return "scissors"
    }
}

function getPlayerChoice() {
    response = prompt("Please pick rock, paper, or scissors: ");
    return response.toLowerCase();
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection == "rock" && computerSelection == "paper") {
        console.log("You Lose! Paper beats rock");
        return 1;
    } else if (playerSelection == "rock" && computerSelection == "scissors") {
        console.log("You Win! Rock beats scissors");
        return 0;
    } else if (playerSelection == "rock" && computerSelection == "rock") {
        console.log("You Tie!");
        return -1;
    } else if (playerSelection == "paper" && computerSelection == "rock") {
        console.log("You Win! Paper beats rock");
        return 0;
    } else if (playerSelection == "paper" && computerSelection == "paper") {
        console.log("You Tie!");
        return -1;
    } else if (playerSelection == "paper" && computerSelection == "scissors") {
        console.log("You Lose! Scissors beats paper");
        return 1;
    } else if (playerSelection == "scissors" && computerSelection == "rock") {
        console.log("You Lose! Rock beats scissors");
        return 1;
    } else if (playerSelection == "scissors" && computerSelection == "paper") {
        console.log("You Win! Paper beats scissors");
        return 0;
    } else if (playerSelection == "scissors" && computerSelection == "scissors") {
        console.log("You Tie!")
        return -1;
    }
}

function game() {
    playerScore = 0;
    computerScore = 0;
    for (i = 0; i < 5; i++) {
        results = playRound(getPlayerChoice(), getComputerChoice());
        if (results == 0) {
            playerScore++;
        } else if (results == 1) {
            computerScore++;
        }
    }
    if (playerScore > computerScore) {
        console.log("You win the game!");
    } else if (computerScore > playerScore) {
        console.log("You lose the game!");
    } else {
        console.log("You tied the game!");
    }
}

game();