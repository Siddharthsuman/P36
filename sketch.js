var dog,sadDog,happyDog;
var backgroundImg;
var food1;
var foodStock,Lastfeed;
var readStock;
var foodCount;
//var name= "Dog"
var milk,food1;
function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  backgroundImg=loadImage("Images/backgroung.png")
  milkImg = loadImage('images/Milk.png');
}

function setup() {
  createCanvas(1000,400);
  
database=firebase.database();
console.log(database);
//Food
food1=new Food();
//creating Dog sprite
  dog=createSprite(800,300,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodStock = database.ref('Food')
  foodStock.on("value",readStock);

 fedTime = database.ref('FeedTime')
  fedTime.on("value",function(data){
   lastFed=data.val();
  })

  var dog1 = database.ref('Food');
  dog1.on("value", readPosition, showError);
  feed = createButton("Feed the dog")
 feed.position(700,95)
  feed.mousePressed(FeedDog)
  add = createButton("Add Food")
  add.position(800,95)
  add.mousePressed(addFoods)

  milk = createSprite(565, 300);
  milk.addImage(milkImg);
  milk.scale = 0.1;
  milk.visible = false;
}

function draw() {
  background(backgroundImg);
  drawSprites();

  fill(93, 44, 158);
  stroke(0, 0, 0)
    strokeWeight(10);
  textSize(20);

  if(lastFed>=12){
  text("Last Feed :"+lastFed%12+"PM",100,45);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM" ,100,45);

  }
  else{
    text("Last Feed :"+lastFed+"AM",100,45);
  }
}

//function to read food Stock
function readStock(data){
  foodObj = data.val();
 
 }
 
 function showError(){
  console.log("Error in writing to the database");
}
/*
//function to update food stock and last fed time
function feedTime(time){
  Feedtime = time.val()
}*/

function FeedDog(){
  dog.addImage(happyDog);

 /* if (foodObj.getfoodStock()<=0){ 
  foodObj.updateFoodStock(foodObj-getfoodStock()*0);

  }
  else{
    foodObj.updateFoodStock(foodObj-getFoodStock()-1);
  }*/
  if(foodCount === 0) {
    foodCount = 0;
    milk.visible = false;
    dog.addImage(dogImg);
  } else {
    food1.updateFoodStock(foodCount - 1);
    milk.visible = true;
    dog.addImage(happyDog);
  }
  }



//function to add food in stock
function readPosition(data){
  position = data.val();
 // foodObj.updateFoodStock(position)

}



function addFoods(){
  food1.getFoodStock();

 food1.updateFoodStock(foodCount + 1); 

/*database.ref('/').update({
  Food:food1
})*/

}

function lastFed(){}