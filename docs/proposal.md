# Helicopter +
## Background and Overview
Helicopter Plus is a 2-dimensional sidescrolling game in which the player controls a helicopter, initially in
free-fall, which may only be moved vertically, by pressing the space bar to activate positive upward acceleration.

The player must avoid randomly positioned obstacles and enemies, and may collect items for bonus points, and potentially
power-ups.


## Functionality and MVP

In Helicopter Plus, users will be able to:

* Manuever their character with slick/semi-realistic controls.
* Collect items which reward points
* Avoid enemies and obstacles
* Accumulate points by surviving longer, and view local high scores

## Technologies

This project will be implemented with the following technologies:

* JavaScript for game logic
* HTML5 Canvas for DOM Manipulation and Rendering
* Web Audio API for audio generation, processing, and control.
* Webpack for bundling and transpilation of source files.

## Wireframes

![wireframe](https://i.imgur.com/y5tVRBC.png)

## Implementation Timeline

### Day 1:
* Render Canvas Element onto Screen
* Player Character begins in free-fall, accelerating
* User may press the space bar to activate positive upward acceleration
* Obstacles appear from right edge of screen infinitely, with randomally generated vertical offset
* 90% working collision detection
* Game over when colliding with obstacle or falling through bottom of screen

### Day 2:
* Improve collision detection and spawn placement of obstacles.
* Add items which reward points
* Add other obstacle types (small enemy that moves up and down)

### Day 3:
* Continue Day 2 items if incomplete
* Overhaul graphics
* Add music
* General polish, style part of the page that isnt the canvas element

### Day 4:
* Account for if any of the above days take longer
* Add extra enemy/item types

## Bonus Features
* Increase difficulty of game the longer the player survives
* Improved visuals
