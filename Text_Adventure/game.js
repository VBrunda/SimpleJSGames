const text = document.getElementById('txt');
const optionsBtn = document.getElementById('options');

let state = {};

function startGame(){
    console.log("Start game");
    state = {};
    displayTextNode(1);
}

function displayTextNode(nextNodeId){
    const textNode = textNodes.find(node => node.id === nextNodeId);
    text.innerText = textNode.text;

    while(optionsBtn.firstChild){
        optionsBtn.removeChild(optionsBtn.firstChild);
    }
    
    textNode.options.forEach(opt => {
        if(showOption(opt)){
            const btn = document.createElement("button");
            btn.innerText = opt.text;
            btn.classList.add("btn");
            btn.addEventListener("click", ()=>optionSelected(opt))
            optionsBtn.appendChild(btn);
        }
    })
}

function optionSelected(option){
    const nextNode = option.nextNode;
    if(nextNode <= 0){
        return startGame();
    }
    state = Object.assign(state, option.setState);
    displayTextNode(nextNode);
}


function showOption(option){
    return (option.requiredState == null) || (option.requiredState(state));
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange place and you see a jar of blue goo near you.',
        options: [
          {
            text: 'Take the goo',
            setState: { blueGoo: true },
            nextNode: 2
          },
          {
            text: 'Leave the goo',
            nextNode: 2
          }
        ]
      },
      {
        id: 2,
        text: 'You venture forth in search of answers to where you are when you come across a merchant.',
        options: [
          {
            text: 'Trade the goo for a sword',
            requiredState: (currentState) => currentState.blueGoo,
            setState: { blueGoo: false, sword: true },
            nextNode: 3
          },
          {
            text: 'Trade the goo for a shield',
            requiredState: (currentState) => currentState.blueGoo,
            setState: { blueGoo: false, shield: true },
            nextNode: 3
          },
          {
            text: 'Ignore the merchant',
            nextNode: 3
          }
        ]
      },
      {
        id: 3,
        text: 'After leaving the merchant you start to feel tired and stumble upon a small town next to a dangerous looking castle.',
        options: [
          {
            text: 'Explore the castle',
            nextNode: 4
          },
          {
            text: 'Find a room to sleep at in the town',
            nextNode: 5
          },
          {
            text: 'Find some hay in a stable to sleep in',
            nextNode: 6
          }
        ]
      },
      {
        id: 4,
        text: 'You are so tired that you fall asleep while exploring the castle and are killed by some terrible monster in your sleep.',
        options: [
          {
            text: 'Restart',
            nextNode: -1
          }
        ]
      },
      {
        id: 5,
        text: 'Without any money to buy a room you break into the nearest inn and fall asleep. After a few hours of sleep the owner of the inn finds you and has the town guard lock you in a cell.',
        options: [
          {
            text: 'Restart',
            nextNode: -1
          }
        ]
      },
      {
        id: 6,
        text: 'You wake up well rested and full of energy ready to explore the nearby castle.',
        options: [
          {
            text: 'Explore the castle',
            nextNode: 7
          }
        ]
      },
      {
        id: 7,
        text: 'While exploring the castle you come across a horrible monster in your path.',
        options: [
          {
            text: 'Try to run',
            nextNode: 8
          },
          {
            text: 'Attack it with your sword',
            requiredState: (currentState) => currentState.sword,
            nextNode: 9
          },
          {
            text: 'Hide behind your shield',
            requiredState: (currentState) => currentState.shield,
            nextNode: 10
          },
          {
            text: 'Throw the blue goo at it',
            requiredState: (currentState) => currentState.blueGoo,
            nextNode: 11
          }
        ]
      },
      {
        id: 8,
        text: 'Your attempts to run are in vain and the monster easily catches.',
        options: [
          {
            text: 'Restart',
            nextNode: -1
          }
        ]
      },
      {
        id: 9,
        text: 'You foolishly thought this monster could be slain with a single sword.',
        options: [
          {
            text: 'Restart',
            nextNode: -1
          }
        ]
      },
      {
        id: 10,
        text: 'The monster laughed as you hid behind your shield and ate you.',
        options: [
          {
            text: 'Restart',
            nextNode: -1
          }
        ]
      },
      {
        id: 11,
        text: 'You threw your jar of goo at the monster and it exploded. After the dust settled you saw the monster was destroyed. Seeing your victory you decide to claim this castle as your and live out the rest of your days there.',
        options: [
          {
            text: 'Congratulations. Play Again.',
            nextNode: -1
          }
        ]
      }
]


startGame()
