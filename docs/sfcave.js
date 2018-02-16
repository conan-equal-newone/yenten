var ctx, c, cw, ch;
var state = 0;
var time = 0;
var score = 0;
var highScore = 0;
var down = false;
var gameMatrix, caveTop, caveHeight, caveDelta, previousPosition, position, velocity, imageData;

$(document).ready(function(){
    c = document.getElementById("c");
    cw = c.width;
    ch = c.height;
    ctx = c.getContext("2d");
    ctx.font="16px Verdana";
    ctx.lineCap = 'round';
    gameMatrix=[];
    for(var i=0;i<4;i++){
        gameMatrix[i]=new Array(32);
    }
    if(localStorage.sfcave2_hiScore){
        highScore = parseInt(localStorage.sfcave2_hiScore,10);
    }else{
        localStorage.sfcave2_hiScore = 0;
        highScore = 0;
    }
    window.setInterval(drawFrame,75);
    $(document).on('mousedown keydown',function(){
        down=true;
    }).on('mouseup keyup',function(){
        down=false;
    });
});

function setState(s){
    state = s;
    time = 0;
}

function drawFrame(){
    time++;
    switch(state){
        case 0: // start screen
            if(time==1){ // first frame
                ctx.fillStyle='orange';
                ctx.fillRect(0,0,cw,ch);
                ctx.fillStyle = "white";
                ctx.fillText("SFCave HTML5 ver", 20,35);
                ctx.fillText("github.com/yuzawa-san", 20,55);
                if(highScore>0){
                    ctx.fillText("high score: "+highScore, 20,75);
                }
                ctx.fillText("click or spacebar to begin", 20,300);
                position=180;
                previousPosition=180;
                ctx.strokeStyle="black";
                ctx.lineWidth=3;
            }
            
            imageData=ctx.getImageData(0, 80, 256, 200);
            ctx.putImageData(imageData,-8,80);
            
            position=180-Math.sin(time/6)*(45-45*Math.cos(time/18));
            ctx.beginPath();
            ctx.moveTo(170, previousPosition);
            ctx.lineTo(178, position);
            ctx.stroke();
            previousPosition=position;
            
            if(down){
                setState(1);
            }
            return;
        case 1: // game play
            if(time==1){ // first frame
                score=0;
                caveTop=20;
                caveHeight=260;
                caveDelta=0;
                position=100;
                previousPosition=100;
                velocity=-5;
                for(var col=0; col<32; col++){
                    var cval = Math.floor(20*Math.sin(col/2)+200);
                    ctx.fillStyle="rgb(0,"+cval+",0)";
                    ctx.fillRect(col*8,0,8,300);
                    ctx.fillStyle = "#640125";
                    ctx.fillRect(col*8,caveTop,8,caveHeight);
                    gameMatrix[0][col] = caveTop;
                    gameMatrix[1][col] = caveTop+caveHeight;
                    gameMatrix[2][col] = -1;
                }
            }
            score+=2;
            if(down){
                velocity--;
            }else{
                velocity++;
            }
            if(velocity<-8){
                velocity=-8;
            }else if(velocity >8){
                velocity=8;
            }
            position+=velocity;
            if(time%10==0){
                caveHeight--;
            }
            if(Math.random() < 0.1){
                caveDelta = Math.floor(Math.random()*10-5);
            }
            caveTop+=caveDelta;
            if(caveTop<10){
                caveTop=10;
                caveDelta=Math.abs(caveDelta);
            }
            if(caveTop>290-caveHeight){
                caveTop=290-caveHeight;
                caveDelta=-Math.abs(caveDelta);
            }
            ctx.fillStyle = "gray";
            ctx.fillRect(0,300,256,30);
            ctx.fillStyle = "white";
            ctx.fillText("score: "+score,5,315);
            
            imageData=ctx.getImageData(0, 0, 256, 300);
            ctx.putImageData(imageData,-8,0);
            
            for(var k1=0; k1 < 31; k1++){
                for(var l1 = 0; l1 < 4; l1++){
                    gameMatrix[l1][k1] = gameMatrix[l1][k1 + 1];
                }
            }
            
            ctx.strokeStyle="#ccccff";
            ctx.lineWidth=6;
            ctx.beginPath();
            ctx.moveTo(60, previousPosition);
            ctx.lineTo(68, position);
            ctx.stroke();
            
            var cval = Math.floor(20*Math.sin(time/2)+200);
            ctx.fillStyle="rgb(0,"+cval+",0)";
            ctx.fillRect(248, 0, 8, 300);
            ctx.fillStyle='#640125';
            ctx.fillRect(248, caveTop, 8, caveHeight);
            
            gameMatrix[0][31] = caveTop;
            gameMatrix[1][31] = caveTop + caveHeight;
            if(time % 10 == 0)
            {
                var l = Math.floor(Math.random() * (caveHeight - 32) + caveTop);
                ctx.fillStyle="#7cfc00";
                ctx.fillRect(248, l, 8, 32);
                gameMatrix[2][31] = l;
            }
            else
            {
                gameMatrix[2][31] = -1;
            }
            previousPosition = position;
            if( position < gameMatrix[0][8] ||
                gameMatrix[1][8] < position ||
                (gameMatrix[2][8] != -1 && gameMatrix[2][8] < position && position < gameMatrix[2][8] + 32)){
                setState(2);    
            }
            return;
        case 2: // death screen
            if(time==1){ // first frame
                ctx.strokeStyle = "red";
                ctx.lineWidth=1;
                ctx.fillStyle = "gray";
                ctx.fillRect(0,300,256,30);
                ctx.fillStyle = "white";
                ctx.fillText("score: "+score,5,315);
                if(score>highScore){
                    ctx.fillText("hi score",150,315);
                    highScore=score;
                    localStorage.sfcave2_hiScore=score;
                }
            }
            
            ctx.beginPath();
        	ctx.arc(68, position, time*4, 0, Math.PI*2, true);
        	ctx.closePath();
        	ctx.stroke();
            
            if(time==15){
                down=false;
                setState(3);
            }
            break;
        case 3: // death screen
            if(time==10){ // first frame
                setState(0);
            }
            break
        default:
            console.log('other');
    }
}