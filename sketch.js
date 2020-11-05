var fish, bg, title;
var backgroundImage;
var shark1Group,shark2Group;
var gameState="PLAY";
var topWall,bottomWall;
var score=0;
var Restart,RestartImage;


function preload(){
  backgroundImage=loadImage("background1.jpg");
  fishImage=loadImage("FlappyFish.png");
  shark1Image=loadImage("Shark3.png");
  shark2Image=loadImage("shark4.png");
  titleImage=loadImage("Flappy Fish.png");
  RestartImage=loadImage("restart.png");

  dieSound=loadSound("die.mp3");
  hitSound=loadSound("hit.mp3");
  pointSound=loadSound("point.mp3");
swooshSound=loadSound("swoosh.mp3");
wingSound=loadSound("wing.mp3");
}


function setup() {
  createCanvas(displayWidth-80,displayHeight-170);
//console.log(displayWidth);
//console.log(displayHeight);

  bg=createSprite(600,600,1200,400);
  bg.addImage("background",backgroundImage);
  bg.scale=6;
  bg.velocityX=-3;
  bg.x=bg.width/2;

  fish=createSprite(400,400,100,100);
  fish.addImage("fish", fishImage);
  fish.scale=0.5;
  fish.velocityY=6;
  fish.debug=false;
  fish.setCollider("circle",0,0,80);

  title=createSprite(600, 50, 50,20);
  title.addImage("title", titleImage);

  Restart=createSprite(650,365,50,50);
  Restart.addImage("Restart", RestartImage);
  Restart.scale=1.5;
  Restart.visible=false;
  
  topWall=createSprite(500,10,displayWidth,20);
  topWall.visible=false;

  bottomWall=createSprite(500,730,displayWidth,20);
  bottomWall.visible=false;

  shark1Group=createGroup();
  shark2Group=createGroup();
}

function draw() {
  //background(0);
  drawSprites();

  textSize(30);
  fill("green");
  strokeWeight(5);
  stroke("yellow");
  textFont("TimesNewRoman");
  text("Score:"+score,1000,50);

  if(gameState==="PLAY"){

  if(bg.x<0){
    bg.x=bg.width/2;
  }

  if(touches.length>0||keyDown("space")){
    fish.velocityY=-6;
    touches=[];
  }
fish.velocityY=fish.velocityY+1;

  shark1();
  shark2();

  if(World.frameCount%120===0){
  score=score+1;
  pointSound.play();
  }

  if(fish.isTouching(shark1Group)|| fish.isTouching(shark2Group)){
    gameState="END";
    dieSound.play();
  }

  if(fish.isTouching(topWall)||fish.isTouching(bottomWall)){
    gameState="END";
    wingSound.play();
  }
 
}
else if(gameState==="END"){
bg.velocityX=0;
fish.velocityY=0;
shark1Group.setVelocityXEach(0);
shark2Group.setVelocityXEach(0);

Restart.visible=true;
if(mousePressedOver(Restart)||touches.length>0){
  gameState="PLAY";
  Restart.visible=false;
  shark1Group.destroyEach();
  shark2Group.destroyEach();
  bg.velocityX=-3;
  fish.x=400;
  fish.y=400;
  touches=[];
}
}

  
  //text("X:"+mouseX,200,200);
  //text("Y:"+mouseY, 200, 250);
}

function shark1(){
  if(World.frameCount%100===0){
    var shark1=createSprite(displayWidth,random(50,150),10,40);
    shark1.addImage("Shark",shark2Image);
    shark1.velocityX=-6;
    shark1.scale=1.5;
    shark1.debug=false;
    shark1.setCollider("rectangle",0,0,shark1.width-60,shark1.height);
    shark1Group.add(shark1);
  }
}

function shark2(){
  if(World.frameCount%100===0){
    var shark2=createSprite(displayWidth,random(650,800),10,40);
    shark2.addImage("Shark",shark1Image);
    shark2.velocityX=-6;
    shark2.scale=1.5;
    shark2.debug=false;
    shark2.setCollider("rectangle",0,0,shark2.width-60,shark2.height);
    shark2Group.add(shark2);
  }
}
 

