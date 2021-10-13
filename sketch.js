const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

var bg_img, fruit_img, bunny_img;
var bunny;

function preload(){
  bg_img = loadImage("background.png");
  fruit_img = loadImage("melon.png");
  bunny_img = loadImage("Rabbit-01.png");
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  bunny = createSprite(250,620,100,100);
  bunny.addImage(bunny_img);
  bunny.scale = 0.2;

  ground = new Ground(200,680,600,20);

  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);

  button = createImg("cut_button.png");
  button.position(220,30);
  button.size(40,40);
  button.mouseClicked(drop);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
  imageMode(CENTER);
}

function draw() 
{
  background(51);
  image(bg_img,width/2,height/2,500,700);

  rope.show();
  image(fruit_img, fruit.position.x,fruit.position.y,60,60);
  Engine.update(engine);
  ground.show();

 
   drawSprites();
}


function drop(){
  fruit_con.detach();
  rope.break();
  fruit_con = null;
}