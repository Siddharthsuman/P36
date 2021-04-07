var database ,Dog,Dog1,DogImg1,DogImg2
var position;
var Feed,Add;
var Foodobject;
var Feedtime;
var Lastfeed;
var BackgroundImg;
var M=1;
function preload(){
  	//load images here
  DogImg1 = loadImage("Images/Dog.png");
  DogImg2 = loadImage("Images/happy dog.png");
  BackgroundImg=loadImage("Images/backgroung.png");

}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  console.log(database);
 
  Foodobject=new Food()
  Dog = createSprite(550,250,10,10);
  Dog.addImage(DogImg1);
  Dog.scale=0.2;
 
  var Dog1 = database.ref('Foodstock');
  Dog1.on("value", readPosition, showError);
  Feed = createButton("FEED SPIKE");
  Feed.position(500,85);
  Feed.mousePressed(FeedDog);
  Add = createButton("ADD FOOD");
  Add.position(400,85);
  Add.mousePressed(AddFood);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

} 

function draw(){
 background(BackgroundImg)

 textSize(30);
  fill("white");
  if(M===2){
   
    if(lastFed>=12){
    
      text(""+dogName+" was last Fed At : "+ lastFed%12 + " PM", 30,60);
     }else if(lastFed==0){
       text(""+dogName+" was Last Fed At: 12 AM",30,30);
     }else{
       text(""+dogName+" was Last Fed At: "+ lastFed + " AM", 30,60);
     }
  }

 Foodobject.display();
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);

drawSprites();
}
function readPosition(data){
  position = data.val();
  Foodobject.updateFoodStock(position);
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(F1){
  if(F1>0){
    F1=F1-1
  }
  else{
    F1=0
  }
  database.ref('/').set({
    'Foodstock': F1
  })

}
function AddFood(){
position++
database.ref('/').update({
  Foodstock:position
}

)
}
function FeedDog(){

Dog.addImage(DogImg2)
Foodobject.updateFoodStock(Foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:Foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}