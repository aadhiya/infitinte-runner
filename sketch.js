var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1,obstacle2  

var score;
var start=1;
var end=0;
var gamestate=start;
var gameover,gamend,restart,reset

var jumpi,score100,death





function preload(){
  trex_running = loadAnimation("man1.png","man2.png","man3.png","man4.png","man5.png","man6.png","man7.png","man8.png","man9.png","man10.png");
  trex_collided = loadAnimation("man1.png");
  gamend= loadImage("gameOver.png");
  reset= loadImage("restart.png");
  groundImage = loadImage("groun2.png");
  
  cloudImage = loadImage("cloud1.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  
 
  jumpi=loadSound("jump.mp3");
  score100=loadSound("checkPoint.mp3");
  death=loadSound("die.mp3");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  trex = createSprite(50,windowHeight-120,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided",trex_collided);
  trex.scale = 0.1;
  trex.setCollider("circle",0,0,40);
  
  ground = createSprite(400,windowHeight-50,1000,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(width/2,height-45,width,10);
  invisibleGround.visible = false;
  
  console.log("Hello" + 5);
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

  gameover=createSprite(230,190,20,20);
  gameover.addImage(gamend);
  gameover.visible=false;
  gameover.scale=3;
  
  restart=createSprite(225,240,10,10);
  restart.addImage(reset);
  restart.visible=false;
  restart.scale=0.5;

}

function draw() {
  background(255,255,255);
  text("Score: "+ score, 500,50);
 
  if(gamestate==start){
     score = score + Math.round(getFrameRate()/60);
   ground.velocityX = -(4+score/100);
  if( touches.length>0 || keyDown("space")&& trex.y >= 362) {
    trex.velocityY = -13;
    jumpi.play();
    touches=[];
  }
  trex.changeAnimation("running",trex_running);
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
 trex.velocityY = trex.velocityY + 0.8
  trex.collide(invisibleGround); 
  
  //spawn the clouds
  spawnClouds();
  
  //spawn obstacles on the ground
  spawnObstacles();
  if (trex.isTouching(obstaclesGroup)) {
     death.play();
    gamestate=end;
      }
  } else if(gamestate==end){
   ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0) ;
    obstaclesGroup.destroyEach();
   trex.changeAnimation("trex_collided",trex_collided);
  trex.velocityY=0
    score=0;
   gameover.visible=true;
    restart.visible=true;
  
    if (touches.length>0 ||mousePressedOver(restart) ){
  gamestate=start;
  gameover.visible=false;
  restart.visible=false;
   touches=[];   
}
  }  
  drawSprites();
  if (score%100==0 && score>0){
    score100.play();
  }
}



function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(800,windowHeight-60,10,40);
   obstacle.velocityX = -(6+score/100);

   
    // //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 600;
   obstaclesGroup.add(obstacle)
   obstacle.depth=trex.depth;
   trex.depth=trex.depth+1;
 
 }
  
  
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 30 === 0) {
    cloud = createSprite(400,320,40,10);
    cloud.y = Math.round(random(100,250));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -(3+score/100);
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    cloudsGroup.add(cloud);
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}