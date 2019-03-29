console.log('JS loaded')

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const width = 15
  const squares = []

// Create grid
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('DIV')
    squares.push(square)
    grid.appendChild(square)
  }
//
// // Select aliens
//  const alienArray = [
//
//  ]

  // Loop over array of aliens
//  alienArray.forEach(element, index, array) => {
//    alienArray.classList.add('active')
//
//  })
//
//  classList.add('activeAlien')
// }


})
