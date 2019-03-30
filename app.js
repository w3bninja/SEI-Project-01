console.log('JS loaded')

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  let alienArray = [0,1,2,3,4,5,6,7,8,9,15,16,17,18,19,20,21,22,23,24,30,31,32,33,34,35,36,37,38,39]
  const width = 15
  const squares = []
  let spaceshipIndex = [217]
  let bulletIndex = 0// spaceshipIndex - 15 (width)

  // Create grid
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
  }


  // User spaceship ========================================================
  // Create user spaceship
  squares[spaceshipIndex].classList.add('spaceship')

  // Create function to move user spaceship -------------------------------

  function moveSpaceship() {
    // find the square with the class of spaceship
    const spaceship = squares.find(square => square.classList.contains('spaceship'))
    // remove the class of spaceship from that square
    spaceship.classList.remove('spaceship')
    // add the class of player to square the player should move to
    squares[spaceshipIndex].classList.add('spaceship')
  }

  // Add event listener to move user moveSpaceship ------------------------

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


  // User Bullet ===============================================
  // squares[bulletIndex].classList.add('bullet') -- delete this line?


  // Added event listener on space bar to fire bullet ----------------------

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 32) {
      for (var i = 0; i < 8; i++) {
      bulletIndex = squares[spaceshipIndex - width].classList.add('bullet')
    }
    }
  })

  // Add set interval to make user bullet move up grid
  // 
  // setInterval(() => {
  //   // remove the class of activeAlien from that square
  //   alienArray.forEach(alien => {
  //     squares[alien].classList.remove('activeAlien')
  //   })
  //
  //   // create if statement to determine whether alien array should move down, left or right
  //   // alienArray = alienArray.map(alien => alien + 15)
  //   // alienArray = alienArray.map(alien => alien - 1)
  //
  //   //  overwrite the alien array by adding 1 to each square (move to right)
  //   alienArray = alienArray.map(alien => alien + 1)
  //
  //   // add the class of activealien to each square
  //   alienArray.forEach(alien => {
  //     squares[alien].classList.add('activeAlien')
  //   })
  //
  // }, 500)


  // Aliens ================================================================

  // Create alien array
  alienArray.forEach(alien => {
    console.log('alien array foreach', squares[alien])
    squares[alien].classList.add('activeAlien')
  })
  console.log(alienArray)

  // Create function to move aliens ----------------------------------------

  setInterval(() => {
    // remove the class of activeAlien from that square
    alienArray.forEach(alien => {
      squares[alien].classList.remove('activeAlien')
    })

    // create if statement to determine whether alien array should move down, left or right
    // alienArray = alienArray.map(alien => alien + 15)
    // alienArray = alienArray.map(alien => alien - 1)

    //  overwrite the alien array by adding 1 to each square (move to right)
    alienArray = alienArray.map(alien => alien + 1)

    // add the class of activealien to each square
    alienArray.forEach(alien => {
      squares[alien].classList.add('activeAlien')
    })

  }, 500)


  // create new array to add active class

  // right: index+1 - if(index%width < width-1)
  // down: index+width - if(index+width <= width*width-1)
  // left: index-1 - if(index%width > 0)
  // up: index-width - if(index-width >= 0)

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
