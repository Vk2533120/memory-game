const cardImages = [
    'img-1.png', 'img-1.png',  
    'img-2.png', 'img-2.png', 
    'img-3.png', 'img-3.png', 
    'img-4.png', 'img-4.png', 
    'img-5.png', 'img-5.png', 
    'img-6.png', 'img-6.png', 
    'img-7.png', 'img-7.png', 
    'img-8.png', 'img-8.png'  
];


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;       
let matches = 0;     

function shuffle() {
    cardImages.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = ''; 
    shuffle();

    cardImages.forEach(image => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.card = image;

        const frontFace = document.createElement('div');
        frontFace.classList.add('front');

        const backFace = document.createElement('div');
        backFace.classList.add('back');

        const imgElement = document.createElement('img');
        imgElement.src = image;

        backFace.appendChild(imgElement);
        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    resetScoreboard(); 
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    incrementMoves(); 
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.card === secondCard.dataset.card;

    isMatch ? handleMatch() : unflipCards();
}


function handleMatch() {
    setTimeout(() => {
        firstCard.style.visibility = 'hidden'; 
        secondCard.style.visibility = 'hidden'; 

        incrementMatches(); 

        resetBoard();
    }, 500); 
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1500);
}

function incrementMoves() {
    moves++;
    document.getElementById('moves').textContent = moves;
}

function incrementMatches() {
    matches++;
    document.getElementById('matches').textContent = matches;

    
    if (matches === cardImages.length / 2) {
        setTimeout(() => alert(`Congratulations! You completed the game in ${moves} moves.`), 500);
    }
}

function resetBoard() {
   [hasFlippedCard, lockBoard] = [false, false];
   [firstCard, secondCard] = [null, null];
}

function resetScoreboard() {
   moves = 0;
   matches = 0;
   document.getElementById('moves').textContent = moves;
   document.getElementById('matches').textContent = matches;
}

document.getElementById('restart').addEventListener('click', createBoard);

createBoard();