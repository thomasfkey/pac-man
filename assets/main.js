//Variables choisir entre pac-man et ms-pac-man
const choosePlayer = document.querySelector('.choosePlayer')
const boyButton = document.querySelector('#boy')
const girlButton = document.querySelector('#girl')
const confirmBoy = document.querySelector('.confirmBoy')
const confirmGirl = document.querySelector('.confirmGirl')
const playBoy = document.querySelector('#playBoy')
const playGirl = document.querySelector('#playGirl')
const backBoy = document.querySelector('#backBoy')
const backGirl = document.querySelector('#backGirl')

//Variables saisir nom et débuter de la partie
const inputName = document.querySelector('input[type="text"]')
const namePage = document.querySelector('.namePage')
const startButton = document.querySelector('button[type="submit"]')
const playerName = document.querySelector('#playerName')
const gamePage = document.querySelector('.gamePage')

//Variables game over, rejouer ou voir score
const gameOverPage = document.querySelector('.gameOverPage')
const scoreButton = document.querySelector('#scoreButton')
const resultPage = document.querySelector('.resultPage')
const newGame = document.querySelector('#newGame')

//Variables globales
const map = document.querySelector('.map')
const pacMan = document.querySelector('img[src="./assets/img/pac-man.gif"]')
const redGhost = document.querySelector('img[src="./assets/img/red-ghost.gif"]')
const blueGhost = document.querySelector('img[src="./assets/img/blue-ghost.gif"]')
const pinkGhost = document.querySelector('img[src="./assets/img/pink-ghost.gif"]')
const maze = document.querySelector('img[src="./assets/img/background.svg"]')
const directions = [ 'toLeft', 'toRight', 'toTop', 'toBottom' ]

let pacManInterval
let redGhostInterval
let blueGhostInterval
let pinkGhostInterval
let userScore = 0
let level = 1
let currentRedGhostDirection
let currentBlueGhostDirection
let currentPinkGhostDirection
let pseudo

//Collection des murs axe horizontal droite-gauche
const blockedSquaresToLeft = [
    {top:300, left:200},{top:500, left:200},{top:700, left:200},{top:200, left:300},{top:300, left:300},{top:500, left:300},{top:800, left:300},
    {top:0, left:500}, {top:200, left:500}, {top:600, left:500}, {top:800, left:500}, {top:400, left:600}, {top:200, left:700}, {top:300, left:700},
    {top:500, left:700}, {top:800, left:700}, {top:700, left:800},
    //Ligne en left 0
    {top:0, left:0}, {top:100, left:0}, {top:200, left:0}, {top:600, left:0}, {top:700, left:0}, {top:800, left:0},{top:900, left:0},
    // Polygone du milieu
    {top:400, left:400}, {top:400, left:500}
]
//Collection des murs axe horizontal gauche-droite
const blockedSquaresToRight = [
    {top:700, left:100}, {top:200, left:200}, {top:300, left:200}, {top:500, left:200}, {top:800, left:200}, {top:400, left:300},
    {top:0, left:400}, {top:200, left:400}, {top:600, left:400}, {top:800, left:400}, {top:200, left:600}, {top:300, left:600},
    {top:500, left:600}, {top:800, left:600}, {top:300, left:700}, {top:500, left:700}, {top:700, left:700},
    // Ligne en left 900
    {top:0, left:900}, {top:100, left:900}, {top:200, left:900}, {top:600, left:900}, {top:700, left:900},
    {top:800, left:900}, {top:900, left:900},
    // Polygone du milieu
    {top:400, left:400}, {top:400, left:500}
]
//Collection des murs axe vertical bas-haut
const blockedSquaresToTop = [
    {top:400, left:0}, {top:600, left:0}, {top:800, left:0}, {top:100, left:100}, {top:200, left:100}, {top:400, left:100}, {top:600, left:100},
    {top:400, left:100}, {top:700, left:100}, {top:900, left:100}, {top:900, left:200}, {top:100, left:300}, {top:300, left:300},
    {top:700, left:300}, {top:900, left:300}, {top:200, left:400}, {top:500, left:400}, {top:600, left:400}, {top:800, left:400},
    {top:200, left:500}, {top:500, left:500}, {top:600, left:500}, {top:800, left:500}, {top:100, left:600}, {top:300, left:600},
    {top:700, left:600}, {top:900, left:600}, {top:900, left:700}, {top:100, left:800}, {top:200, left:800}, {top:400, left:800},
    {top:600, left:800}, {top:700, left:800}, {top:900, left:800}, {top:400, left:900}, {top:600, left:900}, {top:800, left:900} ,
    //Ligne en top 0
    {top:0, left:0}, {top:0, left:100}, {top:0, left:200}, {top:0, left:300}, {top:0, left:400}, {top:0, left:500}, {top:0, left:600},
    {top:0, left:700}, {top:0, left:800}, {top:0, left:900}
]
//Collection des murs axe vertical haut-bas
const blockedSquaresToBottom = [
    {top:200, left:0}, {top:400, left:0}, {top:700, left:0}, {top:0, left:100}, {top:100, left:100}, {top:200, left:100}, {top:400, left:100},
    {top:600, left:100}, {top:800, left:100}, {top:800, left:200}, {top:0, left:300}, {top:200, left:300}, {top:600, left:300}, {top:800, left:300},
    {top:100, left:400}, {top:300, left:400}, {top:500, left:400}, {top:700, left:400}, {top:100, left:500}, {top:300, left:500}, {top:500, left:500},
    {top:700, left:500}, {top:0, left:600}, {top:200, left:600}, {top:600, left:600}, {top:800, left:600}, {top:800, left:700}, {top:0, left:800},
    {top:100, left:800}, {top:200, left:800}, {top:400, left:800}, {top:600, left:800}, {top:800, left:800}, {top:200, left:900}, {top:400, left:900},
    {top:700, left:900},
    //Ligne en top 900
    {top:900, left:0}, {top:900, left:100}, {top:900, left:200}, {top:900, left:300}, {top:900, left:400}, {top:900, left:500}, {top:900, left:600},
    {top:900, left:700}, {top:900, left:800}, {top:900, left:900},
    // Polygone du milieu
    {top:400, left:400}, {top:400, left:500}
]

//Récuperer la position d'un élément
const getPositionOf = (element) => {
    const top = Number(element.dataset.top)
    const left = Number(element.dataset.left)
    return { top, left }
}

const isTheCharacterBlocked = (characterPositon, movingDirection) => {    
    let blockedSquares
    switch (movingDirection) {
        case 'toLeft':
            blockedSquares = blockedSquaresToLeft
            break
        case 'toRight':
            blockedSquares = blockedSquaresToRight
            break
        case 'toTop':
            blockedSquares = blockedSquaresToTop
            break
        case 'toBottom':
            blockedSquares = blockedSquaresToBottom
            break
    }
    return blockedSquares.some(square => {
        const topsAreEquals = characterPositon.top === square.top
        const leftsAreEquals = characterPositon.left === square.left
        return topsAreEquals && leftsAreEquals
    })
}

//Mouvements de Pac-man, score et level
let movePacMan = (to) => {
    clearInterval(pacManInterval)

    pacMan.className = to

    let pacManPosition = getPositionOf(pacMan)

    pacManInterval = setInterval(() => {
        if (!isTheCharacterBlocked(pacManPosition, to)) {
            move(pacMan, pacManPosition, to)
            pacManPosition = getPositionOf(pacMan);
            gameOver()

            const dots = document.querySelectorAll('.dot')
            dots.forEach((dot) => {
                const dotPosition = getPositionOf(dot)
                if ((dotPosition.top === pacManPosition.top) && (dotPosition.left === pacManPosition.left)) {
                    userScore++;
                    map.removeChild(dot);
                    document.getElementById('userScore').innerHTML = userScore;
                    if (userScore === 89*level) {
                        level++
                        displayDots()
                        document.getElementById('level').innerHTML = level;
                        if (level >= 2){
                            clearInterval(redGhostInterval)
                            redGhostInterval = setInterval(() => {
                                moveToPacMan(redGhost)
                                gameOver()
                            },500)
                        }
                        if (level >= 3){
                            clearInterval(blueGhostInterval)
                            blueGhostInterval = setInterval(() => {
                                moveToPacMan(blueGhost)
                                gameOver()
                            },500)
                        }
                    }
                }
            })
        }
    }, 250)
}

addEventListener('keydown', e => {
    switch (e.keyCode) {
        case 37:
            movePacMan('toLeft')
            break
        case 39:
            movePacMan('toRight')
            break
        case 38:
            movePacMan('toTop')
            break
        case 40:
            movePacMan('toBottom')
            break
    }
})

//Mouvements des fantômes
let moveRedGhost = () => {
    clearInterval(redGhostInterval)

    let redGhostPosition = getPositionOf(redGhost)

    const randomInt = Math.floor(Math.random() * 4)
    const randomDirection = directions[randomInt]

    redGhostInterval = setInterval(() => {
        currentRedGhostDirection = randomDirection

        if (!isTheCharacterBlocked(redGhostPosition, randomDirection)) {
            move(redGhost, redGhostPosition, randomDirection)
            redGhostPosition = getPositionOf(redGhost)
            gameOver()
        } else {
            moveRedGhost() // La fonction est relancée si le fantôme est bloqué
            return
        }
    }, 250)
}

let moveBlueGhost = () => {
    clearInterval(blueGhostInterval)

    let blueGhostPosition = getPositionOf(blueGhost)

    const randomInt = Math.floor(Math.random() * 4)
    const randomDirection = directions[randomInt]

    blueGhostInterval = setInterval(() => {
        currentBlueGhostDirection = randomDirection

        if (!isTheCharacterBlocked(blueGhostPosition, randomDirection)) {
            move(blueGhost, blueGhostPosition, randomDirection)
            blueGhostPosition = getPositionOf(blueGhost)
            gameOver()
        } else {
            moveBlueGhost() // La fonction est relancée si le fantôme est bloqué
            return
        }
    }, 250)
}

let movePinkGhost = () => {
        clearInterval(pinkGhostInterval)
        pinkGhostInterval = setInterval(() => {
            moveToPacMan(pinkGhost)
            gameOver()
        },500)
}

//Mouvements de base
const move = (character, from, to) => {
    switch (to) {
        case 'toLeft':
            character.dataset.left = from.left === 0 ? 900 : from.left - 100
            character.style.left = from.left === 0 ? "900px" : from.left - 100 + "px"
            break
        case 'toRight':
            character.dataset.left = from.left === 900 ? 0 : from.left + 100
            character.style.left = from.left === 0 ? "0 px" : from.left + 100 + "px"
            break
        case 'toTop':
            character.dataset.top = from.top - 100
            character.style.top = from.top - 100 + "px"
            break
        case 'toBottom':
            character.dataset.top = from.top + 100
            character.style.top = from.top + 100 + "px"
            break
    }
}

//Les fantômes poursuivent pac-man
const moveToPacMan = (ghost) => {
    const pacManPosition = getPositionOf(pacMan)
    const ghostPosition = getPositionOf(ghost)
    const delta = getDelta(pacManPosition, ghostPosition)
    let direction
    if (delta.top === delta.left) direction = [delta.topDirection, delta.leftDirection][Math.floor(Math.random() * 2)]
    if (delta.topDirection === null) direction = delta.leftDirection
    else if (delta.leftDirection === null) direction = delta.topDirection
    else direction = delta.top < delta.left ? delta.topDirection : delta.leftDirection

    if (isTheCharacterBlocked(ghostPosition, direction)) {
        direction = direction === delta.topDirection ? delta.leftDirection : delta.topDirection
        if (direction === null) {
            let otherDirections = directions.filter(direction => direction !== delta.topDirection && direction !== delta.leftDirection)
            direction = otherDirections[Math.floor(Math.random() * 2)]
        }
        console.log('direction:', direction)
    }

    while (isTheCharacterBlocked(ghostPosition, direction)) {
        let otherDirections = directions.filter(direction => direction !== delta.topDirection && direction !== delta.leftDirection)
        direction = otherDirections[Math.floor(Math.random() * 2)]
    }
    move(ghost, ghostPosition, direction)
}

const getDelta = (pacManPosition, ghostPosition) => {
    const top = pacManPosition.top - ghostPosition.top
    const left = pacManPosition.left - ghostPosition.left
    let topDirection, leftDirection
    if (top === 0) topDirection = null
    else topDirection = top > 0 ? 'toBottom' : 'toTop'
    if (left === 0) leftDirection = null
    else leftDirection = left > 0 ? 'toRight' : 'toLeft'
    return { top, left, topDirection, leftDirection }
}

//Game over
const gameOver = () => {
    const pacManPosition = getPositionOf(pacMan)
    const redGhostPosition = getPositionOf(redGhost)
    const blueGhostPosition = getPositionOf(blueGhost)
    const pinkGhostPosition = getPositionOf(pinkGhost)
    if ((redGhostPosition.top === pacManPosition.top && redGhostPosition.left === pacManPosition.left)
        || (blueGhostPosition.top === pacManPosition.top && blueGhostPosition.left === pacManPosition.left)
        || (pinkGhostPosition.top === pacManPosition.top && pinkGhostPosition.left === pacManPosition.left))
    {
        console.log('GAME OVER')
        isGameOver()
        return true
    }
    return false
}

//Évenements après que Pac-man ce soit fait attrapé
const isGameOver = () => {
    movePacMan = moveRedGhost = moveBlueGhost = movePinkGhost = null
    gameOverPage.style.display = "flex"
    gamePage.style.opacity = "0.7"

    //Envoi des données au serveur
    let userName = document.getElementById('name').value;
    pseudo = userName;
    let sendPlayerInfo = function (pseudo, userScore) {
        let info = {
            player_name: pseudo,
            player_score: userScore,
        }
        return info
    }

    let Register = function () {
        let playerInfo = sendPlayerInfo(pseudo, userScore)

        fetch('index.php?controller=user', {
            method: 'POST',
            headers : new Headers(),
            body: JSON.stringify(playerInfo)
        }).then((res) => res.text())
            .then((data) => {
                console.log(data)
            })
        }
        Register()
}

//Afficher les pac-gums
const displayDots = () => {
    for(let col = 0; col < 10; col++){
        for(let row = 0; row < 10; row++){
            const dot = document.createElement('div')
            dot.className = 'dot'
            dot.dataset.top = row * 100
            dot.dataset.left = col * 100
            dot.style.top = row * 100 + 'px'
            dot.style.left = col * 100 + 'px'
            map.insertBefore(dot, pacMan)
        }
    }
    map.removeChild(map.children[3]);
    map.removeChild(map.children[4]);
    map.removeChild(map.children[11]);
    map.removeChild(map.children[12]);
    map.removeChild(map.children[40]);
    map.removeChild(map.children[49]);
    map.removeChild(map.children[49]);
    map.removeChild(map.children[76]);
    map.removeChild(map.children[77]);
    map.removeChild(map.children[84]);
    map.removeChild(map.children[85]);
}

const start = () => {
    displayDots()
    moveRedGhost()
    moveBlueGhost()
    movePinkGhost()
}

//Choisir entre pac-man et ms-pac-man
boyButton.addEventListener('click', (e) => {
    e.preventDefault()
    choosePlayer.style.display = "none"
    confirmBoy.style.display = "flex"
})
girlButton.addEventListener('click', (e) => {
    e.preventDefault()
    choosePlayer.style.display = "none"
    confirmGirl.style.display = "flex"
    pacMan.src = "./assets/img/ms-pac-man.gif"
    maze.src = "./assets/img/background2.svg"
})

//Confirmer le choix de son joueur
playBoy.addEventListener('click', (e) => {
    e.preventDefault()
    confirmBoy.style.display = "none"
    namePage.style.display = "flex"
    gamePage.style.display = "flex"
})
playGirl.addEventListener('click', (e) => {
    e.preventDefault()
    confirmGirl.style.display = "none"
    namePage.style.display = "flex"
    gamePage.style.display = "flex"
})

//Retourner au choix du joueur
backBoy.addEventListener('click', (e) => {
    e.preventDefault()
    choosePlayer.style.display = "flex"
    confirmBoy.style.display = "none"
})
backGirl.addEventListener('click', (e) => {
    e.preventDefault()
    choosePlayer.style.display = "flex"
    confirmGirl.style.display = "none"
})

//Appuyer sur start pour commencer la partie
startButton.addEventListener('click', (e) => {
    e.preventDefault()
    start()
    namePage.style.display = "none"
    gamePage.style.opacity = "1"
    playerName.innerHTML = inputName.value;
})

//Affichage du score et récupération des données de la db
let scores = []
const tableScore = document.getElementById('tableScore')
scoreButton.addEventListener('click', (e) => {
    e.preventDefault()
    gamePage.style.display = "none"
    gameOverPage.style.display = "none"
    resultPage.style.display = "flex"
    fetch('index.php?controller=score').then(
        result => {
            return result.json()
        }).then(
            json => {
                console.log(json)
                scores = json
                const scoresList = scores.map(score => `<tr><td>${score.player_name}</td><td>${score.player_score}</td></tr>`)
                const tableScoreContent = scoresList.join('')
                tableScore.innerHTML = tableScoreContent
            }
        ).catch(
            error => console.error(error)
        )
})