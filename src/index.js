function startGame() {
  draw(160, 460);
}

class Player {
  constructor() {
    this.width = 100;
    this.height = 150;
    this.x = 150;
    this.y = 400;
    this.imgsrc = 'images/player.png';
    this.ctx = document.getElementById('game-canvas').getContext('2d');
    }
  

drawPlayer() {
  let image = new Image();
  image.src = this.imgsrc;
  this.ctx.drawImage(image, this.x, this.y, this.width, this.height);
}
}

var sec = 60;

class Game{
  constructor(){
    this.player = new Player();
  }
}

let game = new Game();
let allFours = [];
let allAngryCats = [];


var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext('2d');
let w = 800;
let h = 600;

var myGameArea ={
  stop: function() {
    clearInterval(this.interval);
  },
};

function collisionDetect(object1, object2){
  if (object1.x < object2.x + object2.width  && object1.x + object1.width  > object2.x &&
		object1.y < object2.y + object2.height && object1.y + object1.height > object2.y) {
      console.log('colliding!!')
      return true

  } else{
    return false
  }
}

class Four {
  constructor(width, height, x, y, direction, speed) {
    this.width = 50;
    this.height = 70;
    this.x = Math.floor(Math.random()*500)
    this.y = Math.floor(Math.random()*500);
    this.imgsrc = 'images/four.jpg';
    this.ctx = document.getElementById('game-canvas').getContext('2d');
    this.direction = {  x: Math.random() * (3) - 1,  y: Math.random() * (3) - 1 }
    this.speed = Math.random() * 4;
    }
}
function createFours(){
  console.log("creating four <<<<<< ", allFours.length)
   allFours.push(new Four())
    console.log(allFours)
}


var theImage = new Image()
theImage.src = 'images/four.jpg'
theImage.onload = function(){

}

function updateAndDrawFours(){
  
    console.log(allFours.length)
    for(let i=0; i<allFours.length; i++){


      let fours = allFours[i]
      

      fours.y += fours.direction.y * fours.speed;
      fours.x += fours.direction.x * fours.speed;
      
      let didFoursColideWithPlayer = collisionDetect(game.player, fours)
      if(didFoursColideWithPlayer ===true) {
          allFours.splice(i, 1);
          score++;
      
      }

      if( fours.y>canvas.height - fours.height || fours.y<0  ){ 
        return fours.direction.y = -1*fours.direction.y
      }

      if( fours.x>canvas.width - fours.width || fours.x<0  ){ 
        return fours.direction.x = -1*fours.direction.x 
      }
      
      ctx.drawImage(theImage, fours.x, fours.y, fours.width, fours.height)
    }
}
// Left off hereeeeeeeeeeeeeee
class Seven extends Four {
  constructor(width, height, x, y, direction, speed) {
    super(width, height, x, y, direction)
    this.imgsrc = 'images/seven.jpg';
    this.ctx = document.getElementById('game-canvas').getContext('2d');
    this.speed = Math.random() * 1;
    }
}
function createAngryCats(){

  allSevens.push(new Seven())
 
}

function startGame(){
  setInterval(() => {
    createSevens()
  },1500)
  createSevens() 
  makeSevens()
}
function makeSevens(){
  createSevens();
  createSevens();
  createSevens();
}
var otherImage = new Image()
otherImage.src = 'images/seven.jpg'
otherImage.onload = function(){
  makeSevens() 
}

function updateAndDrawSevens(){

  
    for(let i=0; i<allSevens.length; i++){


      let sevens = allSevens[i]

      

      sevens.y += sevens.direction.y * sevens.speed;
      sevens.x += sevens.direction.x * sevens.speed;
      
      let didSevensColideWithPlayer = collisionDetect(game.player, sevens)
      if(didSevensColideWithPlayer ===true) {
          allSevens.splice(i, 1);
          score--;
      
      }
    

      if( sevens.y>canvas.height - sevens.height || sevens.y<0  ){ 
        return sevens.direction.y = -1*sevens.direction.y
      }

      if( sevens.x>canvas.width - sevens.width || sevens.x<0  ){ 
        return sevens.direction.x = -1*sevens.direction.x 
      }
      
      ctx.drawImage(otherImage, sevens.x, sevens.y, sevens.width, sevens.height)
    }
}

let score = 0;
      
function drawScore() {
  ctx.font = "50px Arial";
  ctx.fillStyle = "plum";
  ctx.fillText("Score: "+ score, 20, 40);
}



function setTimer(){     
        sec--;
        if (sec < 1) {
            clearInterval();
            setTimeout(() => {
              alert("Game Over!"+" Score:"+  score);
              location.reload()
            }, 100)
            return;
        }     
    }
  
    function drawTimer() {
      ctx.font = "50px Arial";
      ctx.fillStyle = "plum";
      ctx.fillText("Time: " + sec, 500, 40);
    }



document.onkeydown = function(e){
  switch(e.keyCode){
    case 37: game.player.x-=20; console.log("moving left"); break;
    case 38: game.player.y-=20; console.log("moving up"); break;
    case 39: game.player.x+=20; console.log("moving right"); break;
    case 40: game.player.y+=20; console.log("moving down"); break;
  }
} 

function updateCanvas(){
  ctx.clearRect(0,0,w,800)
  game.player.drawPlayer()
  updateAndDrawFours()
  updateAndDrawSevens()
  drawScore()
  drawTimer()
  window.requestAnimationFrame(updateCanvas)
  
}


document.getElementById('start').onclick= function(){
  frames = 0;
    setInterval(() => {
      setTimer()
    }, 1000);
  setInterval(() => {
    createFours()
  },1500)
  updateCanvas()
}
