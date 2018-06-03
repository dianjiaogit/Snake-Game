var snake = {headx: 400, heady: 300, direction: 0, eaten: false, lost: false}; // array of snake
var body = []; // array of snake body
var food = {foodx: 100, foody: 100}; // array of food
var i; // used in drawsnake function
var a; // used in checkselfeaten function
var highest = 0; // used to save the highest score
var score; // used to save the current score
var r; // used in frameRate
var j; // check if new highest score is reached

function setup() {
  createCanvas(1200, 600);
  r = 0;
  score = 0;
  j = false;
    // any additional setup code goes here
}

function draw() {
  frameRate(4 + r / 100); // increase the speed
  fill(0);
  rect(0, 0, 800, 600);
  checkselfeaten(snake, body);
  body.push({x: snake.headx, y:snake.heady}); // make the body move with head
  drawsnake(snake, body);
  updatefood(snake, body, food);
  lost(snake);
  keyPressed(snake, body);
  if (snake.eaten == false) {
    body.shift(); // delete the last block if the snake does not eat food.
  }
  snake.eaten = false;
  scoreboard(800, 0, 400, 600);
  r = r + 1;
    // your "draw loop" code goes here
}

function updatefood(s,b,f) {
  if (dist(s.headx, s.heady, f.foodx, f.foody) == 0) {
    f.foodx = floor(random(39)) * 20;
    f.foody = floor(random(29)) * 20;
    s.eaten = true;
    drawfood(f);
    score = score + 1;
    if (highest == score && highest != 0) {
      j = true;
    }
    else if (highest < score) {
      highest = score;
    }
  }
  else {
    drawfood(f);
  }
}

function drawfood(f) {
  fill(255);
  rect(f.foodx, f.foody, 20, 20);
}

function drawsnake(s,b) {
  colorMode(HSB, 360, 100, 100);
  for (i = 0; i < Object.keys(b).length; i++) {
    fill(i * 360 / Object.keys(b).length, 100, 100);
    rect(b[i].x, b[i].y, 20, 20);
  }
  colorMode(RGB, 255, 255, 255);
  fill(255, 255, 0);
  rect(s.headx, s.heady, 20, 20);
}

function keyPressed(s,b) {
  if (keyCode === UP_ARROW && s.direction != 2) {
    s.heady = s.heady - 20;
    s.direction = 1;
  }
  else if (keyCode === UP_ARROW && s.direction == 2) {
    s.heady = s.heady + 20;
  }

  if (keyCode === LEFT_ARROW && s.direction != 4) {
    s.headx = s.headx - 20;
    s.direction = 3;
  }
  else if (keyCode === LEFT_ARROW && s.direction == 4) {
    s.headx = s.headx + 20;
  }

  if (keyCode === DOWN_ARROW && s.direction != 1) {
    s.heady = s.heady + 20;
    s.direction = 2;
  }
  else if (keyCode === DOWN_ARROW && s.direction == 1) {
    s.heady = s.heady - 20;
  }

  if (keyCode === RIGHT_ARROW && s.direction != 3) {
    s.headx = s.headx + 20;
    s.direction = 4;
  }
  else if (keyCode === RIGHT_ARROW && s.direction == 3) {
    s.headx = s.headx - 20;
  }
    // your "mouse pressed" code goes here
}

function lost(s) {
  if ((s.headx <= -20 || s.headx >= 820 || s.heady <= -20 || s.heady >= 620) && s.lost == false) {
    s.lost = true;
  }

  if (s.lost) {
    clear();
  }
}

function checkselfeaten(s,b) {
  for (a = 0; a < Object.keys(b).length; a++) {
    if (b[a].x == s.headx && b[a].y == s.heady) {
      s.lost = true;
    }
  }
}

function restartButton(a, b, c, d) {
  fill(255, 0, 0);
  rect(a, b, c, d);
  fill(0);
  textSize(50);
  text("Restart", a + 5, b + 5, c, d);
  return mouseIsPressed && mouseX >= a && mouseX <= a + c && mouseY >= b && mouseY <= b + d
}

function scoreboard(x, y, w, h) {
  fill(255);
  rect(x,y,w,h);
  fill(0);
  textSize(30);
  text("Use arrow keys to move.", x + w / 2 - 170, y + h / 2 - 200);
  if (j == true) {
    fill(255, 0, 0);
  }
  text("Current Score: ", x + w / 2 - 120, y + h / 2);
  text(score, x + w / 2 + 120, y + h / 2);
  text("Highest Score: ", x + w / 2 - 120, y + h / 2 + 70);
  text(highest, x + w / 2 + 120, y + h / 2 + 70);
  fill(0);
  text("-> Snake", x + w / 2 - 50, y + h / 2 + 140);
  text("-> Food", x + w / 2 - 50, y + h / 2 + 210);
  fill(255, 255, 0);
  rect(x + w / 2 - 100, y + h / 2 + 120, 20, 20);
  fill(255);
  rect(x + w / 2 - 100, y + h / 2 + 190, 20, 20);
  if (restartButton(910, 160, 180, 80)) {
    snake = {headx: 400, heady: 300, direction: 0, eaten: false, lost: false};
    body = [];
    food = {foodx: 100, foody: 100};
    setup();
  }
}
