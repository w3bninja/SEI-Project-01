console.log('JS loaded')

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const score = document.getElementById('score')
  const lives = document.getElementById('lives')
  const endMessage = document.querySelector('.endMessage')
  const reset = document.querySelector('.reset')
  // const start = document.querySelector('.start')
  let scoreTally = 0
  let livesLeft = 3
  const width = 15
  const alienStart = [0,1,2,3,4,5,6,7,8,9,10,15,16,17,18,19,20,21,22,23,24,25,30,31,32,33,34,35,36,37,38,39,40]
  let alienArray = alienStart
  const alienMovement = [1,1,1,1,width,-1,-1,-1,-1,width]
  let currentAlienMove = 0
  const squares = []
  let spaceshipIndex = [217]
  let gameInPlay = true
  // let bombIndex
  // let bulletIndex = []

  // // Start game function
  // function gameInit() {
  //   // clear intervals
  //   // have most of the below in a start game function
  //   // if (!gameInPlay){
  //   grid.style.display = 'flex'
  //   alienArray = alienStart
  //   createAlien()
  //   const moveAliensTimerId = setInterval(moveAliens, 700)
  //   const alienBombId = setInterval(alienBomb, 2000)
  //   livesLeft = 3
  //   scoreTally = 0
  //   score.innerText = 0
  //   lives.innerText = 3
  //   endMessage.innerText = ''
  //   start.innerText = 'Start'
  // }
  //
  // gameInit()

  // Create grid --------------------------------------------------------------
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
  }

  // USER SPACESHIP ===========================================================
  // Create user spaceship
  squares[spaceshipIndex].classList.add('spaceship')

  // Create function to move user spaceship ----------------------------------
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

  createAlien()
  console.log(alienArray)

  // Create function to move aliens -------------------------------------------
  let moveAliensTimerId = setInterval(moveAliens, 700) // writing is this way because if I put the set interval within the function, the function doesn't listen to gameOver

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
      return gameOver()
    }
    // let bottomAliens = alienArray.slice(20)
  }

  // moveAliens()

  // ALIEN DROP BOMB Function -------------------------------------------------
  // Set bomb to drop every 2.5 seconds (by calling alien bomb function)
  let alienBombId = setInterval(alienBomb, 1500)

  function alienBomb() {
    // const alienBombId = setInterval(() => {
    let bombIndex = alienArray[Math.floor(Math.random() * alienArray.length)]

    const alienBombMovementId = setInterval(() => {
      if (bombIndex + width <= 300) { //Changed to <= 500 as it was killing user too early when <= 210
        squares[bombIndex].classList.remove('bomb')
        bombIndex += width
        squares[bombIndex].classList.add('bomb')
      } else {
        squares[bombIndex].classList.remove('bomb')
      }
      if (squares[bombIndex].classList.contains('spaceship')) {
        squares[bombIndex].classList.remove('bomb')
        clearInterval(alienBombMovementId)
        loseLife()
      }
    }, 500)
    // }, 2000)
  }

  alienBomb() // shouldn't need to invoke here as I've invoked above? If i don't invoke here, bullets don't start falling for 4 seconds

  // lose life function ========================================================
  function loseLife() {
    if (gameInPlay) livesLeft--
    if (livesLeft !== 0) {
      lives.innerText = livesLeft
    } else {
      lives.innerText = 0// cheat here and use 0? sometimes lives keeps going below 0
      gameOver()
    }
  }

  // function userWins(){
  //   //if all aliens have been killed - alien array doesn't have class of activeAlien - use every?
  //   if (alienArray.classList.contains('activeAlien') === false) {
  //     return gameOver()
  //   }
  // }

  // userWins()

  function gameOver() {
    gameInPlay = false
    clearInterval(alienBombId)
    alienBombId = null
    clearInterval(moveAliensTimerId)
    moveAliensTimerId = null
    alienArray.forEach(alien => {
      squares[alien].classList.remove('activeAlien')
    })
    endMessage.innerText = 'Game Over'
    grid.style.display = 'none'
    reset.innerText = 'Play game'
    livesLeft = 0
  }

  //Reset =======================================================================
  function resetGame() {
    // clear intervals
    // have most of the below in a start game function
    // if (!gameInPlay){
    gameInPlay = true
    currentAlienMove = 0
    grid.style.display = 'flex'
    alienArray = alienStart
    createAlien()
    moveAliensTimerId = setInterval(moveAliens, 700)
    alienBombId = setInterval(alienBomb, 2000)
    livesLeft = 3 // needs to be updated so this listens to livesleft at top of code
    scoreTally = 0
    score.innerText = 0
    lives.innerText = 3
    endMessage.innerText = ''
    reset.innerText = ''
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
  // Add event listener on space bar to fire bullet ---------------------------
  document.addEventListener('keydown', (e) => {
    let bulletIndex = spaceshipIndex
    if(e.keyCode === 32) {
      //store bullet interval in variable so it can be stopped when it hits the alien
      const bulletIntervalId = setInterval(() => {
        if(bulletIndex - width >= 0) {
          squares[bulletIndex].classList.remove('bullet')
          bulletIndex -= width
          squares[bulletIndex].classList.add('bullet')
        } else {
          squares[bulletIndex].classList.remove('bullet')
        }
        if (squares[bulletIndex].classList.contains('activeAlien')) {
          clearInterval(bulletIntervalId)
          squares[bulletIndex].classList.remove('bullet')
          squares[bulletIndex].classList.remove('activeAlien')
          squares[bulletIndex].classList.add('explosion')
          setTimeout(() => {
            squares[bulletIndex].classList.remove('explosion')
          }, 300)
          const alienIndex = alienArray.indexOf(bulletIndex)
          alienArray.splice(alienIndex,1)
          scoreTally++
          score.innerText = scoreTally
        }
      }, 500)
    }
  })

  // start.addEventListener('click', gameInit)

  reset.addEventListener('click', resetGame)

  // KEEP BRACKETS BELOW

})
