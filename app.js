console.log('JS loaded')

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const width = 15
  const squares = []
  let userSpaceshipIndex = 217
  let alienArray = [0,1,2,3,4,5,6,7,8,15,16,17,18,19,20,21,22,23,30,31,32,33,34,35,36,37,38]

  // Create grid
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    squares.push(square)
    grid.appendChild(square)
    console.log(squares)
  }


  // User spaceship ======================================
  // Create user spaceship
  squares[userSpaceshipIndex].classList.add('spaceship')

  // Create function to move user spaceship

  function moveSpaceship() {

  }


  // Aliens ==============================================
  // Create alien alien array

  alienArray.forEach(alien => {
    console.log('alien array foreach', squares[alien])
    squares[alien].classList.add('activeAlien')
  })


  // let alienArray = squares[alienArray].classList.add('activeAlien')
  // }

  // Select aliens -
  // Hard code first? Should be array index [0] to [10] for top row
  // Index [15] to [24] for middle row
  // Index [30] to [44] for bottom row
  // const alienArray = [
  //
  // ]


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

  // Loop over array of aliens to remove active class (when moving)
  // alienArray.forEach(element, index, array) => {
  // alienArray.classList.remove('activeAlien')
  // use .push() and .pop() to add and remove active Alien class

  // Function - combine the above in a function moveAliens
  // Use modulus ----> if alienArray modules x === 0, then move down




})
