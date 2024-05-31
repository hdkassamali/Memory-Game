const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let numClickedCards = 0;
let firstCardColor;
let secondCardColor;
let firstCardEvent;
let secondCardEvent;
let isComparing = false;

function handleCardClick(event) {
  // This if statement prevents a user from being able to click cards that are already face up or click more than two cards at once.
  if (isComparing || event.target.style.backgroundColor !== "") {
    return;
  }

  // Clicking a card changes the background color to be the color of the className that the div has. 
  event.target.style.backgroundColor = event.target.className;

  // If there are no cards previously selected, then this part of the if statement executes. It assigns the event to firstCardEvent and the color to firstCardColor. It also adds 1 to numClickedCards.
  if (numClickedCards === 0) {
    firstCardEvent = event;
    firstCardColor = event.target.className;
    numClickedCards++;
  } 

  // If one card is already selected, then this part of the if statement executes. It assigns the event to SecondCardEvent and the color to SecondCardColor.
  else if (numClickedCards === 1) {
    isComparing = true;
    secondCardEvent = event;
    secondCardColor = event.target.className;

    // Checks if the two cards match. Uses set timeout to wait one second. If the cards match, they stay 'face up'. If not, the color is reset for both cards and they go 'face down'. In either scenario, the values for both colors and events are set back to empty strings and the numClickedCards is set to 0. This is to allow for further card flips. 
    setTimeout(function() {
      if (firstCardColor !== secondCardColor) {
        firstCardEvent.target.style.backgroundColor = "";
        secondCardEvent.target.style.backgroundColor = "";
        
      }
      firstCardColor = "";
      secondCardColor = "";
      firstCardEvent = "";
      secondCardEvent = "";
      numClickedCards = 0;
      isComparing = false;
    }, 1000)
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
