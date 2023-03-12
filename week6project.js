class Card { // Creating a class that consists of the suits and values each card will have
    constructor(rank, suit) {//takes 2 arguments, rank and suit
        this.rank = rank;
        this.suit = suit;
    }   
}

    class Deck { // A class representing a deck of 52 playing cards, that can then be shuffled and dealt
        constructor() {
            this.cards = [];//array where the deck will be stored

            const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Joker', 'Queen', 'King', 'Ace'];
            const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

            for (let rank of ranks) { // This loop creates one of each possible card combo by calling the card class constructor with the "rank" and "suit" arguments
                for (let suit of suits) {
                    this.cards.push(new Card(rank, suit)); //cards are added to the this.cards array using the push method
                }
            }
        }

        shuffle() { // the method i used to shuffle the deck and cards(fisher-yates)
            for (let i = this.cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
            }
        }

        deal() { // I used this method to deal a card to each player, it removes and returns the last card in the array using the "pop" method
            return this.cards.pop();
        }
    }   
    
    class Player { // A class representing both players, contains their name, their score, and the cards in their hand
        constructor(Playername) {
            this.name = Playername;
            this.score = 0
            this.hand = [];
        }

        playCard() { //this method uses the "Shift" method to remove and reutrn the first elemt in the hand array. It emulates playing a card in your hand
            return this.hand.shift();
        }

        receiveCard(card) { //This method adds cards to the players hand
            this.hand.push(card);
        }

        addPoint() { // When a round is won, the addPoint() method is called on the player who won the round to increment their score. It does this by adding 1 to the current score of the player.
            this.score++;
        }
    }

    class Game { //This class simulates a game of cards. It has the following objects and methods.
        constructor(player1Name, player2Name) {//The constructor initializes a new game object with two players and a deck for each player
            this.deck = new Deck();//deck: This variable holds the Deck object used in the game.
            this.player1 = new Player(player1Name)// player1: This variable holds the Player object representing the first player.

            this.player2 = new Player(player2Name)//player2: This variable holds the Player object representing the second player.
        }

        dealCards() { // this method deals cards to each player, first it shuffles the cards, and then using a wile loop it deals cards until all card have been dealt
            this.deck.shuffle() // receiveHand is then called to add a card to each hand

            while (this.deck.cards.length > 0) {//This while loop deals cards until none are left
                this.player1.receiveCard(this.deck.deal());
                this.player2.receiveCard(this.deck.deal());
            }
        }

        play() { //This is the main method that runs the game. It uses a "while" loop to play the game until no cards are left.
            let round = 1

            while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
                console.log(`Round ${round}:`); //As long as players have cards, each new round will be continued to be displayed

                const card1 = this.player1.playCard();//calls the playCard method to play card in the players hand
                const card2 = this.player2.playCard();

                console.log(`${this.player1.name} played ${card1.rank} of ${card1.suit}`);//Displays which card was played, includes rank and suit
                console.log(`${this.player2.name} played ${card2.rank} of ${card2.suit}`);

                if (card1.rank > card2.rank) { //This if/else if statement is how the winner of each round is determined. Console.log() is used to display results
                    console.log("Player 1 wins this round")
                    this.player1.addPoint()
                } else if (card2.rank > card1.rank) {
                    console.log("Player 2 wins this round")
                    this.player2.addPoint()
                } else {
                    console.log("It's a tie!")
                }

                console.log(`${this.player1.name}: ${this.player1.score} points`); //Console.log() displays players points
                console.log(`${this.player2.name}: ${this.player2.score} points`);

                round++; //The round counter is increminted when both players play their card
            }

            console.log(`Final score: ${this.player1.name} ${this.player1.score} - ${this.player2.score} ${this.player2.name}`);//This displays the final score when all cards are played
            if (this.player1.score > this.player2.score) {//An if/else if statement is used to display and decide the winner
                console.log(`${this.player1.name} wins!`)
            } else if (this.player2.score > this.player1.score) {
                console.log(`${this.player2.name} wins!`)
            } else {
                console.log("It's a tie!")
            }
        }
    }

    const game = new Game("Player 1", "Player 2");//creates a new Game object and assigns it to the variable game. It takes two arguments, in this case, the names of the players.
    game.dealCards()//This method deals cards to the players at the beginning at the game
    game.play()//The main method that actually runs the game