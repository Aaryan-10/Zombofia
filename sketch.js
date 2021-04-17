var bg, bg_image;
var x1 = 0;
var x2;
var scrollSpeed = 3;
var zombies,zombie_image1, zombiesGroup;
var hunter, hunter_image;
var fruit,fruit_image, fruitGroup;
var invisibleGround;
var score;
var gameState = "wait";
var gameOver_image;


function preload(){
    //load the images
    bg_image = loadImage("Images/bg.jpg");
    zombie_image1 = loadImage("Images/Zombie.png");
    zombie_image2 = loadImage("Images/Zombie_flip.png");
    hunter_image = loadImage("Images/Hunter.png");
    fruit_image = loadImage("Images/Fruit.png");
    gameOver_image = loadImage("Images/GameOver.png");
}

function setup(){
    createCanvas(900,550);
    x2 = width;

    hunter = createSprite(50,450);
    hunter.addImage(hunter_image);
    hunter.scale=0.5;

    invisibleGround = createSprite(400,570,900,50);
    invisibleGround.visible = false;

    zombiesGroup = new Group();
    fruitGroup = new Group();

    hunter.setCollider("rectangle",0,0,200,200);    
    //hunter.debug= true;
    //zombies.debug = true;
    score=0;
}

function draw(){
    image(bg_image, x1, 0, width, height);
    image(bg_image, x2, 0, width, height);

    x1 -= scrollSpeed;
    x2 -= scrollSpeed;
  
    if (x1 < -width){
        x1 = width;
    }
    if (x2 < -width){
        x2 = width;
    } 

    /*if(gameState === "wait"){
        background(0);
        fill("white");
        textSize(30);
        text("Zombofia",350,50);
        text("Press 'S' to Start the Game", 200, 100);
    }

    if(keyDown("s") && gameState === "wait"){
        gameState === "play";
    }*/

    if(gameState === "play"){
        // Move hunter with mouse
        //hunter.y=World.mouseY;
        //hunter.x=World.mouseX;

        if(keyDown("space") && hunter.y >= 300){
            hunter.velocityY = -12;
        }
        hunter.velocityY = hunter.velocityY + 0.8;

        fill("white");
        textSize(40);
        text("Fruit Score: "+ score,550,50)

        spawnZombies();
        spawnFruits();
            
        if(fruitGroup.isTouching(hunter)){
            score++;
            fruitGroup.destroyEach();
        }            
        if(zombiesGroup.isTouching(hunter)){
                gameState = "end";
                fruitGroup.setVelocityXEach(0);
                zombiesGroup.setVelocityXEach(0);
                fruitGroup.destroyEach();
                zombiesGroup.destroyEach();
        }        
    }
    else if(gameState = "end"){
        background(0);
        hunter.addImage(gameOver_image);
        hunter.x = 470;
        hunter.y = 300;
        hunter.scale = 0.5;
        fill("white");
        textSize(30);
        text("Press 'R' to Restart",350,50);
    }

    hunter.collide(invisibleGround);

    if(keyDown("r") && gameState === "end"){
        reset();
    }
    drawSprites();
}


function spawnZombies(){
    if (frameCount % 100 === 0){
        zombies = createSprite(900,490,10,40);
        //using random variable change the position of zombie, to make it more challenging
        r=Math.round(random(1,3))
        if(r==1){
            zombies.addImage(zombie_image1);
            zombies.x=900;
            zombies.velocityX=-(7 + score/4);
        }
        else {
            zombies.addImage(zombie_image2);
            zombies.x=100;
            zombies.velocityX= (7 + score/4);
        }   
        zombies.scale = 0.3;
        zombies.lifetime = 300;
        zombiesGroup.add(zombies);     
    }
}

function spawnFruits(){
    if(frameCount % 80 === 0){
        fruit = createSprite(900,480,20,20);
        fruit.addImage(fruit_image);
        position = Math.round(random(1,2));
        if(position==1)
        {
            fruit.x=900;
            fruit.velocityX=-(7+(score/4));
        }
        else
        {
          if(position==2){
          fruit.x=0;          
          //Increase the velocity of fruit after score 4 or 10
          fruit.velocityX= (7+(score/4));
          }
        }
        fruit.scale=0.05;
        fruit.setLifetime=100;    
        fruitGroup.add(fruit);
    }
}

function reset(){
    gameState = "play";
    score = 0;
    hunter.addImage(hunter_image);
}