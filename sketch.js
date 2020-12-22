// creating all variables
var knife,sword;
var PLAY=1;
var END=0;
var gameState= PLAY;
var score;
var fruit,enemy;

var swordImage,fruit1,fruit2,fruit3,fruit4;
var monster,gameover;

var fruitGroup,enemyGroup;





 



function preload(){
 swordImage=loadImage("sword.png") ;
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  gameover=loadImage("gameover.png");
  
  monster=loadAnimation("alien1.png","alien2.png");
  
  knifeS=loadSound("knifeSound.mp3");
  gameO=loadSound("gameover.mp3");
  
 
}

function setup(){
createCanvas(600,600);
 
  // creating sword and adding animation to it
  sword=createSprite(500,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.5;
  
  
  //  score variable 
  score=0;
 fruitGroup=createGroup();
  enemyGroup=createGroup();
 
  
  
  
}

function draw(){
  background(220);
  
  if (gameState===PLAY){
    //moving with the sword
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    
    
    // increasing the score when the sword touches the fruit
    if (fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
      knifeS.play();
      
    }
    // calling the function for fruits and enemies.
    fruits();
  enemies();
    
    
    if (enemyGroup.isTouching(sword)){
      gameState=END;
      gameO.play();
    }
    
  }
  
    if (gameState===END){
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
      
      sword.addImage(gameover);
      sword.x=300;
      sword.y=300
      
    }
  
  

 
  
  drawSprites();
  // displaying the score and creating groups
  text("Score: "+ score,500,50);
   
  
  
}

// creating a function for fruits
function fruits()
{
  position=Math.round(random(1,2));
    if (World.frameCount % 80===0 )  {
     fruit=createSprite(400,200,20,20);
      fruit.scale=0.2;
       //fruit.debug=true;
      r=Math.round(random(1,4));
      if (r==1){
        fruit.addImage(fruit1);
         }else if (r==2){
           fruit.addImage(fruit2);
         }else if(r==3){
           fruit.addImage(fruit3);
         }else{
           fruit.addImage(fruit4);
         }
    
      if(position===1)
        {
        fruit.x=400;
        fruit.velocityX=-(7+score/4);  
        }
  else
    {
      if(position===2){
        fruit.x=0;
        fruit.velocityX=(7+score/4);
        
      }
    }
  fruit.y=Math.round(random(50,340));
  
  fruit.lifetime=100;
  
  // addind fruit to its group
  fruitGroup.add(fruit);
}// this bracket ends the if condition of frameCount
    }

// creating a function for enimies
function enemies(){
 
  if (World.frameCount % 200===0){
    enemy=createSprite(400,200,20,20);
    enemy.addAnimation("animation",monster);
    enemy.y=Math.round(random(100,300));
    enemy.velocityX=-(8+score/10);
    enemy.lifetime=100;
    
    // adding enemy to its group
    enemyGroup.add(enemy);
    
  }
  
  
}
