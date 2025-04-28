
class Card {
    constructor(rank, suit) {
        this.rank = rank
        this.suit = suit
        let value = parseInt(rank)
        if (isNaN(value)) {
            if (rank === "Ace") {
                value = 11
            } else {
                value = 10
            }
        }
        this.value = value
    }
    getValue() {
        return this.value
    }
    getRank() {
        return this.rank
    }         
    getSuit() {
        return this.suit
    }
    toString() {
        return `${this.rank} of ${this.suit}`
    }
}


const deck = [
    new Card("Ace", "Hearts"),
    new Card("2", "Hearts"),
    new Card("3", "Hearts"),
    new Card("4", "Hearts"),
    new Card("5", "Hearts"),
    new Card("6", "Hearts"),
    new Card("7", "Hearts"),
    new Card("8", "Hearts"),
    new Card("9", "Hearts"),
    new Card("10", "Hearts"),
    new Card("Jack", "Hearts"),
    new Card("Queen", "Hearts"),
    new Card("King", "Hearts"),
    new Card("Ace", "Diamonds"),
    new Card("2", "Diamonds"),       
    new Card("3", "Diamonds"),
    new Card("4", "Diamonds"),
    new Card("5", "Diamonds"),
    new Card("6", "Diamonds"),
    new Card("7", "Diamonds"),
    new Card("8", "Diamonds"),
    new Card("9", "Diamonds"),
    new Card("10", "Diamonds"),
    new Card("Jack", "Diamonds"),
    new Card("Queen", "Diamonds"),
    new Card("King", "Diamonds"),
    new Card("Ace", "Clubs"),
    new Card("2", "Clubs"),
    new Card("3", "Clubs"),
    new Card("4", "Clubs"),
    new Card("5", "Clubs"),
    new Card("6", "Clubs"),
    new Card("7", "Clubs"),
    new Card("8", "Clubs"),
    new Card("9", "Clubs"),
    new Card("10", "Clubs"),
    new Card("Jack", "Clubs"),
    new Card("Queen", "Clubs"),
    new Card("King", "Clubs"),
    new Card("Ace", "Spades"),
    new Card("2", "Spades"),
    new Card("3", "Spades"),
    new Card("4", "Spades"),   
    new Card("5", "Spades"),
    new Card("6", "Spades"),
    new Card("7", "Spades"),
    new Card("8", "Spades"),
    new Card("9", "Spades"),
    new Card("10", "Spades"),
    new Card("Jack", "Spades"),
    new Card("Queen", "Spades"),
    new Card("King", "Spades")]

/**
 * Shuffles six copies of an array using the Fisher-Yates algorithm.
 * 
 * @param {Array} arr The input array.
 * @returns {Array<any> | null} The shuffled array or null if or has less than two elements
 */
function shuffle(arr) {
    if (!Array.isArray(arr) || arr.length < 2) {
      return null; // Or throw an error, depending on desired behavior
    }
  
    // Create six copies of the deck to make card counting harder
    let shuffled = [...arr]
    shuffled.push(...arr)
    shuffled.push(...arr)
    shuffled.push(...arr)
    shuffled.push(...arr)
    shuffled.push(...arr)

  
    // Fisher-Yates shuffle (in-place)
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled;
}
  



let cards = shuffle(deck)


let message = ""

const messageEl = document.getElementById("message-el")
const handEl = document.getElementById("cards-el")

function draw() {
    if (cards.length === 0) {
        cards = shuffle(deck) 
    }
    let card  = cards.pop()

    message = `You drew a ${card.toString()} 🙂 (${cards.length} left)`
    messageEl.textContent=message
    let newCard = document.createElement("li")
    newCard.textContent = card.toString()
    handEl.appendChild(newCard)

}
