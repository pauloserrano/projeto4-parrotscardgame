// HTML Elements
const main = document.querySelector('main.board')
const clock = document.querySelector('.clock span')

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

    // Is an even number between 4 and 14
    while (size % 2 != 0 || size > 14 || size < 4){
        size = prompt('Com quantas cartas você deseja jogar?\n(Insira um valor par entre 4 e 14)')
    }

    return size
}


const getDeckCards = (size) => {
    const maxImages = size / 2
    const cutDeck = shuffleDeck(deckImages).slice(0, maxImages)

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
    clock.innerHTML = 0
    main.innerHTML = ''
}


const setBoard = () => {
    deckSize = getDeckSize()
    const deckCards = getDeckCards(deckSize)

    for (let i = 0; i < deckCards.length; i++){
        main.innerHTML += cardTemplate(deckCards[i])
    }
}

const clockTick = () => {
    clock.innerHTML = Number(clock.innerHTML) + 1
}

const runGame = () => {
    const cards = document.querySelectorAll('.card')
        
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const isFlipped = card.classList.contains('flipped')
    
            if (!isFlipped && cardStack.length !== 2){
                moves += 1
                cardStack.push(card)
                card.classList.add('flipped')
            
            } if (cardStack.length === 2){
                setTimeout(matchHandler, 1000)
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

    if (matches === deckSize / 2){
        alert(`Parabéns! Você ganhou em ${moves} jogadas e ${clock.innerHTML} segundos!`)
        let restart = prompt('Deseja jogar novamente?\n(Digite sim ou não)')
        
        while (restart != 'sim' && restart != 'não'){
            restart = prompt('Por favor digite apenas "sim" ou "não"')
        }

        if (restart == 'sim'){
            resetGame()
            setBoard()
            runGame()
        
        } else if (restart == 'não'){
            alert('Obrigado por jogar! =)')
            clearInterval(clockInterval)
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


// Jump Start
resetGame()
setBoard()
let clockInterval = setInterval(clockTick, 1000)
runGame()
