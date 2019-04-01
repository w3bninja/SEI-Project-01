console.log('JS loaded')

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const score = document.querySelector('.score')
  let scoreTally = 0
  const width = 15
  let alienArray = [0,1,2,3,4,5,6,7,8,9,15,16,17,18,19,20,21,22,23,24,30,31,32,33,34,35,36,37,38,39]
  const alienMovement = [1,1,1,1,1,width,-1,-1,-1,-1,-1,width]
  let currentAlienMove = 0
  const squares = []
  let spaceshipIndex = [217]
  // let bombIndex
  // let bulletIndex = []

  // Create grid ------------------------------------- -------------------------
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
          const alienIndex = alienArray.indexOf(bulletIndex)
          alienArray.splice(alienIndex,1)
          scoreTally++
          score.innerText = scoreTally
          // use splice to get rid of that one alien you hit with bullet
          // first argument is the index, second is how many aliens you want to remove (1)
        }
      }, 500)
    }
  })

  // ALIENS ===================================================================
  // Create alien array
  alienArray.forEach(alien => {
    // console.log('alien array foreach', squares[alien])
    squares[alien].classList.add('activeAlien')
  })
  console.log(alienArray)

  // Create function to move aliens -------------------------------------------
  // function moveAliens() {
  const moveAliensTimerId = setInterval(() => {
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
    if (alienArray.some(alien => alien >= 210)) clearInterval(moveAliensTimerId)

    // let bottomAliens = alienArray.slice(20)

  }, 700)
  //}
  
  // moveAliens()

  // ALIEN DROP BOMB Function -------------------------------------------------
  // Loop through alien array (forEach) and at random (see whack a mole homework (but use 30 --> amount of aliens) make aliens drop bombs at set interval --> similar to spaceship missile but on set interval, not event listener)

  // Set bomb to drop every 2.5 seconds (by calling alien bomb function)
  const alienBombId = setInterval(alienBomb, 2500)

  function alienBomb() {
    // setInterval(() => {
    let randomIndex = Math.floor(Math.random() * 29) // need timeout create random number to drop bombs from just bottom array of aliens
    let bombIndex = alienArray[randomIndex]

    setInterval(() => {
      if (bombIndex + width <= 224) {
        squares[bombIndex].classList.remove('bomb')
        bombIndex += width
        squares[bombIndex].classList.add('bomb')
      } else {
        squares[bombIndex].classList.remove('bomb') // Causes error message when player dies
      }
      if (squares[bombIndex].classList.contains('spaceship')) {
        squares[bombIndex].classList.remove('bomb')
        squares[bombIndex].classList.remove('spaceship')
      }

    }, 500)
    // }, 2000)
  }

  alienBomb()

  // KEEP BRACKETS BELOW

})
