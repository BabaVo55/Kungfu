const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.2

class Sprite {
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.height = 150
        // this.size = position;
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update(){
        this.draw();
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }


}

const player = new Sprite({
    position : { 
        x:0,
        y:0
    },
    velocity : {
        x:0,
        y: 0
    }
})

const enemy = new Sprite({
   position : {
    x: 400,
    y: 100,

    },
    velocity : {
        x:0,
        y: 0
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    if (keys.a.pressed){
        player.velocity.x = -1
    } else if(keys.d.pressed){
        player.velocity.x = 1
    } 
    // WE DIFFER HERE
    else {
        player.velocity.x = 0
    }
}

animate()
document.addEventListener('keydown', (event) => {
    switch (event.key){
        case 'd':
            keys.d.pressed = true;
        break
        case 'a':
            keys.a.pressed = true;
        break
        // case 's':
        //     player.velocity.y + 30;
        // break
        // case 'w':
        //     player.position.y -= 20;
    }

    console.log(event)
    console.log(event.key)
    const right = event[key] === 'k'
})
document.addEventListener('keyup', (event) => {
    switch (event.key){
        case 'd':
            keys.d.pressed = false;
        break
        case 'a':
            keys.a.pressed = false;
        break
        // case 's':
        //     player.position.y += 30;
        //     player.position.y -= 20;
        // break
        // case 'w':
        //     player.position.y -= 20;
    }

    console.log(event)
    console.log(event.key)
    const right = event[key] === 'k'
})