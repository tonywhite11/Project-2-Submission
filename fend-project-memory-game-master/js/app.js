
//Create a list that holds all of your cards
var cards = ["fa-diamond", "fa-diamond",
            "fa fa-paper-plane-o", "fa fa-paper-plane-o",
            "fa-anchor", "fa-anchor",
            "fa-bolt", "fa-bolt",
            "fa-cube", "fa-cube",
            "fa-bomb", "fa-bomb",
            "fa-leaf", "fa-leaf",
            "fa-bicycle", "fa-bicycle",
            ];

// Global variables
let flippedCards = [];
let moves = 0;
let time = 0;
let matched = 0;
let clockOff = true;
let clock;


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Creates card list
function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

// Initializes/Starts game
const deck = document.querySelector('.deck');
function initGame() {
var deck = document.querySelector(".deck");
   var cardHTML = shuffle(cards).map(function(card) {
        return generateCard(card);
   });
        deck.innerHTML = cardHTML.join("");
}
initGame()

// Adds event listener to cards
deck.addEventListener('click', event=> {
    const clickedCard = event.target;
    if (validClick(clickedCard)) {
    	if (clockOff) {
    		startClock();
    		clockOff = false;
    	}
        flipCard(clickedCard);
        addFlippedCard(clickedCard);
        if (flippedCards.length === 2) { 
            addMove();
            checkScore();       	
        	checkForMatch(clickedCard);    	
        	      	
        }
    }
});

// Cancel button evt listener for modal
document.querySelector('.modal_cancel').addEventListener('click', () => {
	showModal();
});
// Replay button evt listener for modal
document.querySelector('.modal_replay').addEventListener('click', replayGame);
// Restart evt listener for modal
document.querySelector('.restart').addEventListener('click', resetGame);


// Flips card when clicked
function flipCard(card) {
	 card.classList.toggle('open');
     card.classList.toggle('show');
}

// Add toggled card to clickedCard list
function addFlippedCard(clickedCard) {
	flippedCards.push(clickedCard);
}

// Checks if cards are a match and closes them if not
function checkForMatch() {
	if (flippedCards[0].firstElementChild.className === 
		flippedCards[1].firstElementChild.className) {
		flippedCards[0].classList.toggle('match');
		flippedCards[1].classList.toggle('match');
		flippedCards = [];
		matched++;
		const matchedCards = cards.length / 2;
		if (matched === matchedCards) {
			gameOver();
		}
	} else {
        setTimeout(() => {
        	flipCard(flippedCards[0]);
		    flipCard(flippedCards[1]);
		    flippedCards = [];
        }, 1000);
    }
}


// Determines whether the card can be clicked
function validClick(clickedCard) {
	return (
		clickedCard.classList.contains('card') &&
        !clickedCard.classList.contains('match') && 
    	flippedCards.length < 2 &&
    	!flippedCards.includes(clickedCard));
}

// Adds move to move counter
function addMove() {
	moves++;
	document.querySelector('.moves').innerHTML = moves;
}

// Checks number of moves
function checkScore() {
	if (moves === 17 || moves === 22 || moves === 26) {
		loseStar();
	}
}

// Hides star
function loseStar() {
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		if (star.style.display !== 'none') {
			star.style.display = 'none';
			break;
		}
	}
}

// Starts clock
function startClock() {
	 clock = setInterval(() => {
		time++;
		formatTime();
	}, 1000);
}

// Clock display
function formatTime() {
	const clock = document.querySelector('.clock');
	clock.innerHTML = time;
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	if (seconds < 10) {
		clock.innerHTML = `${minutes}:0${seconds}`;
	} else {
		clock.innerHTML = `${minutes}:${seconds}`;
	}	
}

// Stops clock timer
function stopClock() {
	clearInterval(clock);
}

// Show or hide modal
function showModal() {
	const modal = document.querySelector('.modal_background');
	modal.classList.toggle('hide');
}

// Collects and stores number of stars
function getStars() {
	stars = document.querySelectorAll('.stars li');
	starCount = 0;
	for (star of stars) {
		if (star.style.display !== 'none') {
			starCount++;
		}
	}
	return starCount;
}

// Writes game data to modal
function modalGameStats() {
const timeScore = document.querySelector('.modal_time');
const movesScore = document.querySelector('.modal_moves');
const starsScore = document.querySelector('.modal_stars');
const clock = document.querySelector('.clock').innerHTML;
const stars = getStars();
timeScore.innerHTML = `Time = ${clock}`;
movesScore.innerHTML = `Moves = ${moves}`;
starsScore.innerHTML = `Stars = ${stars}`;
}

// Reset game
function resetGame() {
	resetTime();
	resetMoves();
	resetStars();
	initGame();
	resetCards();
	resetMatched();
	//location.reload();  <!--Not recommended to use-->
}

// Resets clock and time
function resetTime() {
	stopClock();
	clockOff = true;
	time = 0;
	formatTime();
}

// Resets moves
function resetMoves() {
	moves = 0;
    document.querySelector('.moves').innerHTML = moves;
}

// Resets stars
function resetStars() {
	stars = 0;
	const starList = document.querySelectorAll('.stars li')
	for (star of starList) {
		star.style.display = 'inline';
	}
}

// Game Over
function gameOver() {
	stopClock();
	modalGameStats();
	showModal();
}

// Replay game
function replayGame() {
	resetGame();
	showModal();
	//location.reload();
}

// Reset cards
function resetCards() {
	const cards = document.querySelectorAll('.deck li');
	for (let card of cards) {
		card.className = 'card';
	}
}

// Resets matched cards to 0
function resetMatched() {
	matched = 0;
}



// Alternate Timer for later use

/*let hour = 0;
let minutes = 0;
let seconds = 0;

let timer;

function startTimer() {
	timer = setInterval(function() {
		seconds++;
		if(seconds == 60) {
		minutes++;
		seconds = 0;
		}
		console.log(formatTime());
	}, 1000);
}

function stopTimer() {
	clearInterval(timer);
}

function formatTime() {
	let sec = seconds > 9 ? String(seconds) : "0" + String(seconds);
	let min = minutes > 9 ? String(minutes) : "0" + String(minutes);
	return min + ":" + sec;

}*/
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
