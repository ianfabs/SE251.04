

var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

const states = [];
var timer; 
states["on"]  = function(){ timer = setInterval( animate , 1000/60); };
states["off"] = function(){ clearInterval(timer) };



document.querySelector("#toggleState").onclick = function (e){
    if(e.target.innerText == "On"){
		e.target.innerText = "Off";
		states["on"]();
	}else{
		e.target.innerText = "On";
		states["off"]();
	}
}

var colors = [
        "magenta",
        "cornflowerblue",
        "red",
        "bisque",
        "orange",
        "salmon",
        "pink",
        "coral",
        "PAPAYAWHIP",
        "PEACHPUFF",
        "lavender",
        "thistle",
        "plumb",
        "mediumpurple",
        "slateblue",
        "limegreen",
        "palegreen",
        "mediumseagreen"
    ];
	
var s = [];
    for (var i = 0; i < 50; i++) {
    s[i] = new GameObject();
    s[i].x = canvas.width / 2;//Math.random()*canvas.width;
    s[i].y = canvas.height / 2;//Math.random()* canvas.height;
    s[i].vy = Math.random() * 20 -10;
    s[i].vx = Math.random() * 20 -10;
    s[i].w = 10;
    s[i].h = 10;
    s[i].radius = 20;
}

var box = new GameObject();
box.vx = 5;
box.vy = 2;
var circle = new GameObject();
circle.vx = (Math.random() * 20) - 10;
circle.vy = (Math.random() * 20) - 10;
console.log(circle.vx, circle.vy)

function animate(){
	
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //create a box
    
    //functions to run the examples
    var examples = [];
    
    //one box
    examples[0] = function () {
        if (box.x > canvas.width - box.w / 2) {
            box.vx = -box.vx;
        }
        if (box.x < 0 + box.w / 2) {
            box.vx = -box.vx;
        }
        if (box.y > 0 + canvas.height - box.h / 2) {
            box.vy = -box.vy;
        }
        if (box.y < 0 + box.h / 2) {
            box.vy = -box.vy;
        }
        box.move();
        box.drawRect();
    };
    
    //multiple boxes
    examples[1] = function () {
        for (i = 0; i < s.length; i++) {
            /*s[i].vy = Math.random()*2+-1;
            s[i].vx = Math.random()*2+-1;*/
            s[i].drawRect();
            s[i].move();
            if (s[i].y > canvas.height) {
                s[i].y = 0;
            }
        }
    };
    
    examples[2] = function () {
        if (circle.x > canvas.width) {
            circle.vx = -circle.vx;
        }
        if (circle.x < 0 + circle.radius * 2) {
            circle.vx = -circle.vx;
        }
        if (circle.y > 0 + canvas.height) {
            circle.vy = -circle.vy;
        }
        if (circle.y < 0 + circle.radius * 2) {
            circle.vy = -circle.vy;
        }
        circle.move();
        circle.drawCircle();
    };
    
    examples[3] = function () {
        for (i = 0; i < s.length; i++) {
            /*s[i].vy = Math.random()*2+-1;
            s[i].vx = Math.random()*2+-1;*/
            
            if (s[i].x >= canvas.width) {
                s[i].vx = -s[i].vx;
            }
            if (s[i].x <= 0 + s[i].radius * 2) {
                s[i].vx = -s[i].vx;
            }
            if (s[i].y >= 0 + canvas.height) {
                s[i].vy = -s[i].vy;
            }
            if (s[i].y <= 0 + s[i].radius * 2) {
                s[i].vy = -s[i].vy;
            }
            s[i].move();
            s[i].drawCircle();
        }
        
    };
    
    examples[4] = function () {
        for (i = 0; i < s.length; i++) {
            /*s[i].vy = Math.random()*2+-1;
            s[i].vx = Math.random()*2+-1;*/
            
            if (s[i].x >= canvas.width) {
                s[i].vx = -s[i].vx;
                s[i].color = colors[ Math.ceil( Math.random() * colors.length ) ]
            }
            if (s[i].x <= 0 + s[i].radius) {
                s[i].vx = -s[i].vx;
                s[i].color = colors[ Math.ceil( Math.random() * colors.length ) ]
            }
            if (s[i].y >= 0 + canvas.height) {
                s[i].vy = -s[i].vy;
                s[i].color = colors[ Math.ceil( Math.random() * colors.length ) ]
            }
            if (s[i].y <= 0 + s[i].radius) {
                s[i].vy = -s[i].vy;
                s[i].color = colors[ Math.ceil( Math.random() * colors.length ) ]
            }
            s[i].move();
            s[i].drawCircle();
        }
    };

    return examples[4]();
}
