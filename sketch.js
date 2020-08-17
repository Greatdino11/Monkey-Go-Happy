var monkey, monkeyImg, invisibleGround, rock, rockImg, score, banana, bananaImg, back, backImg, gamestate, sprite;

function preload(){
  monkeyImg = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png", "Monkey_04.png","Monkey_05.png", "Monkey_06.png","Monkey_07.png", "Monkey_08.png","Monkey_09.png", "Monkey_10.png");
  backImg = loadImage("jungle.png");
  bananaImg = loadImage("banana.png");
  rockImg = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);
  score = 0;
  back = createSprite(200,200);
  back.addImage("back", backImg);
  back.scale = 2;
  back.x = back.width/2
  back.velocityX = -8;
  monkey = createSprite(80,300,20,20);
  monkey.addAnimation("monkey", monkeyImg);
  monkey.scale = 0.1;
  invisibleGround = createSprite(200,350,400,10);
  invisibleGround.visible = false;
  sprite = createSprite(500,200,10,10);
  
  bananaGroup = new Group();
  rockGroup = new Group();
  
  gamestate = "PLAY";
}

function bananas(){
  if(frameCount%80 === 0){
    banana = createSprite(400, Math.round(random(120,200)), 10, 10);
    banana.addImage(bananaImg);
    banana.scale = 0.08;
    banana.velocityX = -8;
    banana.lifeTime = 50;
    
    bananaGroup.add(banana);
  }
}

function end(){
  back.velocityx = 0;
  banana.velocityx = 0;
  rock.velocityx = 0;
  back.x = 3000;
  banana.x = 3000;
  rock.x = 3000;
  monkey.x = 3000;
  background("green");
  stroke("white");
  textSize(20);
  fill("white");
  text("GAME OVER", 150,200);
}

function rocks(){
  if(frameCount%300 === 0){
    rock = createSprite(300, 320, 10, 10);
    rock.addImage(rockImg);
    rock.scale = 0.25;
    rock.setCollider("circle",0,0,100);
    rock.velocityX = -8;
    rock.lifeTime = 50;
    
    rockGroup.add(rock);
  }
}

function draw() {
  background(220);
  if(gamestate === "PLAY"){
    monkey.collide(invisibleGround);
    if (back.x < 0){
      back.x = back.width/2;
    }

    if(keyDown("space") && monkey.y>=280){
      monkey.velocityY = -13;
    }

    monkey.velocityY = monkey.velocityY+0.7;

    bananas();
    rocks();

    if(rockGroup.isTouching(monkey)){
      monkey.scale = 0.08;
      sprite.x +=1;
    }

    if(bananaGroup.isTouching(monkey)){
      score = score+2;
      bananaGroup.destroyEach();
    }
    
    switch(score){
      case 10: monkey.scale = 0.12;
        break;
      case 20: monkey.scale = 0.14;
        break;
      case 30: monkey.scale = 0.16;
        break;
      case 40: monkey.scale = 0.18;
        break;
      case 50: monkey.scale = 0.2;
        break;
      case 60: monkey.scale = 0.22;
        break;
      case 70: monkey.scale = 0.24;
        break;
      case 80: monkey.scale = 0.26;
        break;
      case 90: monkey.scale = 0.28;
        break;
      case 100: monkey.scale = 0.30;
        break;
      case 110: monkey.scale = 0.32;
        break;
      case 120: monkey.scale = 0.34;
        break;
      default: break;
    }

    if(sprite.x === 522){
      gamestate = "END";
    }
  }
  
  
  
  else if(gamestate === "END"){
  end();
  }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,150,50);
}