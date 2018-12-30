function generateWinningNumber(){
  return Math.floor(Math.random() * 100) + 1
}

function shuffle(array) {
  let m = array.length;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    let i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    let t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

class Game {
  constructor(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
    this.whichWay = null;
  }

  difference(){
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  isLower(){
    if(this.playersGuess < this.winningNumber){
      return true;
    }
    return false;
  }

  playersGuessSubmission(num){
    if(num < 1 || num > 100 || typeof num !== 'number'|| isNaN(num)){
      return "That is an invalid guess.";
    } else {
      this.playersGuess = num;
    }
    return this.checkGuess(num);
  }

  highLow(num){
    if(num > this.winningNumber){
      this.whichWay = 'lower';
    }
    if(num < this.winningNumber){
      this.whichWay = 'higher';
    }
  }

  checkGuess(num){
    this.highLow(num);
    if(num === this.winningNumber){
      win();
      return 'You Win!';
    }
    if(this.pastGuesses.includes(num)){
      return 'You have already guessed that number.';
    }
    if(this.pastGuesses.length >= 4){
      lose();
      return `No dice! The number was ${this.winningNumber}.`;
    }
    else {
      if(this.difference() < 10){
        return `You\'re burning up! Just a little ${this.whichWay}!`;
      }
      else if(this.difference() < 25){
        return `You're lukewarm, try guessing ${this.whichWay}.`;
      }
      else if(this.difference() < 50){
        return `You\'re a bit chilly. Try guessing ${this.whichWay}.`;
      }
      else {
        return `You\'re ice cold. You've gotta go much ${this.whichWay}!`;
      }
    }
  }

  provideHint(){
    let hints = [this.winningNumber];
    hints.push(generateWinningNumber());
    hints.push(generateWinningNumber());
    shuffle(hints);
    return hints;
  }


}

const newGame = () => new Game;

let game = newGame();

const submitButton = document.getElementById('submit');

const messagePlace = document.getElementById('message');

const guessInput = document.getElementById('guess-space');

const hintButton = document.getElementById('hint');

const clearButton = document.getElementById('clear');

const resetButton = document.getElementById('reset');

const resetGuesses = () => {
  game.pastGuesses.forEach((x, ind) => {
    pastGuess = document.getElementById(`guess${ind+1}`);
    pastGuess.innerHTML = '';
  })
  game.pastGuesses = [];
  messagePlace.innerHTML = '';
  document.getElementById('guess-space').style.backgroundImage = null;
  document.getElementById('guess-space').style.height = "50px";
  document.getElementById('guess-space').style.width = "150px";
  document.getElementById('submit').style.display = 'block';
}

hintButton.addEventListener('click', () => {
  let hints = game.provideHint();
  messagePlace.innerHTML = `The number is ${hints[0]}, ${hints[1]}, or ${hints[2]}.`
});

clearButton.addEventListener('click', () => {
  resetGuesses();
});

resetButton.addEventListener('click', () => {
  resetGuesses();
  game = newGame();
});

submitButton.addEventListener('click', () => {
  guessAdded(parseInt(guessInput.value));
  guessInput.value = "";
});

const guessAdded = (guess) => {
  let message = game.playersGuessSubmission(guess);
  messagePlace.innerHTML = message;
  if(isValid(guess)){
    game.pastGuesses.push(guess);
    let usedGuess = document.getElementById(`guess${game.pastGuesses.length}`);
    usedGuess.innerHTML = guess;
  }

}

const isValid = (guess) => {
  if(game.pastGuesses.includes(guess)){
    return false;
  }
  if(typeof guess !== 'number' || guess < 0 || guess > 100){
    return false;
  }
  if(isNaN(guess)){
    return false;
  }
  return true;
}

const win = () => {
  document.getElementById('guess-space').style.backgroundImage = "url('https://media.giphy.com/media/uudzUtVcsLAoo/giphy.gif')";
  document.getElementById('guess-space').style.height = "300px";
  document.getElementById('guess-space').style.width = "300px";
  document.getElementById('submit').style.display = 'none';
}

const lose = () => {
  document.getElementById('guess-space').style.backgroundImage = "url('https://media.giphy.com/media/YLgIOmtIMUACY/giphy.gif')";
  document.getElementById('guess-space').style.height = "300px";
  document.getElementById('guess-space').style.width = "300px";
  document.getElementById('submit').style.display = 'none';
}

