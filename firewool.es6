class Spark {
    constructor(pars) {
        this.pos = {
            x: pars.x + Math.random()*30 -15,
            y: pars.y + Math.random()*30 -15
        };

        let velocity = Math.random()*10 +5;
        let angle = pars.angle;

        this.vec = {
            x: velocity * Math.cos(angle),
            y: velocity * Math.sin(angle)
        };
        this.age = Math.random()*50 +50;
        this.killMe = false;
        this.sprite = Math.floor((Math.random()*15)*30);
    }
    update(canvas){
        this.vec.y+=.5;
        this.pos.x+=this.vec.x;
        this.pos.y+=this.vec.y;
        if (this.pos.y > canvas.height) {
            this.vec.x += Math.random()*10 -5;
            this.vec.y = Math.random()*10 -10;
            this.pos.y = canvas.height;
            this.age -= this.age/2;
        }

        this.age--;
        if (this.age <= 0 ) this.killMe = true;
    }
    render(context,img){
        context.drawImage(img,this.sprite,0,30,30,this.pos.x,this.pos.y,30,30);
    }
}

class OriginPoint {
    constructor(origin, distance = 300, speed = .1, angle = 0) {
        this.pars = {origin, distance, speed, angle};
        this.pos = {x:0,y:0};
    }
    update(){
        this.pars.angle -= this.pars.speed;
        this.pos.x = Math.round(Math.cos(this.pars.angle) * this.pars.distance + this.pars.origin.x);
        this.pos.y = Math.round(Math.sin(this.pars.angle) * this.pars.distance + this.pars.origin.y);
    }
    render(context){
        context.fillStyle = "#fff";
        context.fillRect(this.pos.x-5,this.pos.y-5,10,10);
    }
    getPars(){
        return {x:this.pos.x,y:this.pos.y,angle:this.pars.angle};
    }
}

(() => {

    let canvas = document.getElementById("can"),
        context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let spritesheet = new Image();
    spritesheet.src = "sparks.png";

    let origin = new OriginPoint({
            x: canvas.width*.5,
            y: canvas.height*.5
        }),
        sparks = [];

    function render() {
        context.fillStyle = "#000";
        context.fillRect(0,0,canvas.width,canvas.height);

        origin.update();
        origin.render(context);

        context.fillStyle = "#ff0";

        let pos = origin.getPars();
        for (let i = 0; i < Math.random()*10+5; i++) {
            sparks.push(new Spark(pos));
        }

        sparks = sparks.filter(spark => {
           spark.update(canvas);
           spark.render(context,spritesheet);

            return !spark.killMe;
        });

        context.filter = "blur(5px)";

        window.requestAnimationFrame(() => {
           render(canvas,context);
        });
    }

    render();

})();