// HTML Elements
const main = document.querySelector('main.board')

// Variables
let cardStack = []
let matches = 0
let moves = 0
let deckSize
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

const resetGame = () => {
    matches = 0
    moves = 0
    main.innerHTML = ''
}

const setBoard = () => {
    deckSize = getDeckSize()
    const deckCards = getDeckCards(deckSize)

    for (let i = 0; i < deckCards.length; i++){
        main.innerHTML += cardTemplate(deckCards[i])
    }
}

const runGame = () => {
    setBoard()
    const cards = document.querySelectorAll('.card')
        
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const isFlipped = card.classList.contains('flipped')
            moves += 1
    
            if (!isFlipped){
                card.classList.add('flipped')
                cardStack.push(card)
            
            } if (cardStack.length === 2){
                setTimeout(matchHandler, 1000)
                console.log(matches, deckSize)
            }
        })
    })
}

const matchHandler = () => {
    const firstCard = cardStack[0].querySelector('.card-back')
    const secondCard = cardStack[1].querySelector('.card-back')
    const isMatch = firstCard.classList[1] === secondCard.classList[1]

    if (isMatch) {
        matches += 1
    
    } else {
        cardStack.forEach(card => card.classList.remove('flipped'))
    
    }
    cardStack = []
    console.log(matches, firstCard, secondCard)

    if (matches === deckSize / 2){
        alert(`Parabéns! Você ganhou em ${moves} jogadas!`)
        let restart = prompt('Deseja jogar novamente?\n(Digite sim ou não)')
        
        while (restart != 'sim' && restart != 'não'){
            restart = prompt('Por favor digite apenas "sim" ou "não"')
        }

        if (restart == 'sim'){
            resetGame()
            runGame()
        
        } else if (restart == 'não'){
            alert('Obrigado por jogar! =)')
        }
    }
}


const cardTemplate = (cardImage) => {
    return ` 
        <div class="card">
            <div class="card-front"></div>
            <div class="card-back ${cardImage}"></div>
        </div>
    `
}


// Events
runGame()
