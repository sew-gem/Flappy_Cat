
var cvs = document.getElementById("canvas");
var cxt = cvs.getContext("2d");

//loaed img
var bird = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
var bg = new Image();
var fg = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// var nameAudio = new audio();
// nameAudio.src = "link audio";


document.addEventListener("keydown", moveUp);
function moveUp(){
    bY -= 25;
    // nameAudio.play();
}

var pipe = [];
pipe[0]={
    x : cvs.clientWidth,
    y: 0
}

var gap = 75;
var constant = pipeNorth.height+gap;
var bX = 10;
var bY = 150;
var gravity = 1.5;

function draw(){
    cxt.drawImage(bg,0,0);
    cxt.drawImage(fg,0,cvs.height - fg.height);

    for(var i=0; i < pipeNorth.clientHeight; i++){
        cxt.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        cxt.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);

        pipe[i].x--;

        if(pipe[i].x == 125){
            pipe.push({
                x : cvs.Width,
                y : Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        //detect collision
        if(bX+bird.width >= pipe[i].x && bX <= pipe[i].x+pipeNorth.width && 
            (bY <= pipe[i].y+pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY+bird.height >= cvs.height-fg.height){
            location.reload();
        }

        if(pipe[i] == 5){
            score++;
            // nameAudio.play();
        }
    }

    cxt.drawImage(bird,bX,bY);
    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : " + score, 10, cvs.height-20);
    
    requestAnimationFrame(draw);
}
draw();

