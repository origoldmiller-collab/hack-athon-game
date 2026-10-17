//preview: python -m http.server
let team1;
let team2;
let leftView;
let rightView;
let portal;
let imgFlag;    

async function setup() {
  imgFlag = await loadImage('flag-hackathon_2026.png');
  createCanvas(windowWidth-30, windowHeight-30);
  leftView = createGraphics((windowWidth-30)/2, windowHeight-30);
  rightView = createGraphics((windowWidth-30)/2, windowHeight-30);
  team1 = new Team(new Ball((width / 4)*3, height/4, 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 255, 0, 200, team1), new Ball((width / 4)*3, (height/4)*3, 40, 101, 98, 97, 99, 255, 0, 0, team1), 0, false)
  team2 = new Team(new Ball(width / 4, height/4, 40, 87, 83, 65, 68, 0, 255, 0, team2), new Ball(width / 4, (height/4)*3, 40, 73, 75, 74, 76, 0, 255, 150, team2), 0, false)

  portal = new Portal(500, 300, 20, 30)
}



function draw() {
background(30);

  leftView.background(50, 100, 200); // Blue background
  leftView.fill(255);
  leftView.noStroke();

  rightView.background(200, 50, 100); // Red background
  rightView.fill(255);
  rightView.noStroke();

  image(leftView,(windowWidth-30)/2, 0);
  image(rightView, 0, 0);

  stroke(255);
  strokeWeight(6);
  line((windowWidth/2)-15, 0, (windowWidth/2)-15, height);

  for (let i = 0; i < team1.arrayofteam[i].length; i++){
    team1.arrayofteam[i].update();   
    team1.arrayofteam[i].checkKeys();
    team1.arrayofteam[i].display();
    team1.arrayofteam[i].checkEdges();
    for (let j = 0; j < team2.length; j++){
      if(team1.arrayofteam[i].checkCollision(team2.arrayofteam[j],t1Points)){
      }
    }
  }

for (let i = 0; i < team2.arrayofteam[i].length; i++){
    team2.arrayofteam[i].update();   
    team2.arrayofteam[i].checkKeys();
    team2.arrayofteam[i].display();
    team2.arrayofteam[i].checkEdges();
    for (let j = 0; j < team1.length; j++){
      if (team2.arrayofteam[i].checkCollision(team1.arrayofteam[j],t2Points)){
      }
    }
  }

  portal.display();

  fill(0);
  textSize(60);
  textAlign(CENTER, CENTER)
  text(team2.Points + " : " + team1.Points , (windowWidth-31)/ 2 , 40);

}
class Team{
  constructor(teamate1, teamate2, Points, isTagger){
    this.teamate1 = teamate1
    this.teamate2 = teamate2
    this.Points = Points
    this.isTagger = isTagger
    this.arrayofteam = [teamate1, teamate1]
  }
}

class Ball {
  constructor(x, y, r, w, a, s, d, rd, gn, bu, team) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.d = r;
    this.topSpeed = 20;
    this.friction = 0.92;
    this.up = w;
    this.down = s;
    this.left = a
    this.right = d  
    this.red =rd
    this.green = gn
    this.blue = bu
    this.hasTagged = false;
    this.team = team
    this.holdingFlag = false;
    this.tagger = false
  }
 checkCollision(other){
  if (this.holdingFlag == false){
    var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
    if ((d < this.d/2 + other.d/2 && this.hasTagged == false && other.holdingFlag == true)){
      this.hasTagged = true
      return true;
    } else if ((d < this.d/2 + other.d/2 && this.hasTagged == false && other.holdingFlag == true)){

    } else {
      return false;
    }
  }
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
    this.acc.mult(0.1)
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
    fill(this.red, this.green, this.blue);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.d);
    if (this.holdingFlag == true){
      image(imgFlag, this.pos.x-15, this.pos.y-37, 75, 75);
    }
  }
 
  checkEdges() {
    if (this.pos.x > width-(this.d/2)){
      this.vel.x = Math.abs(this.acc.x)*-1.2; 
      // this.pos.x = 0
    }
    if (this.pos.x < 0 + this.d/2){
      this.vel.x = Math.abs(this.acc.x)*1.2;
      // this.pos.x = windowWidth-(30+this.d/2)
    }
    
    if (this.pos.y > height-(this.d/2)){
      this.vel.y = Math.abs(this.acc.y)*-1.2;
      // this.pos.y = 0
    }
    if (this.pos.y < 0 + this.d/2){
      this.vel.y = Math.abs(this.acc.y)*1.2;
      // this.pos.y = windowHeight-(30+this.d/2)
    }
  }
}
class Portal{
  constructor(posx, posy, l, w){
    this.x = posx
    this.y = posy
    this.length = l
    this.width = w 
  }
    display() {
    fill(255, 150 , 0);
    noStroke();
    rect(this.x, this.y, this.length, this.width);
  }
}

