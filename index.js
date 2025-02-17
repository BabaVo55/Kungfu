const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.2

class Sprite {
    constructor({position, velocity}){
        this.position = position;
        this.velocity = this.velocity
        // this.size = position;
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, 150);
    }

    update(){
        this.draw();
        this.position.y =+ 10 
    }


}

const player = new Sprite({
    position : { 
        x:0,
        y:0
    },
    velocity : {
        x:0,
        y:0
    }
})

const enemy = new Sprite({
   position : {
    x: 400,
    y: 100,

    },
    velocity : {
        x:0,
        y:0
    }
})


enemy.draw();

function animate(){
    window.requestAnimationFrame(animate)
    player.update()
}

animate()