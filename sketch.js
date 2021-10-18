var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var topgroup,bottomgroup,bargroup
var score=0
var gameover,gameoverImage
var reset,resetImage
var gameState="play";
var jumpsound,diesound

function preload(){
bgImg = loadImage("assets/bg.png")
obs_top1=loadImage("assets/obstop1.png")
obs_top2=loadImage("assets/obstop2.png")
obs_bot1=loadImage("assets/obsbottom1.png")
obs_bot2=loadImage("assets/obsbottom2.png")
obs_bot3=loadImage("assets/obsbottom3.png")
balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
gameoverImage=loadImage("assets/gameover.png")
resetImage=loadImage("assets/restart.png")
jumpsound=loadSound("assets/jump.mp3")
diesound=loadSound("assets/die.mp3")
}

function setup(){
createCanvas(750,750)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3

//creating top and bottom grounds
bottomGround = createSprite(375,740,750,20);
bottomGround.visible = false;

topGround = createSprite(375,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,375,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.4;

gameover=createSprite(370,350)
gameover.addImage(gameoverImage)
gameover.scale=0.7;
gameover.visible= false;

reset=createSprite(375,375)
reset.addImage(resetImage)
reset.scale=0.7;
reset.visible=false;

topgroup=new Group()
bottomgroup=new Group()
bargroup=new Group()

}

function draw() {
  
  background("black");
        
  if(gameState==="play"){
 //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -6 ;
            jumpsound.play()
          }

          //adding gravity
           balloon.velocityY = balloon.velocityY + 2;
          
           spawnObstaclesTop()
           spawnObstaclesBottom()
          bars();

      //if(balloon.isTouching(topgroup)||balloon.isTouching(bottomgroup)
     // ||balloon.isTouching(topGround)||balloon.isTouching(bottomGround)){
      // diesound.play()
       // gameState="end";

     // }
      
      if(balloon.isTouching(topgroup)||balloon.isTouching(topGround)){
        balloon.velocityY=6;
        jumpsound.play()
      }
      if(balloon.isTouching(bottomgroup)||balloon.isTouching(bottomGround)){
        balloon.velocityY=-6;
        jumpsound.play()
      }

  }
  if(gameState==="end"){
    balloon.velocityX=0
    balloon.velocityY=0
    topgroup.setVelocityXEach(0)
    bottomgroup.setVelocityXEach(0)
    topgroup.setLifetimeEach(-1)
    bottomgroup.setLifetimeEach(-1)
    gameover.visible= true;
    reset.visible=true;


    if(mousePressedOver(reset)){
    score=0;
    gameState="play"
    gameover.visible= false;
    reset.visible=false;
    topgroup.destroyEach();
    bottomgroup.destroyEach();
    }
  }

         

           

        drawSprites();
        Score();
        
}
function spawnObstaclesTop()
{
  if(World.frameCount%100===0){
  obs_topS = createSprite(750,20,1,1);

  obs_topS.y = Math.round(random(20,100));

  var r = Math.round(random(1,2));
  obs_topS.scale=0.2;
  obs_topS.velocityX=-3
  obs_topS.lifetime=250;

  switch(r){
    case 1: 
    obs_topS.addImage(obs_top1);
    break;

    case 2:
      obs_topS.addImage(obs_top2)
      break;

  }
  topgroup.add(obs_topS)
  }
  

}

function spawnObstaclesBottom(){
  if(World.frameCount%100===0){ 
  obs_bottomS=createSprite(700,700)
   
  obs_bottomS.scale=0.2;
  obs_bottomS.velocityX=-3
  var r = Math.round(random (1,3))
  obs_bottomS.lifetime=250;
   
  switch(r){
    case 1:
    obs_bottomS.addImage(obs_bot1);
    break;

    case 2:
    obs_bottomS.addImage(obs_bot2);
    break;

    case 3:
    obs_bottomS.addImage(obs_bot3);
    break;
  }
  bottomgroup.add(obs_bottomS)
  }

}
function bars(){
if(World.frameCount%60===0){
bar=createSprite(400,200,10,400)
bar.velocityX=-5
bar.visible=false;
bar.depth=balloon.depth;
bar.lifetime=80
bargroup.add(bar)
}

}

function Score(){
  textSize(30)
  fill("black")
  strokeWeight(6)
text("Score:"+score,300,50)
if(balloon.isTouching(bargroup)){
  score=score+1
}

}
