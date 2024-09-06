import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card';

const cardData = [
  { value: 1, img: './cards/ace_of_spades.svg' },
  { value: 2, img: './cards/2_of_spades.svg' },
  { value: 3, img: './cards/3_of_spades.svg' },
  { value: 4, img: './cards/4_of_spades.svg' },
  { value: 5, img: './cards/5_of_spades.svg' },
  { value: 6, img: './cards/6_of_spades.svg' },
  { value: 7, img: './cards/7_of_spades.svg' },
  { value: 8, img: './cards/8_of_spades.svg' },
  { value: 9, img: './cards/9_of_spades.svg' },
  { value: 10, img: './cards/10_of_spades.svg' },
  { value: 10, img: './cards/jack_of_spades2.svg' },
  { value: 10, img: './cards/queen_of_spades2.svg' },
  { value: 10, img: './cards/king_of_spades2.svg' },
  { value: 1, img: './cards/ace_of_clubs.svg' },
  { value: 2, img: './cards/2_of_clubs.svg' },
  { value: 3, img: './cards/3_of_clubs.svg' },
  { value: 4, img: './cards/4_of_clubs.svg' },
  { value: 5, img: './cards/5_of_clubs.svg' },
  { value: 6, img: './cards/6_of_clubs.svg' },
  { value: 7, img: './cards/7_of_clubs.svg' },
  { value: 8, img: './cards/8_of_clubs.svg' },
  { value: 9, img: './cards/9_of_clubs.svg' },
  { value: 10, img: './cards/10_of_clubs.svg' },
  { value: 10, img: './cards/jack_of_clubs2.svg' },
  { value: 10, img: './cards/queen_of_clubs2.svg' },
  { value: 10, img: './cards/king_of_clubs2.svg' },
  { value: 1, img: './cards/ace_of_hearts.svg' },
  { value: 2, img: './cards/2_of_hearts.svg' },
  { value: 3, img: './cards/3_of_hearts.svg' },
  { value: 4, img: './cards/4_of_hearts.svg' },
  { value: 5, img: './cards/5_of_hearts.svg' },
  { value: 6, img: './cards/6_of_hearts.svg' },
  { value: 7, img: './cards/7_of_hearts.svg' },
  { value: 8, img: './cards/8_of_hearts.svg' },
  { value: 9, img: './cards/9_of_hearts.svg' },
  { value: 10, img: './cards/10_of_hearts.svg' },
  { value: 10, img: './cards/jack_of_hearts2.svg' },
  { value: 10, img: './cards/queen_of_hearts2.svg' },
  { value: 10, img: './cards/king_of_hearts2.svg' },
  { value: 1, img: './cards/ace_of_diamonds.svg' },
  { value: 2, img: './cards/2_of_diamonds.svg' },
  { value: 3, img: './cards/3_of_diamonds.svg' },
  { value: 4, img: './cards/4_of_diamonds.svg' },
  { value: 5, img: './cards/5_of_diamonds.svg' },
  { value: 6, img: './cards/6_of_diamonds.svg' },
  { value: 7, img: './cards/7_of_diamonds.svg' },
  { value: 8, img: './cards/8_of_diamonds.svg' },
  { value: 9, img: './cards/9_of_diamonds.svg' },
  { value: 10, img: './cards/10_of_diamonds.svg' },
  { value: 10, img: './cards/jack_of_diamonds2.svg' },
  { value: 10, img: './cards/queen_of_diamonds2.svg' },
  { value: 10, img: './cards/king_of_diamonds2.svg' },
];

function App() {
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [balance, setBalance] = useState(1000); // Initial balance
  const [currentBet, setCurrentBet] = useState(0);
  const [result, setResult] = useState('');
  const [inputBet, setInputBet] = useState(''); // Input bet state
  const [gameOver, setGameOver] = useState(true);

  // Add useEffect for dealing cards at the start of the game
  useEffect(() => {
    // Only deal cards if the hand is empty (i.e., a new game)
    if (playerHand.length === 0) {
      dealInitialCards();
    }
  }, [playerHand]);

  useEffect(() => {
    if (playerScore >= 21) {
      handleEndGame();
    }
  }, [playerScore]); // This effect runs whenever `playerScore` changes

  function dealInitialCards() {
    let firstCardIndex = Math.floor(Math.random() * cardData.length);
    let secondCardIndex = Math.floor(Math.random() * cardData.length);

    let initialHand = [firstCardIndex, secondCardIndex];
    let initialScore = calculateScore(initialHand);
    setPlayerHand(initialHand);
    setPlayerScore(initialScore);

    firstCardIndex = Math.floor(Math.random() * cardData.length);
    secondCardIndex = Math.floor(Math.random() * cardData.length);

    initialHand = [firstCardIndex, secondCardIndex];
    initialScore = calculateScore(initialHand);

    setDealerHand(initialHand);
    setDealerScore(initialScore);
  }

  function addNewCard() {
    const newCard = Math.floor(Math.random() * cardData.length);
    const handCopy = [...playerHand];
    handCopy.push(newCard);
    setPlayerHand(handCopy);

    const newScore = calculateScore(handCopy);
    setPlayerScore(newScore);
  }

  function calculateScore(cards) {
    let total = 0;
    let numAces = 0;
    cards.forEach(cardIndex => {
      const cardValue = cardData[cardIndex].value;
      total += cardValue;
      if (cardValue === 1) numAces++;
    });

    // Adjust for aces
    while (total <= 11 && numAces > 0) {
      total += 10;
      numAces--;
    }

    return total;
  }

  function newGame() {
    clearHands();
    setCurrentBet(0);
    setInputBet('');
    dealInitialCards();
    setGameOver(false);
  }

  function clearHands() {
    setPlayerHand([]);
    setDealerHand([]);
    setPlayerScore(0);
    setDealerScore(0);
    setResult('');
  }

  function placeBet() {
    const amount = Number(inputBet);
    if (amount <= 0 || amount > balance) {
      alert("Invalid bet amount. Please enter a value between 1 and your current balance.");
      return;
    }
    setInputBet('');
    setCurrentBet(amount);
  }

  function handleEndGame() {
    console.log("Player Score:", playerScore);
    console.log("Dealer Score:", dealerScore);
  
    if (playerScore > 21) {
      setResult("You bust! Dealer wins.");
      setBalance(balance - currentBet);
    } else if (dealerScore > 21 || playerScore > dealerScore) {
      let winResult = "You win!"
      if (currentBet != 0) {
        winResult += "\nYour winnings: $" + (currentBet*2);
      }
      setResult(winResult);
      setBalance(balance + (currentBet*2));
    } else if (playerScore < dealerScore) {
      setResult("Dealer wins.");
      setBalance(balance - currentBet);
    } else {
      setResult("It's a push!");
    }
    setGameOver(true);
    setInputBet('');
    setCurrentBet(0); // Reset bet after the game
  }

  function dealerPlay() {
    let dealerScore = 0;
    const dealerHand = [];
    // Dealer draws two cards initially
    while (dealerHand.length < 2) {
      const newCard = Math.floor(Math.random() * cardData.length);
      dealerHand.push(newCard);
    }
    dealerScore = calculateScore(dealerHand);
    // Dealer logic (e.g., hit until score >= 17)
    while (dealerScore < 17) {
      const newCard = Math.floor(Math.random() * cardData.length);
      dealerHand.push(newCard);
      dealerScore = calculateScore(dealerHand);
    }
    setDealerHand(dealerHand);
    setDealerScore(dealerScore);
    handleEndGame(dealerScore);
  }

  return (
    <div className="App">
      <h1>Blackjack</h1>
      <div>
        <p>Balance: ${balance}</p>
        <p>Current Bet: ${currentBet}</p>
        <label htmlFor="bet">Place your bet:</label>
        <input
          id="bet"
          type="number"
          value={inputBet}
          onChange={(e) => setInputBet(e.target.value)}
        />
        <button onClick={placeBet} disabled={currentBet > 0 || gameOver}>Submit Bet</button>
      </div>

      <div>
        <h2>Dealer Hand</h2>
        <div>
          {dealerHand.map((cardIndex, i) => (
            <Card key={i} value={cardData[cardIndex].value} img={cardData[cardIndex].img} />
          ))}
        </div>
        <p>Score: {dealerScore}</p>
      </div>

      <div>
        <h2>Player Hand</h2>
        <div>
          {playerHand.map((cardIndex, i) => (
            <Card key={i} value={cardData[cardIndex].value} img={cardData[cardIndex].img} />
          ))}
        </div>
        <p>Score: {playerScore}</p>
        <button onClick={addNewCard} disabled={playerScore >= 21 || gameOver}>Hit</button>
        <button onClick={dealerPlay} disabled={gameOver}>Stand</button>
      </div>

      <div>
        <h2>{result}</h2>
      </div>
      <div>
        <button onClick={newGame} disabled={!gameOver}>New Game</button>
      </div>
    </div>
  );
}

export default App;
