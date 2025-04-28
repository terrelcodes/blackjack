
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
    return shuffled
}

function CardBox (deck) {
    let cards = null
    function draw() {
        if (cards === undefined || cards === null || cards.length === 0) {
            cards = shuffle(deck).slice(0, 52*4) // reshuffle the deck after 208 cards are drawn
            console.log("cards shuffled")
        }
        return cards.pop()
    }
    return draw
}

const draw = CardBox(deck)


class Player {
    constructor(name) {
        this.name = name
        this.hand = []
    }
    getName() {
        return this.name
    }
    drawCard() {        
        let card = draw()
        this.hand.push(card)
        let newCard = document.createElement("li")
        newCard.textContent = card.toString()
        this.handEl.appendChild(newCard)
    }

    start(){
        this.state = "playing"
        this.hand = [] 
        this.handEl.innerHTML = ""
        this.sumEl.innerHTML = ""
        this.messageEl.textContent = ""
        this.drawCard()
        this.drawCard()
        total = evaluateHand(this.hand).total
        if (total === 21) {
            this.messageEl.textContent = `Blackjack! You have a total of ${total} 🎉`
            this.state = "won"
        } else {
            this.messageEl.textContent = `You have a total of ${total} 🙂`
        }  
        this.sumEl.textContent = total
    }

    hit(){  
        if (this.state !== "playing") {
            this.messageEl.textContent = `You can't hit, you already ${this.state}.`
            return
        }
        this.drawCard()
        let total = evaluateHand(this.hand).total
        if (total > 21) {
            this.messageEl.textContent = `You busted with a total of ${total} 😭`
            this.state = "lost"
        } else if (total === 21) {
            this.messageEl.textContent = `Blackjack! You have a total of ${total} 🎉`
            this.state = "won"
        } else {
            this.messageEl.textContent = `You have a total of ${total} 🙂`
        }
        this.sumEl.textContent = total
    }
    stand() {
        if (this.state !== "playing") {
            this.messageEl.textContent = `You can't stand, you already ${this.state}.`
            return
        }
        this.messageEl.textContent = `You chose to stand with a total of ${evaluateHand(this.hand).total} 🙂`
        this.state = "stood"
    }
  

    attach(rootEl){
        this.rootEl = rootEl
        let nameEl = document.createElement("h2")
        nameEl.textContent = this.name
        this.rootEl.appendChild(nameEl)
        this.handEl = document.createElement("ul")
        this.hand.forEach( (card)=>{
            let newCard = document.createElement("li")
            newCard.textContent = card.toString()
            this.rootEl.appendChild(newCard)
        })
        this.rootEl.appendChild(this.handEl)
        this.sumEl = document.createElement("p")
        this.rootEl.appendChild(this.sumEl)
        this.messageEl = document.createElement("p")
        this.rootEl.appendChild(this.messageEl)
        this.rootEl.classList.add("player")
    }
}
class Dealer {
    constructor() {
        this.hand = []
    }
    start() {
        this.state = "playing"
        this.hand = []
        this.handEl.innerHTML = ""
        this.sumEl.textContent = "hidden"
        this.messageEl.textContent = ""
        this.drawCard(true)
        this.drawCard()
    }

    drawCard(hidden=false) {
        let card = draw()
        this.hand.push(card)
        let newCard = document.createElement("li")
        if (hidden) {
            newCard.textContent = "Hidden Card"
        } else {
            newCard.textContent = card.toString()
        }
        this.handEl.appendChild(newCard)
    }


    play() {
        let { soft, total } = evaluateHand(this.hand)
        while (total < 17) {
            this.drawCard()
            total = evaluateHand(this.hand).total
        }
        let message = ""
        if (total > 21) {
            message = `Dealer busted with a total of ${total} 😭`
        } else if (total === 21) {
            message = `Dealer has a blackjack with a total of ${total} 🎉`
        } else {
            message = `Dealer has a total of ${total} 🙂`
        }
        this.sumEl.textContent = total
        this.messageEl.textContent = message
        this.handEl.innerHTML = ""
        this.hand.forEach( (card)=>{
            let newCard = document.createElement("li")
            newCard.textContent = card.toString()
            this.handEl.appendChild(newCard)
        })
    }


    attach(rootEl){
        this.rootEl = rootEl
        let nameEl = document.createElement("h2")
        nameEl.textContent = "Dealer"
        this.rootEl.appendChild(nameEl)
        this.handEl = document.createElement("ul")
        this.hand.forEach( (card)=>{
            let newCard = document.createElement("li")
            newCard.textContent = card.toString()
            this.rootEl.appendChild(newCard)
        })
        this.rootEl.appendChild(this.handEl)
        this.sumEl = document.createElement("p")
        this.rootEl.appendChild(this.sumEl)
        this.messageEl = document.createElement("p")
        this.rootEl.appendChild(this.messageEl)
        this.rootEl.classList.add("player")
    }
}





function evaluateHand(cards) {
    let total = 0
    let aces = 0
    cards.forEach( (card)=>{   
        total += card.getValue()
        if (card.getRank() === "Ace") {
            aces++
        }
    }) 
    let soft = total < 21 && aces > 0
    while (total > 21 && aces > 0) {
        total -= 10
        aces--
    }
    return { soft: soft, total: total}
}


let player = new Player("Player 1")
let dealer = new Dealer()
const dealerEl = document.getElementById("dealer")
const playerEl = document.getElementById("player")
dealer.attach(dealerEl)
player.attach(playerEl)

const hitButton = document.getElementById("hit")
hitButton.addEventListener("click", (e) => {
    player.hit()
    if (player.state === "lost" || player.state === "won") {
        dealer.play()
    }
})
const standButton = document.getElementById("stand")
standButton.addEventListener("click", (e) => {
    player.stand()
    dealer.play()
})
const startButton = document.getElementById("start")
startButton.addEventListener("click", (e) => {
    dealer.start()
    player.start()
})




