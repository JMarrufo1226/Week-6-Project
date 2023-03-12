const expect = chai.expect // helpful hack

describe("shuffle method", function() {
    it("shuffle cards randomly", function() {
        // Arrange
        const Deck = class Deck { // A class representing a deck of 52 playing cards, that can then be shuffled and dealt
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
        }

        // Act
        const worked = shuffle() { // the method i used to shuffle the deck and cards(fisher-yates)
            for (let i = this.cards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
            }
        }

        // Assert
        expect(worked).to.equal(true)
        
    })

    
})