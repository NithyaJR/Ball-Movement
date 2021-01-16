var ball, database;

function setup(){
    createCanvas(500,500);

    database=firebase.database();

    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballPosition= database.ref("ball/position");
    ballPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-2,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(2,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-2);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+2);
    }
    drawSprites();
}

function writePosition(x,y){
    database.ref("ball/position").set({
        x:position.x+x,
        y:position.y+y
    });
}

function readPosition(data){
position= data.val();

ball.x=position.x;
ball.y= position.y;
}

function showError(){
console.log("Error in writing into the database");


}