document.addEventListener('DOMContentLoaded', () => {
    let randomNumber = Math.floor(Math.random() * 10) + 1;
    let guesses = document.getElementById('guesses');
    let lastResult = document.getElementById('lastResult');
    let lowOrHi = document.getElementById('lowOrHi');
    let guessSubmit = document.getElementById('guessSubmit');
    let guessField = document.getElementById('guessField');
    let guessCount = 1;
    let resetButton;

    function checkGuess() {
        let userGuess = Number(guessField.value);
        if (guessCount === 1) {
            guesses.textContent = 'Previous guesses: ';
        }
        guesses.textContent += userGuess + ' ';

        if (userGuess === randomNumber) {
            lastResult.textContent = 'Congratulations! You got it right!';
            lastResult.style.backgroundColor = 'green';
            lowOrHi.textContent = '';
            setGameOver();
        } else if (guessCount === 3) {
            lastResult.textContent = '!!!GAME OVER!!!';
            setGameOver();
        } else {
            lastResult.textContent = 'Wrong!';
            lastResult.style.backgroundColor = 'red';
            if (userGuess < randomNumber) {
                lowOrHi.textContent = 'Last guess was too low!';
            } else if (userGuess > randomNumber) {
                lowOrHi.textContent = 'Last guess was too high!';
            }
        }

        guessCount++;
        guessField.value = '';
        guessField.focus();
    }

    guessSubmit.addEventListener('click', checkGuess);

    function setGameOver() {
        guessField.disabled = true;
        guessSubmit.disabled = true;
        resetButton = document.createElement('button');
        resetButton.textContent = 'Start new game';
        resetButton.classList.add('bg-green-500', 'text-white', 'p-2', 'rounded-lg', 'mt-4');
        document.querySelector('.container').appendChild(resetButton);
        resetButton.addEventListener('click', resetGame);
    }

    function resetGame() {
        guessCount = 1;

        let resetParas = document.querySelectorAll('.resultParas p');
        for (let i = 0; i < resetParas.length; i++) {
            resetParas[i].textContent = '';
        }

        resetButton.parentNode.removeChild(resetButton);

        guessField.disabled = false;
        guessSubmit.disabled = false;
        guessField.value = '';
        guessField.focus();

        lastResult.style.backgroundColor = 'white';

        randomNumber = Math.floor(Math.random() * 10) + 1;
    }
});