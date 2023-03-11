class Card {
    constructor(rank, suit) {
      this.rank = rank;
      this.suit = suit;
    }
}

  class Deck {
    constructor() {
      this.cards = [];
  
      const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
  
      for (let rank of ranks) {
        for (let suit of suits) {
          this.cards.push(new Card(rank, suit));
        }
      }
    }
  
    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  
    deal() {
      return this.cards.pop();
    }
  }
  
  class Player {
    constructor(name) {
      this.name = name;
      this.score = 0;
      this.hand = [];
    }
  
    playCard() {
      return this.hand.shift();
    }
  
    receiveCard(card) {
      this.hand.push(card);
    }
  
    addPoint() {
      this.score++;
    }
  }
  
  class Game {
    constructor(player1Name, player2Name) {
      this.deck = new Deck();
      this.player1 = new Player(player1Name);
      this.player2 = new Player(player2Name);
    }
  
    dealCards() {
      this.deck.shuffle();
  
      while (this.deck.cards.length > 0) {
        this.player1.receiveCard(this.deck.deal());
        this.player2.receiveCard(this.deck.deal());
      }
    }
  
    play() {
      let round = 1;
  
      while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
        console.log(`Round ${round}:`);
  
        const card1 = this.player1.playCard();
        const card2 = this.player2.playCard();
  
        console.log(`${this.player1.name} plays ${card1.rank} of ${card1.suit}`);
        console.log(`${this.player2.name} plays ${card2.rank} of ${card2.suit}`);
  
        if (card1.rank > card2.rank) {
          console.log(`${this.player1.name} wins the round!`);
          this.player1.addPoint();
        } else if (card2.rank > card1.rank) {
          console.log(`${this.player2.name} wins the round!`);
          this.player2.addPoint();
        } else {
          console.log("It's a tie!");
        }
  
        console.log(`${this.player1.name}: ${this.player1.score} points`);
        console.log(`${this.player2.name}: ${this.player2.score} points`);
  
        round++;
      }
  
      console.log(`Final score: ${this.player1.name} ${this.player1.score} - ${this.player2.score} ${this.player2.name}`);
  
      if (this.player1.score > this.player2.score) {
        console.log(`${this.player1.name} wins!`);
      } else if (this.player2.score > this.player1.score) {
        console.log(`${this.player2.name} wins!`);
      } else {
        console.log("It's a tie!");
      }
    }
  }
  
  const game = new Game("Player 1", "Player 2");
  game.dealCards();
  game.play();
  