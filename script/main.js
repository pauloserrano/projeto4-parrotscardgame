// HTML Elements
const main = document.querySelector('main.board')

// Variables
let deckImages = [
    'bobrossparrot',
    'explodyparrot',
    'fiestaparrot',
    'metalparrot',
    'revertitparrot',
    'tripletsparrot',
    'unicornparrot'
]


// Functions
const getDeckSize = () => {
    let size

    while (size % 2 != 0 || size > 14 || size < 4){
        size = prompt('Com quantas cartas você deseja jogar?\n(Insira um valor par entre 4 e 14)')
    }

    return size
}


const getDeckCards = (size) => {
    const maxCards = size / 2
    const cutDeck = shuffleDeck(deckImages).slice(0, maxCards)

    for (let i = 0; cutDeck.length < size; i++){
        cutDeck.push(cutDeck[i])
    }

    return shuffleDeck(cutDeck)
}


const shuffleDeck = (deck) => {
    return deck.sort(() => Math.random() - 0.5)
}


const setGame = () => {
    // const deckSize = getDeckSize()
    const deckSize = 8
    const deckCards = getDeckCards(deckSize)

    for (let i = 0; i < deckCards.length; i++){
        main.innerHTML += cardTemplate(deckCards[i])
    }
}


const cardTemplate = (cardImage) => {
    return ` 
        <div class="card flipped" onclick="this.classList.toggle('flipped')">
            <div class="card-front"></div>
            <div class="card-back ${cardImage}"></div>
        </div>
    `
}


const flipCard = (e) => {
    e.classList.toggle('.flipped')
}


// Events
window.addEventListener('load', () => {
    setGame()
})
