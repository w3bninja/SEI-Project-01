console.log('JS loaded')

//need to add alienBombIds array and do the same as I did for bullets to make bombs stop properly?

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreId = document.getElementById('scoreId')
  const livesId = document.getElementById('livesId')
  const scoreText = document.querySelector('.score')
  const livesText = document.querySelector('.lives')
  const endMessage = document.querySelector('.endMessage')
  const start = document.querySelector('.start')
  const endMessageWin = document.querySelector('.endMessageWin')
  const audio = document.querySelector('audio')
  let scoreTally = 0
  let livesLeft = 3
  const width = 15
  const alienStart = [0,1,2,3,4,5,6,7,8,9,10,15,16,17,18,19,20,21,22,23,24,25,30,31,32,33,34,35,36,37,38,39,40]
  let alienArray = alienStart.slice() // to create new array to use on reset - splice modifies existing array
  const alienMovement = [1,1,1,1,width,-1,-1,-1,-1,width]
  let currentAlienMove = 0
  const squares = []
  let spaceshipIndex = 217
  let gameInPlay = true
  let moveAliensTimerId
  // let alienBombMovementId
  let alienBombMovementIds = []
  let alienBombId
  // let bulletIndex
  let bulletIntervalIds = [] // created array to store multiple ids so they can all be cleared

  start.innerText = 'Play game'

  // Start game function
  function gameInit() {
    squares.forEach(square => square.classList.remove('activeAlien', 'explosion', 'spaceship', 'bullet', 'bomb'))
    console.log(squares.map(square => square.className).join(''))
    gameInPlay = true
    grid.classList.remove('hidden')
    scoreText.classList.remove('hidden')
    livesText.classList.remove('hidden')
    start.classList.add('hidden')
    currentAlienMove = 0
    alienArray = alienStart.slice()
    createAlien()
    moveAliensTimerId = setInterval(moveAliens, 600)
    alienBombId = setInterval(alienBomb, 500)
    spaceshipIndex = 217
    squares[spaceshipIndex].classList.add('spaceship')
    livesLeft = 3 // needs to be updated so this listens to livesleft at top of code
    scoreTally = 0
    scoreId.innerText = 0
    livesId.innerText = 3
    endMessage.classList.add('hidden')
    endMessageWin.classList.add('hidden')
    // bulletAudio()
    // collisionTop()

  }

  // Create grid --------------------------------------------------------------
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square) //creates new array of divs
    grid.appendChild(square)
  }

  // USER SPACESHIP ===========================================================
  function moveSpaceship() {
    // find the square with the class of spaceship
    const spaceship = squares.find(square => square.classList.contains('spaceship'))
    // remove the class of spaceship from that square
    spaceship.classList.remove('spaceship')
    // add the class of player to square the player should move to
    squares[spaceshipIndex].classList.add('spaceship')
  }

  // ALIENS ===================================================================
  // Create alien array
  function createAlien() {
    alienArray.forEach(alien => {
      // console.log('alien array foreach', squares[alien])
      squares[alien].classList.add('activeAlien')
    })
  }
  // console.log(alienArray)

  // Create function to move aliens -------------------------------------------
  function moveAliens() {
    // Loop through aliens
    alienArray.forEach(alien => {
      //remove all aliens
      squares[alien].classList.remove('activeAlien')
    })
    //find new alien positions
    alienArray = alienArray.map(alien => alien + alienMovement[currentAlienMove])
    //add class of alien to all aliens
    alienArray.forEach(alien => {
      squares[alien].classList.add('activeAlien')
    })
    // increment currentMove
    currentAlienMove++
    // when currentMove === width currentMove = 0
    if (currentAlienMove === alienMovement.length) currentAlienMove = 0
    if (alienArray.some(alien => alien >= 210)) {
      gameOver()
    }
    // let bottomAliens = alienArray.slice(20)
  }

  // ALIEN DROP BOMB Function -------------------------------------------------
  function alienBomb() {
    // const alienBombId = setInterval(() => {
    let bombIndex = alienArray[Math.floor(Math.random() * alienArray.length)]

    const alienBombMovementId = setInterval(() => { // problem with stopping this interval
      if (bombIndex + width <= 300) { //Changed to <= 500 as it was killing user too early when <= 210
        squares[bombIndex].classList.remove('bomb')
        bombIndex += width
        if(!squares[bombIndex]) {
          clearInterval(alienBombMovementId)
          return false
        }
        squares[bombIndex].classList.add('bomb') // causing error in console because squares[bombIndex] doesn't exist
      } else {
        squares[bombIndex].classList.remove('bomb')
      }
      if (squares[bombIndex].classList.contains('spaceship')) {
        squares[bombIndex].classList.remove('bomb')
        clearInterval(alienBombMovementId)
        loseLife()
      }
      console.log('hello')
    }, 500)
    alienBombMovementIds.push(alienBombMovementId)

    // }, 2000)
  }

  // Lose life function ========================================================
  function loseLife() {
    if (gameInPlay) livesLeft--
    if (livesLeft !== 0) {
      livesId.innerText = livesLeft
    } else {
      livesId.innerText = 0 // cheat here and use 0? sometimes lives keeps going below 0
      gameOver()
    }
  }

  // function collisionTop() {
  //   if (bulletIndex.some(bullet => bullet >= 14)) {
  //     bulletIndex.classList.add('explosion')
  //   }
  // }

  function gameOver() {
    gameInPlay = false
    clearInterval(alienBombId)
    alienBombId = null
    clearInterval(moveAliensTimerId)
    moveAliensTimerId = null
    alienBombMovementIds.forEach(alienBombMovementId => clearInterval(alienBombMovementId))
    alienBombMovementIds = []
    bulletIntervalIds.forEach(bulletIntervalId => clearInterval(bulletIntervalId))
    bulletIntervalIds = [] // store in array so we can loop through array to clear intervals
    endMessage.classList.remove('hidden')
    endMessage.innerText = 'Game Over'
    grid.classList.add('hidden')
    start.innerText = 'Play game'
    start.classList.remove('hidden')
    scoreId.classList.remove('hidden')
    livesId.classList.remove('hidden')
    // livesLeft = 0
    livesId.innerText = livesLeft
  }

  function userWins() {
    gameInPlay = false
    clearInterval(alienBombId)
    alienBombId = null
    clearInterval(moveAliensTimerId)
    moveAliensTimerId = null
    alienBombMovementIds.forEach(alienBombMovementId => clearInterval(alienBombMovementId))
    alienBombMovementIds = []
    bulletIntervalIds.forEach(bulletIntervalId => clearInterval(bulletIntervalId))
    bulletIntervalIds = [] // store in array so we can loop through array to clear intervals
    endMessageWin.classList.remove('hidden')
    endMessageWin.innerText = 'Nice one, you win!'
    grid.classList.add('hidden')
    start.innerText = 'Play game'
    start.classList.remove('hidden')
    scoreId.classList.remove('hidden')
    livesId.classList.remove('hidden')
    // livesLeft = 0
    livesId.innerText = livesLeft
  }

  function bulletAudio() {
    audio.src = 'sounds/bullet.m4a'
    audio.play()
  }
  // Add event listener to move user moveSpaceship ---------------------------
  document.addEventListener('keydown', (e) => {
    switch(e.keyCode) {
      case 37:
        //left
        if(spaceshipIndex % width > 0) {
          spaceshipIndex--
          moveSpaceship()
        }
        break
      case 39:
        //right
        if(spaceshipIndex % width < width - 1) {
          spaceshipIndex++
          moveSpaceship()
        }
        break
    }
  })

  // USER BULLET ==============================================================
  document.addEventListener('keydown', (e) => {
    let bulletIndex = spaceshipIndex
    if(e.keyCode === 32) {
      bulletAudio()

      const bulletIntervalId = setInterval(() => {
        if(bulletIndex - width >= 0) {
          squares[bulletIndex].classList.remove('bullet')
          bulletIndex -= width
          squares[bulletIndex].classList.add('bullet')
        } else {
          squares[bulletIndex].classList.remove('bullet')
        }
        if (squares[bulletIndex].classList.contains('activeAlien')) {
          squares[bulletIndex].classList.remove('bullet')
          squares[bulletIndex].classList.remove('activeAlien')
          squares[bulletIndex].classList.add('explosion') // turn this into explosion function?
          setTimeout(() => {
            squares[bulletIndex].classList.remove('explosion')
          }, 200)
          clearInterval(bulletIntervalId)
          const alienIndex = alienArray.indexOf(bulletIndex)
          alienArray.splice(alienIndex,1)
          scoreTally++
          scoreId.innerText = scoreTally
        }
        if (alienArray.length === 0) {
          userWins()
        }
        if (bulletIndex <= 14 && bulletIndex >= 0) {
          squares[bulletIndex].classList.remove('bullet')
          squares[bulletIndex].classList.add('explosion') // turn this into explosion function?
          setTimeout(() => {
            squares[bulletIndex].classList.remove('explosion')
          }, 200)
          clearInterval(bulletIntervalId)

        }
      }, 500)

      bulletIntervalIds.push(bulletIntervalId)
    }
  })


  start.addEventListener('click', gameInit)

  // reset.addEventListener('click', resetGame)

  // KEEP BRACKETS BELOW

})
