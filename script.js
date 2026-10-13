//preview: python -m http.server
let player1;
let player2;
  
function setup() {
  createCanvas(windowWidth-30, windowHeight-30);
  background(30);
  player1 = new Ball(width / 2, height / 2, 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 255, 0, 150);
  player2 = new Ball(width / 2, height / 2, 40, 87, 83, 65, 68, 0, 255, 150);
}

function draw() {
  background(30);
  player1.update();   
  player1.checkKeys();
  player1.display();
  player2.update();   
  player2.checkKeys();
  player2.display();     
}

class Ball {
  constructor(x, y, r, w, a, s, d, rd, gn, b) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = r;
    this.topSpeed = 10;
    this.friction = 0.92;
    this.up = w;
    this.down = s;
    this.left = a
    this.right = d  
  }

  // Method to check keyboard input and apply forces
  checkKeys() {
    let forceMagnitude = 12;
    
    if (keyIsDown(this.down))  this.applyForce(createVector(-forceMagnitude, 0));
    if (keyIsDown(this.right)) this.applyForce(createVector(forceMagnitude, 0));
    if (keyIsDown(this.up))    this.applyForce(createVector(0, -forceMagnitude));
    if (keyIsDown(this.left))  this.applyForce(createVector(0, forceMagnitude));
  }

  // The "Force" pattern: Force adds to Acceleration
  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    // 1. Acceleration changes Velocity
    this.vel.add(this.acc);
    
    // 2. Limit the speed so it doesn't go infinite
    this.vel.limit(this.topSpeed);
    
    // 3. Velocity changes Position
    this.pos.add(this.vel);
    
    // 4. Apply friction (velocity decay)
    this.vel.mult(this.friction);
    
    // 5. Reset acceleration for the next frame
    this.acc.mult(0);
  }

  display() {
    fill(255, 150, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}