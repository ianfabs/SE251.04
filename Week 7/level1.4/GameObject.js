class GameObject
{
    constructor()
    {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.w = 100;
        this.h = 100;
        this.vx = 0;
        this.vy = 0;
        this.color="gold";
        this.radius=50;
        this.startAngle = 0;
        this.endAngle = 2*Math.PI;
    }

    drawRect()
    {
        ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle*Math.PI/180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.w/2,-this.h/2,this.w,this.h);
        ctx.restore();
    }

    drawCircle(){
        ctx.save();
            ctx.translate(this.x, this.y);
            ctx.beginPath();
            ctx.arc(-this.w/2,-this.h/2,this.radius,this.startAngle,this.endAngle);
            ctx.fillStyle = this.color;
            ctx.fill();
        ctx.restore();
    }

    move()
    {
        this.x += this.vx;
        this.y += this.vy;
    }
}