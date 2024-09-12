const SELECTIONS = [
    {
        name: "rock",
        emoji: "👊🏻",
        beats: "scissor"
    },
    {
        name: "paper",
        emoji: "🖐🏻",
        beats: "rock"
    },
    {
        name: "scissor",
        emoji: "✌🏻",
        beats: "paper"
    }
]
const finalCol = document.querySelector("[data-final-col]");
const selectionNames = document.querySelectorAll("[data-selection]");

let userScore = document.querySelector("[data-user-score");
let computerScore = document.querySelector("[data-computer-score");
let userWon = false;
let computerWon = false;


function start(){
    selectionNames.forEach(selectionBtn => {
        selectionBtn.addEventListener("click", event =>{
            const selectName = selectionBtn.dataset.selection;
            const userChoice = SELECTIONS.find(s => s.name === selectName);
    
            const computerChoice = computerSelection();
            validateResult(userChoice, computerChoice);
        })
    });
}

function validateResult(userSelection, computerSelection) {
    const isUserWin = userSelection.beats === computerSelection.name;
    const isComputerWin = computerSelection.beats === userSelection.name;

    updateChoice(computerSelection, isComputerWin);
    updateChoice(userSelection, isUserWin);

    if (isUserWin) {
        userScore.innerText++;
    } else if (isComputerWin) {
        computerScore.innerText++;
    }
}


function updateChoice(userSelection, isWinner){
    const div = document.createElement('div');
    div.innerText = userSelection.emoji;
    div.classList.add('result-selection');
    if(isWinner) div.classList.add('winner');

    finalCol.after(div);
}

function computerSelection(){
    const randomSelection = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomSelection];
    
}

start()