var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var startGame = false;
function canvasVisibility(){
    document.getElementById("canvas").style.display = 'block';
    document.getElementById("GO").style.display = 'none';
    startGame = true;
}

class circle{
    constructor(x, y, color){
        this.x = x;
        this.y = y;
        this.r = 0.5;
        this.color = "yellow";
        this.distanceFromDot = undefined;
    }
    draw(){
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);  
        ctx.fill();    
        ctx.stroke();                            
    }
    distance(dotCenter){
        //d = (x 2 − x 1) 2 + (y 2 − y 1) 2
        var x = dotCenter.x;
        var y = dotCenter.y;
        this.distanceFromDot = (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y);
    }
}
function calculateSPercent(dots){
    var percentages = 100;
    var devided = 100000;
    var firstD = (dots[0].x - dotCenter.x) * (dots[0].x - dotCenter.x) + (dots[0].y - dotCenter.y) * (dots[0].y - dotCenter.y);
    for (let i = 0; i < dots.length; i++){
        dots[i].distance(dotCenter);
    }
    for (let i = 0; i < dots.length; i++){
        if (dots[i].distanceFromDot > firstD){
            var hefresh = dots[i].distanceFromDot - firstD;
            percentages -= hefresh / devided
        }
        else{
            var hefresh = firstD - dots[i].distanceFromDot;
            percentages -= hefresh / devided
        }
    }
    return percentages;
}
function checkCircle(dots){
    var range = 70;
    if (dots[dots.length - 1].x > dots[0].x - range && dots[dots.length - 1].x < dots[0].x + range){
        if (dots[dots.length - 1].y > dots[0].y - range && dots[dots.length - 1].y < dots[0].y + range){
            return true;
        }else return false;
    }
    else return false;
}
var inGrade = false;
var percentage = 0;
var onetime = true;
var doesTheCircleIsGood = undefined;
function grade(){
    if (onetime){
        doesTheCircleIsGood = checkCircle(circles);
        onetime = false;
        percentage = calculateSPercent(circles);
        if (percentage < 0){
            percentage = 0
        }
        percentage = Math.floor(percentage);
        
    }
    if(doesTheCircleIsGood){
        inGrade = true;
        ctx.font = "60px Comic Sans MS";
        ctx.fillText(percentage + "%", canvas.width/2 - 20, canvas.height/2 - 20);
    }
    else{
        inGrade = true;
        ctx.font = "70px Comic Sans MS";
        ctx.fillText("XX.x" + "%", canvas.width/2 - 100, canvas.height/2 - 20);
    }
    
    requestAnimationFrame(grade);
}
mouse = {
    x : undefined,
    y : undefined
}
var circles = [];
var click = false;
var dotCenter = {
    x : canvas.width / 2,
    y : canvas.height / 2,
    r : 7
}
function main(){ 
    console.log(circles.length);
    inGrade = false;
    if (!inGrade){
        if (startGame){
            ctx.fillStyle = "black";
            ctx.fillRect(0,0,canvas.width,canvas.height);
            if (click){
                circles.push(new circle(mouse.x, mouse.y, "yellow"));
            }    
            for (let i = 0; i < circles.length; i++){
                circles[i].draw();
            }
            ctx.fillStyle = "white";
            ctx.arc(dotCenter.x, dotCenter.y, dotCenter.r, 0, Math.PI * 2);
            ctx.fill();
            for(let i = 0; i < circles.length; i++){
                try{
                    ctx.beginPath();
                    ctx.lineWidth = 10;
                    ctx.strokeStyle = circles[i].color;
                    ctx.moveTo(circles[i].x, circles[i].y);
                    ctx.lineTo(circles[i + 1].x, circles[i + 1].y);
                    ctx.stroke();
                }
                catch{
                    
                }
            }
        }
    }
    requestAnimationFrame(main);
}
main();

window.addEventListener("mousemove", function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})
window.addEventListener("mousedown", function(e){
    click = true;
    if (inGrade){
        inGrade = false;
        circles = [];
        main(); 
    } 
})
var counter = 0;
window.addEventListener("mouseup", function(e){
    counter += 1;
    if (counter > 1) inGrade = true;
    click = false;
    if (inGrade){
        onetime = true;
        grade();
    }
})

