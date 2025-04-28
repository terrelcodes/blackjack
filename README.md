# Blackjack

An implementation of the classic game for the Scrimba Front End Developer path [project](https://scrimba.com/frontend-path-c0j/~05p).

I learned the rules from [Bicycle](https://bicyclecards.com/how-to-play/blackjack) because the Scrimba instructions were missing a lot of information.

## Summary of game play

* create a hand for each of the players
* place bets
* dealer gives each player two cards face up
* dealer's second card is face down
* each player takes a turn
    - choose: hit or stand
    - if the player busts, dealer collects his bet
    - play passes to the next player
* dealer reveals second card and may draw more cards, according to fixed rules
* winners are determined and winnings collected

## How I did it

### Start with drawing cards

The Scrimba course just selects a random number between 2 and 11. This is a problem, because in an actual game you are 4 times more likely to draw a card with a 10 value than any of the other. I created a card class (I want to be able to display images eventually) and instantiated a deck of 52 cards. The Bicycle sites says that there are usually six decks shuffled together and a blank plastic card is inserted to signal when the deck should be shuffled again. I suppose this is to make card counting harder. I used the Fisher-Yates shuffling algorithm as suggested by Google Gemini.

I am going to ignore muliplayer and betting for now.
