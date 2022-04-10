////////////////////////////////////////DECLARATION///////////////////////////////////////////
//Declare new variable from html Id
const word = document.getElementById('word');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const figureParts = document.querySelectorAll(".figure-part");

//Declaring animal words and select randomly
const words = ['cat', 'dog', 'horse', 'crocodile'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

//Declaring new empty array
let correctLetters = [];
let wrongLetters = [];

//Game sounds
let clapSound = new Audio('./sounds/clapping.wav');
let loseSound = new Audio('./sounds/booing.wav');
let wrongSound = new Audio('./sounds/losing-bleeps.wav');



////////////////////////////////////////PROGRAM///////////////////////////////////////////
window.addEventListener('keydown', keyPress);

playAgainBtn.addEventListener('click', restartGame)

displayWord();


////////////////////////////////////////FUNCTION///////////////////////////////////////////
//Keydown letter press
function keyPress(e) {
    if (e.which) {
        let letterInput = e.key;
        if (selectedWord.includes(letterInput)) {
            if (!correctLetters.includes(letterInput)) {
                correctLetters.push(letterInput);
                displayWord();
            }
        } else {
            if (!wrongLetters.includes(letterInput)) {
                wrongLetters.push(letterInput);
                updateWrongLetter();
            }
        }
    }
}

//Display word
function displayWord() {
    const letters = selectedWord.split('');
    
    word.innerHTML = `${letters.map(eachLetter).join('')}`;

    //New variable contains letters entered by the player
    const innerWord = word.innerText.replace(/\n/g, '');

    //Check if correct
    if (innerWord === selectedWord) {
        finalMessage.innerText = 'Correct!';
        popup.style.display = 'flex';
        clapSound.play();
    }

    function eachLetter(letterInput) {
        let show;
        if (correctLetters.includes(letterInput)) {
            show = letterInput;
        } else {
            show = '';
        }
        return `<span class="letter">${show}</span>`;
    }
}

// Update the hangman parts
function updateWrongLetter() {
    //Display hangman parts
    figureParts.forEach(displayFigureParts);

    function displayFigureParts(part, i) {
        if (i < wrongLetters.length) {
            part.style.display = 'block'
            wrongSound.play();
        }
        else {
            part.style.display = 'none';
        }
    }
    
    //Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'You lost!';
        popup.style.display = 'flex';
        loseSound.play();
    }
}

//Restart game and play again
function restartGame() {
    //Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    //re-select animal word
    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();
    updateWrongLetter();
    popup.style.display = 'none';
}
