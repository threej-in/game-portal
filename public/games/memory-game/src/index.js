const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);
const boardElement = document.querySelector('#memory-board');
const pairsClickedElement = document.querySelector('#pairs-clicked');
const pairsGuessedElement = document.querySelector('#pairs-guessed');
const gameMessageElement = document.querySelector('#game-message');
const restartButton = document.querySelector('#restart-btn');

let isBoardLocked = false;

function updateScoreboard() {
  pairsClickedElement.textContent = memoryGame.pairsClicked;
  pairsGuessedElement.textContent = memoryGame.pairsGuessed;
}

function resetBoardState() {
  memoryGame.pickedCards = [];
  isBoardLocked = false;
}

function finishGameIfNeeded() {
  if (!memoryGame.checkIfFinished()) {
    return;
  }

  gameMessageElement.textContent = `You won in ${memoryGame.pairsClicked} turns.`;
}

function buildBoard() {
  let html = '';

  memoryGame.cards.forEach((pic, index) => {
    html += `
      <button class="card" type="button" data-card-name="${pic.name}" data-card-index="${index}" aria-label="${pic.name}">
        <div class="back"></div>
        <div class="front" style="background-image: url(img/${pic.img})"></div>
      </button>
    `;
  });

  boardElement.innerHTML = html;

  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => {
      if (isBoardLocked || card.classList.contains('turned') || card.classList.contains('blocked')) {
        return;
      }

      card.classList.add('turned');
      memoryGame.pickedCards.push(card);

      if (memoryGame.pickedCards.length < 2) {
        return;
      }

      isBoardLocked = true;

      const [firstCard, secondCard] = memoryGame.pickedCards;
      const isPair = memoryGame.checkIfPair(
        firstCard.dataset.cardName,
        secondCard.dataset.cardName
      );

      updateScoreboard();

      if (isPair) {
        firstCard.classList.add('blocked');
        secondCard.classList.add('blocked');
        resetBoardState();
        finishGameIfNeeded();
        return;
      }

      setTimeout(() => {
        firstCard.classList.remove('turned');
        secondCard.classList.remove('turned');
        resetBoardState();
      }, 900);
    });
  });
}

function restartGame() {
  memoryGame.pairsClicked = 0;
  memoryGame.pairsGuessed = 0;
  memoryGame.pickedCards = [];
  gameMessageElement.textContent = '';
  memoryGame.shuffleCards();
  updateScoreboard();
  buildBoard();
}

window.addEventListener('load', (event) => {
  memoryGame.shuffleCards();
  updateScoreboard();
  buildBoard();
});

restartButton.addEventListener('click', restartGame);
