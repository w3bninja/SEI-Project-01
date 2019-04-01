console.log('JS loaded')

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const width = 15
  let alienArray = [0,1,2,3,4,5,6,7,8,9,15,16,17,18,19,20,21,22,23,24,30,31,32,33,34,35,36,37,38,39]
  const movement = [1,1,1,1,1,width,-1,-1,-1,-1,-1,width]
  let currentMove = 0
  const squares = []
  let spaceshipIndex = [217]

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
      setInterval(() => {
        if(bulletIndex - width >= 0) {
          squares[bulletIndex].classList.remove('bullet')
          bulletIndex -= width
          squares[bulletIndex].classList.add('bullet')
        } else {
          squares[bulletIndex].classList.remove('bullet')
        }
      }, 500)
    }
  })

  // ALIENS ===================================================================
  // Create alien array
  alienArray.forEach(alien => {
    console.log('alien array foreach', squares[alien])
    squares[alien].classList.add('activeAlien')
  })
  console.log(alienArray)

  // Create function to move aliens -------------------------------------------
  function moveAliens() {
    setInterval(() => {
      // Loop through aliens
      alienArray.forEach(alien => {
        //remove all aliens
        squares[alien].classList.remove('activeAlien')
      })
      //find new alien positions
      alienArray = alienArray.map(alien => alien + movement[currentMove])
      //add class of alien to all aliens
      alienArray.forEach(alien => {
        squares[alien].classList.add('activeAlien')
      })
      // increment currentMove
      currentMove++
      // when currentMove === width currentMove = 0
      if (currentMove === movement.length) {
        currentMove = 0
      }
    }, 500)
  }

  moveAliens()

  // ALIEN DROP BOMB Function -------------------------------------------------
  // Loop through alien array (forEach) and at random (see whack a mole homework (but use 30 --> amount of aliens) make aliens drop bombs at set interval --> similar to spaceship missile but on set interval, not event listener)

  // Set bomb to drop every 3 seconds (by calling alien bomb function)
  const alienBombId = setInterval(alienBomb, 2500)

  function alienBomb() {
    // setInterval(() => {
    let randomIndex = Math.floor(Math.random() * 10) // create random number to drop bombs from just bottom array of aliens
    let bombIndex = alienArray[randomIndex]
    setInterval(() => {
      if (bombIndex + width <= 224) {
        squares[bombIndex].classList.remove('bomb')
        bombIndex += width
        squares[bombIndex].classList.add('bomb')
      } else {
        squares[bombIndex].classList.remove('bomb')
      }
    }, 500)
    // }, 2000)
  }

  alienBomb()


  // Loop over array of aliens to add active class (when moving)
  // alienArray.forEach(element, index, array) => {
  // alienArray.classList.add('activeAlien')
  // use .push() and .pop() to add and remove active Alien class
  //
  //  })


  // Function - combine the above in a function moveAliens
  // Use modulus ----> if alienArray modulus x === 0, then move down


  // KEEP BRACKETS BELOW

})
