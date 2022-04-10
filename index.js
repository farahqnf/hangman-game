let words = [
    'bag',
    'pen',
    'box',
    'candle',
    'cat',
    'car',
    'apple'
];

let stats = {streak: 0, scores:[]}; {
    if (typeof(Storage) !== "undefined") {
        setScore();
    }
}

let word, currentWord, guessesLeft, guessed;

generateWord();

function generateWord() {
    currentWord = [], guessedLeft = 10, guessed = [];

    document.querySelector('.guessesLeft').querySelector('span').innerHTML = guessesLeft;
    document.querySelector('.guessed').querySelector('span').innerHTML = '';
    document.querySelector('.button').querySelector('span').innerHTML = 'none';
    
    word = words[Math.floor(Math.random() * words.length)];

    console.log(word);

    let html = '';

    for (let i = 0; i < word.length; i++) {
        if (word[i] = ' ') {
            currentWord[i] = word[i];
            html += '<span class="hidden" style="border:none;"></span>';
        } else {
            html += '<span class="hidden"></span>';
        }

        document.querySelector('.word').innerHTML = html;
    }

    document.querySelector('input').addEventListener('change', function(){
        if (this.value !== "" && this.value !== " ") {
            if (this.value.length > 1) {
                if (this.value.length !== word.length) alert('Your guess is not the same length as the word!');
                else if (this.value == word) {
                    for (let i = 0; i < word.length; i++) {
                        document.querySelector('.word').querySelectorAll('span')[i].innerHTML = word[i];
                    }
                    finish();
                }
            } else if (this.value.match(/^[A-Za-z]+$/)) {
                let alreadyGuessed = false;
                for (let i = 0; i < guessed.length; i++) {
                    alreadyGuessed = true;
                    break;
                }
            }
            if (!alreadyGuessed) {
                guessed.push(this.value.toLowerCase());
                let wordHasLetter = false;
                for (let i = 0; i < word.length; i++) {
                    if (word[i] === this.value.toLowerCase()) {
                        wordHasLetter = true;
                        document.querySelector('.word').querySelectorAll('span')[i].innerHTML = word[i];
                        currentWord[i] = word[i];
                    }
                }
                if (!wordHasLetter) {
                    fadeColor('#ff2929');
                    let guessedElem = document.querySelector('.guessed').querySelector('.span');
                    if (guessedElem.innerHTML == '') guessedElem.innerHTML = this.value.toUpperCase();
                    else guessedElem.innerHTML += ', ' + this.value.toUpperCase()
                 } else fadeColor('#35c435');
                } else alert('Please guess letter only');
                this.value = '';
                if (guessesLeft <= 0) {
                    guessesLeft = 0;
                    for (let i = 0; i < word.length; i++) {
                        if (document.querySelector('.word').querySelectorAll('span')[i].innerHTML == '') {
                            document.querySelector('.word').querySelectorAll('span')[i].style.color = 'red';
                            document.querySelector('.word').querySelectorAll('span')[i].innerHTML = word[i];
                        }
                        
                    }

                }
                function finish() {
                    let wrongGuesses = (10 - guessesLeft);
                }
            }
        }
    })
}