var PLAY = 1;
var END = 0;
var gameState = PLAY;


var background,backgroundImg;
var boyrunner,boyrunnnerImg;
var branch,branchImg;
var gameOver,gameOverImg; 


function preload(){
 backgroundImg = loadImage("background.png");
 boyrunnerImg = loadAnimation("boyrunner.png");
 branchImg = loadImage("branch.png");
 gameOverImg = loadImage("gameOver.png");
}

function setup() {
createCanvas(windowWidth, windowHeight);
  
branches = createSprite(width-50,100,10,10);
branches.addImage("branchImg");
branches.scale = 0.1;
    
boyrunner = createSprite(50,height-70,20,50);

boyrunner.addAnimation("running",boyrunnerImg);                              
boyrunner.setCollider('circle',0,0,350);
boyrunner.scale = 0.08;
 // boyrunner.debug=true
  
 ground = createSprite(width/2,height,width,2);
 ground.addImage("ground");
 ground.x = width/2
 ground.velocityX = -(6 + 3*score/100);
 
 gameOver = createSprite(width/2,height/2- 50);
 gameOver.addImage("gameOverImg");
 
 gameOver.scale = 0.5;

 gameOver.visible = false;

 score = 0;
}

function draw() {
  //boyrunner.debug = true;
  background(backgroundImg);
  textSize(20);
  fill("black")
  text("Score: "+ score,30,50);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
    
    if((touches.length > 0 || keyDown("SPACE")) && boyrunner.y  >= height-120) {
      boyrunner.velocityY = -10;
       touches = [];
    }
    
    boyrunner.velocityY = boyrunner.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    boyrunner.collide(Ground);
    spawnbranches();
  
    if(branches.isTouching(boyrunner)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    boyrunner.velocityY = 0;
    branches.setVelocityXEach(0);
    
    //change the boyrunner animation
    boyrunner.changeAnimation("collided",);
    
    //set lifetime of the game objects so that they are never destroyed
    branches.setLifetimeEach(-1);
    
    if(touches.length>0 || keyDown("SPACE")) {      
      touches = []
    }
  }


drawSprites();
}


function spawnbranches() {
  //write code here to spawn the branches
  if (frameCount % 60 === 0) {
    var branches = createSprite(width+20,height-300,40,10);
    branches.y = Math.round(random(100,220));
    branches.addImage(branchImg);
    branches.scale = 0.5;
    branches.velocityX = -3;
    
     //assign lifetime to the variable
     branches.lifetime = 300;
    
    //adjust the depth
    branches.depth = branches.depth;
    boyrunner.depth = boyrunner.depth+1;
    
    //add each branches to the group
    branches.add(branches);
  }
  
}


function spawnbranches() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,height-95,20,30);
    branches.setCollider('circle',0,0,45)
    // branches.debug = true
  
    branches.velocityX = -(6 + 3*score/100);
    
    //generate random branches
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: branches.addImage(branchImg);
              break;
      case 2: branches.addImage(branchImg);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the branches           
    branches.scale = 0.3;
    branches.lifetime = 300;
    branches.depth = branches.depth;
    boyrunner.depth +=1;
    //add each branches 
    branches.add(branches);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  
  branches.destroyEach();
  boyrunner.changeAnimation("running",boyrunnerImg);
  
  score = 0;
  
}