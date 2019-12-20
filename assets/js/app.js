document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid'),
    scoreId = document.getElementById('scoreId'),
    livesId = document.getElementById('livesId'),
    scoreText = document.querySelector('.score'),
    livesText = document.querySelector('.lives'),
    endMessage = document.querySelector('.endMessage'),
    start = document.querySelector('.start'),
	website = document.querySelector('.website'),
    audio = document.querySelector('audio'),
	header = document.querySelector('header'),
	content = document.querySelector('.content'),
	bgremove = document.querySelector('.full-bg'),
    width = 15,
    alienStart = [0,1,2,3,4,5,6,7,8,9,10,15,16,17,18,19,20,21,22,23,24,25,30,31,32,33,34,35,36,37,38,39,40],
    alienMovement = [1,1,1,1,width,-1,-1,-1,-1,width],
    squares = []
  let scoreTally = 0,
    livesLeft = 3,
    alienArray = alienStart.slice(), // to create new array to use on reset - splice modifies existing array
    currentAlienMove = 0,
    spaceshipIndex = 217,
    gameInPlay = true,
    moveAliensTimerId,
    alienBombMovementId,
    alienBombId

  	start.innerHTML = '<img src="./assets/images/play.png">'
	website.innerHTML = '<a href="https://redsixmedia.com">Visit our Website</a>'

  // Start game function
  function gameInit() {
    squares.forEach(square => square.classList.remove('activeAlien', 'explosion', 'spaceship', 'bullet', 'bomb'))
    console.log(squares.map(square => square.className).join(''))
    gameInPlay = true
    grid.classList.remove('hidden')
    scoreText.classList.remove('hidden')
    livesText.classList.remove('hidden')
	header.classList.remove('hidden')
    start.classList.add('hidden')
	website.classList.add('hidden')
	content.classList.add('hidden')
	bgremove.classList.remove('bg-remove')
    currentAlienMove = 0
    alienArray = alienStart.slice()
    createAlien()
    moveAliensTimerId = setInterval(moveAliens, 400)
    alienBombId = setInterval(alienBomb, 600)
    spaceshipIndex = 217
    squares[spaceshipIndex].classList.add('spaceship')
    livesLeft = 3 // needs to be updated so this listens to livesleft at top of code
    scoreTally = 0
    scoreId.innerText = 0
    livesId.innerText = 3
    endMessage.classList.add('hidden')
  }

  // CREATE GRID ===============================================================
  for(let i = 0; i < width * width; i++) {
    const square = document.createElement('div')
    if (i < width) square.classList.add('ceiling')
    if (i > width**2 - width -1) square.classList.add('floor')
    squares.push(square) //creates new array of divs
    grid.appendChild(square)
  }

  // AUDIO =====================================================================
  function bulletAudio() {
    audio.src = './assets/sounds/004_13.wav'
    audio.play()
  }

  function alienBombAudio() {
    audio.src = './assets/sounds/005_14.wav'
    audio.play()
  }
  //
  function loseLifeAudio() {
    audio.src = './assets/sounds/009_18.wav'
    audio.play()
  }

  function gameOverAudio() {
    audio.src = './assets/sounds/016_8.wav'
    audio.play()
  }
  // USER SPACESHIP ============================================================
  function moveSpaceship() {
    // find the square with the class of spaceship
    const spaceship = squares.find(square => square.classList.contains('spaceship'))
    // remove the class of spaceship from that square
    spaceship.classList.remove('spaceship')
    // add the class of player to square the player should move to
    squares[spaceshipIndex].classList.add('spaceship')
  }

  // ALIENS ====================================================================
  function createAlien() { // create alien array
    alienArray.forEach(alien => {
      // console.log('alien array foreach', squares[alien])
      squares[alien].classList.add('activeAlien')
    })
  }

  // MOVE ALIENS ===============================================================
  function moveAliens() {
    alienArray.forEach(alien => {
      squares[alien].classList.remove('activeAlien') // loop through aliens & remove all aliens
    })
    alienArray = alienArray.map(alien => alien + alienMovement[currentAlienMove]) //find new alien positions
    alienArray.forEach(alien => {
      squares[alien].classList.add('activeAlien') //add class of alien to all aliens
    })
    currentAlienMove++     // increment currentMove
    if (currentAlienMove === alienMovement.length) currentAlienMove = 0
    if (alienArray.some(alien => alien >= 210)) {
      gameOver('<img src="./assets/images/game-over.gif" class="img-responsive"><div>Captain Munchkin appreciates your attempt to help her rid the galaxy of BADvertisements. Click PLAY AGAIN to sharpen your skills and have a Merry Sixmas!</div>')//lose
    }
    // let bottomAliens = alienArray.slice(20)
  }

  // ALIEN BOMB ================================================================
  function alienBomb() {
    let bombIndex = alienArray[Math.floor(Math.random() * alienArray.length)]
    //alienBombAudio()

    const alienBombMovementId = setInterval(() => {
      bombIndex = drawBullet(bombIndex, width, 'bomb')
      if (collision(bombIndex, 'spaceship', 'bomb', alienBombMovementId)) {
        loseLife()
      }
      collision(bombIndex, 'floor', 'bomb', alienBombMovementId)
      console.log('hello')
      if(!gameInPlay) clearInterval(alienBombMovementId)
    }, 400)
  }

  // Lose life function ========================================================
  function loseLife() {
    if (gameInPlay) livesLeft--
    if (livesLeft !== 0) {
      livesId.innerText = livesLeft
      //loseLifeAudio()
    } else {
      livesId.innerText = 0 // cheat here and use 0? sometimes lives keeps going below 0
      gameOver('<img src="./assets/images/game-over.gif" class="img-responsive"><div>Captain Munchkin appreciates your attempt to help her rid the galaxy of BADvertisements. Click PLAY AGAIN to sharpen your skills and have a Merry Sixmas!</div>')//lose
    }
  }

  function gameOver(message) {
    gameInPlay = false
    //gameOverAudio()
    clearInterval(alienBombId)
    alienBombId = null
    clearInterval(moveAliensTimerId)
    moveAliensTimerId = null
    clearInterval(alienBombMovementId)
    alienBombMovementId = null
    // moveAliensTimerId = null
    // alienBombMovementIds.forEach(alienBombMovementId => clearInterval(alienBombMovementId))
    // alienBombMovementIds = []
    // bulletIntervalIds.forEach(bulletIntervalId => clearInterval(bulletIntervalId))
    // bulletIntervalIds = [] // store in array so we can loop through array to clear intervals
    endMessage.classList.remove('hidden')
    endMessage.innerHTML = message
    grid.classList.add('hidden')
	header.classList.add('hidden')
    start.innerHTML = '<img src="./assets/images/play.png">'
    start.classList.remove('hidden')
	website.classList.remove('hidden')
    scoreId.classList.remove('hidden')
    livesId.classList.remove('hidden')
	bgremove.classList.add('bg-remove')
    // livesLeft = 0
    livesId.innerText = livesLeft
  }

  function drawBullet(index, next, shot){
    if(squares[index + next]) {
      squares[index].classList.remove(shot)
      index += next
      squares[index].classList.add(shot)
    } else {
      squares[index].classList.remove(shot)
    }
    return index
  }

  // COLLISION =================================================================
  function collision(index, target, shot, interval){
    if (squares[index].classList.contains(target)) {
      console.log(`At ${index}, ${target} hit by ${shot}`)
      squares[index].classList.remove(shot)
      squares[index].classList.add('explosion')
      setTimeout(() => {
        squares[index].classList.remove('explosion')
      }, 300)
      clearInterval(interval)
      return true
    } else return false
  }

  function alienDeath(index){
    squares[index].classList.remove('activeAlien')
    const alienIndex = alienArray.indexOf(index)
    alienArray.splice(alienIndex,1)
  }

  function updateScore(){
    scoreTally++
    scoreId.innerText = scoreTally
  }

  // FIRE BULLET ===============================================================
  function fire(){
    let bulletIndex = spaceshipIndex
    const bulletIntervalId = setInterval(() => {
      bulletIndex = drawBullet(bulletIndex, -width, 'bullet')
      if (collision(bulletIndex, 'activeAlien', 'bullet', bulletIntervalId)){
        alienDeath(bulletIndex)
        updateScore()
        if (alienArray.length === 0) {
          gameOver('<img src="./assets/images/winner.gif" class="img-responsive"><div>Thanks for helping us protect the galaxy from Badvertising. Know that when faced with yawn-inducing messaging and design, Red Six Media is Just a CLICK away.</div>')
        }
      }
      collision(bulletIndex, 'ceiling', 'bullet', bulletIntervalId)
    }, 100)
  }

  // USER BULLET ===============================================================
  document.addEventListener('keydown', (e) => {
    if(e.keyCode === 32) {
      //bulletAudio()
      fire()
    }
  })

  // USER SPACESHIP ============================================================
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

  start.addEventListener('click', gameInit)

  // KEEP BRACKETS BELOW
  

})
window.onload=function(){
  	var button = document.getElementById("button");
	var audio = document.getElementById("player");
	button.addEventListener("click", function(){
	  if(audio.paused){
		audio.play();
		button.innerHTML = "<i class='fa fa-volume-up'></i>";
	  } else {
		audio.pause();
		button.innerHTML = "<i class='fa fa-volume-off'></i>";
	  }
	});
}


$(function(){
	$('.letsgo').on('click', function(e){
		e.preventDefault();
		$('.start-screen').hide();
		$('.full-bg').addClass('bg');
		$('.text1').typeIt({
			 speed: 50,
			 autoStart: false,
			 loop: false,
			 breakLines: false
		});
		$("#player").get(0).play();
	});
});





	
