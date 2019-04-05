# SEI-Project-01: Vanilla Javascript Game
Space Invaders

### Timeframe
7 days

## Technologies used

* JavaScript (ES6)
* HTML5
* CSS
* git
* HTML5 Audio
* CSS animation

## Installation

1. Clone or download the repo
1. Open the `index.html` in your browser of choice

## Overview

[Find the hosted link to the game here:](https://emma3333.github.io/SEI-Project-01/)

### Introduction
My Space Invaders game is a take on the classic Space Invaders game from the 80s. The aim of the game is for the user to shoot the invading alien armada before it reaches the players spaceship.

The alien armada periodically drops bombs towards the player. The player can (only) move from left to right to dodge the bombs being dropped by the alien armada. The player can fire bullets by pressing the space bar to shoot at the approaching aliens.

The player wins by destroying the alien armada. The player has three lives, and loses a life each time the player is hit by one of the bombs dropped by the alien armada. Once the player has won or died, the player can choose to play again.

The aim of the game is to achieve the highest score before the aliens reach the spaceship.

### Controls

* Player (spaceship) movements: :arrow_left: :arrow_right: to move left and right
* Player (spaceship) fire bullet: press spacebar to fire bullet

### Game Instructions
_How the game works. Break the process down into steps. Add a screenshot for each step_

1. The game begins with a simple landing page. Click on 'Play game' to start the game.

![Landing Page] (https://user-images.githubusercontent.com/35655626/55621277-fa710d00-5794-11e9-8894-3cdc900f6e7e.png)

1. On page load, the aliens will start moving towards the players spaceship and dropping bombs periodically.

![Game Page] (https://user-images.githubusercontent.com/35655626/55621446-6eabb080-5795-11e9-89b2-946a727774df.png)

1. Use the left and right arrow keys to dodge the alien bombs.

1. Use spacebar to fire bullets upwards to kill the aliens from your current position.

![Game Page - Fire Bullets] (https://user-images.githubusercontent.com/35655626/55621697-2476ff00-5796-11e9-9b52-6b696a11848c.png)

1. Each time you kill an alien, your score will increase by one (max score is 33).

![Game Page - Score] (https://user-images.githubusercontent.com/35655626/55621885-a5ce9180-5796-11e9-88d0-de428dbccfac.png)

1. You start each game with three lives, each time you're hit by an alien bomb you lose a life. If you lose all three lives, the game will end, taking you to the screen below. Click 'Play game' to play again.

![Game Page - Game Over] (https://user-images.githubusercontent.com/35655626/55622115-402ed500-5797-11e9-81e2-beedc68a2c9e.png)

1. Kill all of the aliens by shooting them to win the game. This will take you to the following screen. Click 'Play game' to play again.

![Game Page - Win] (https://user-images.githubusercontent.com/35655626/55622230-884df780-5797-11e9-9f0b-7abdbd81cec7.png)


## Process
The first thing I did was create a 15 x 15 grid in Javascript to build the rest of the game on. After this there were five key parts of the game I needed to tackle before moving forward with any logic: creating an array of aliens; using a set interval to move the aliens across and down the page; creating the players spaceship which moves from left to right within the 15 x 15 grid on an event listener; adding an event listener to allow the player to fire a bullet and creating a set interval to make the aliens drop bombs.

##### Aliens
To create the alien armada I created a class of of 'activeAlien' in CSS which I added to my alien array in Javascript using forEach. To move the alien armada I used multiple arrays along with forEach to loop through the alien array to remove the class of alien, find the new position of the alien and increment the position of alien until it reached the bottom of the grid.

I created a function for the alien armada to drop bombs using two set intervals to drop bombs periodically, which then moved down the grid a square at a time.

#### Player's spaceship
To create the players spaceship I added the class of spaceship to the relevant square and then added an event listener to move from left to right. I then added an event listener for the user to fire bullets at the alien armada, using a set interval to get the bullet to move up the grid.

Once I had the main components in place, I could add in functions to create collisions, get the user to win or lose, update the score and lose lives.

Finally, after refactoring, I added a game over function and initialise game function to end and re-start the game.

Once the game was working and I'd got rid of all the bugs, I focused on the CSS to get the aesthetic of the game to a standard I was happy with.

_Describe the process of building the game. How did you get started? How did you manage your time? How would you do things next time?_

### Challenges
The biggest challenge for making Space Invaders was dealing with set intervals. The re-start function was the most challenging due to the amount of set intervals used throughout the game, and ensuring these were all cleared for the reset function to work without any bugs.

The movement of large groups of aliens in formation was also challenging and took a lot of pseudo-coding to break down into manageable steps.
_Describe the biggest challenges. How did you overcome them? Did you decide to pivot because of time constraints? What did you learn from these problems?_

### Wins
I'm really proud of what I've achieved given how daunted I was when we were given our briefs. My understanding of functions, arrays and set intervals has massively improved over the seven days.
_Describe the wins. What are you most proud of? What did this project help you to understand the most?_

## Future features
If I had the time, there would be an almost never ending list of improvements I'd like to make in the future, however I will focus on the three main ones here. The first is adding a leaderboard using localStorage to keep a track of high scores. The second improvement I'd like to make is to make the design of the game responsive. Finally I'd like to make the game more enjoyable for users by adding different levels of difficulty.
