const BACKGROUND_COLOR = "#000000";
const LINE_COLOUR = "#FFFFFF";
const LINE_WIDTH = 15;

var currentX = 0;
var currentY = 0;
var previousX = 0;
var previousY = 0;

var canvas;
var context;

function prepareCanvas(){
    // console.log('Preparing Canvas');
    canvas = document.getElementById('my-canvas');
    context = canvas.getContext('2d');

    context.fillStyle= BACKGROUND_COLOR;
    context.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
    
    context.strokeStyle = LINE_COLOUR;
    context.lineWidth = LINE_WIDTH;
    context.lineJoin = 'round';
    
    var pressed = false;


    document.addEventListener('mousedown', function (event){
        pressed = true;
        currentX = event.clientX - canvas.offsetLeft;
        currentY = event.clientY - canvas.offsetTop;
    });
    
    document.addEventListener('mouseup', function (event){
        pressed = false;
    });
    
    canvas.addEventListener('mouseleave', function (event){
        pressed = false;
    });

    document.addEventListener('mousemove', function (event){
        
        if(pressed){
            previousX = currentX;
            currentX = event.clientX - canvas.offsetLeft;
            previousY = currentY;
            currentY = event.clientY - canvas.offsetTop;
            draw();
        }
    });

    //Touch
    canvas.addEventListener('touchstart', function (event){
        currentX = event.touches[0].clientX - canvas.offsetLeft;
        currentY = event.touches[0].clientY - canvas.offsetTop;
        pressed = true;
        console.log('Touched');
    },{passive:true});
    
    canvas.addEventListener('touchend', function (event){
        pressed = false;
    });
    canvas.addEventListener('touchcancel', function (event){
        pressed = false;
    });

    canvas.addEventListener('touchmove', function (event){
        
        if(pressed){
            previousX = currentX;
            currentX = event.touches[0].clientX - canvas.offsetLeft;
            previousY = currentY;
            currentY = event.touches[0].clientY - canvas.offsetTop;
            draw();
        }
    },{passive:true});
}

function draw() {
    context.beginPath();
    context.moveTo(previousX, previousY);
    context.lineTo(currentX, currentY);
    context.closePath();
    context.stroke();
}

function clearCanvas(){
    context.fillRect(0,0,canvas.clientWidth, canvas.clientHeight);
    currentX = 0;
    currentY = 0;
    previousX = 0;
    previousY = 0;
}