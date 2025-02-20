const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.7

class Sprite {
    constructor({position, velocity, offset}){
        this.position = position;
        this.velocity = velocity;
        this.height = 150
        this.width = 50
        this.lastPressedKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            //Short hand syntax
            offset,
            width: 100,
            height: 10,
        },
        this.isAttacking
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        
        // Attack Box
        if (this.isAttacking){
                c.fillStyle = 'yellow'
                c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        }
    }
 
    update(){
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
        this.attackBox.position.y = this.position.y;
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }

    }
    attack(){
        this.isAttacking = true;

        setTimeout(() => {
            this.isAttacking = false
        }, 100)
    }

}


const player = new Sprite({
    position : { 
        x:200,
        y:0
    },
    velocity : {
        x:0,
        y: 0
    },
    offset: {
        x: 50,
        y:0
    }
})

const enemy = new Sprite({
    position : {
        x: 700,
        y: 100,
        
    },
    velocity : {
        x:0,
        y: 0
    },
    offset: {
        x: -100,
        y:0
    }
})


const keys = {
    // Player bindings
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },

    // Enemy bindings
    ArrowRight: {
        pressed: false
    }, 
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

let lastPressedKey

function rectangularCollision({
    rectangle1,
    rectangle2
}){
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= enemy.position.x && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    //ALT VERSION FOR WHEN WE ARE NOT HOLDING DOWN ON A KEY - RESET x
    // player.velocity.x = 0;
    // enemy.velocity.x = 0


    // Player Movement Logic
    if (keys.a.pressed && player.lastPressedKey === 'a'){
        player.velocity.x = -10;
    } 
    else if (keys.d.pressed && player.lastPressedKey === 'd') {
        player.velocity.x = 10;
    } 
    else {
        player.velocity.x = 0;
    }
    
    // Enemy Movement Logic
    if (keys.ArrowLeft.pressed && enemy.lastPressedKey === 'ArrowLeft'){
        enemy.velocity.x = -10; 
    } 
    else if (keys.ArrowRight.pressed && enemy.lastPressedKey === 'ArrowRight'){
        enemy.velocity.x = 10;
    } 
    else {
        enemy.velocity.x = 0;
    }

    //Collision Detection System

    if (rectangularCollision({rectangle1:player, rectangle2:enemy}) && player.isAttacking){
        player.isAttacking = false
        console.log('health down by 10')
    } 
}



animate()
document.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key){
        case 'd':
            keys.d.pressed = true
            player.lastPressedKey = 'd'
        break
        case 'a':
            keys.a.pressed = true
             player.lastPressedKey = 'a'
        break
        case 'w':
            player.velocity.y = -20
        break

        //Enemy movement
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastPressedKey = 'ArrowRight';
        break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastPressedKey = 'ArrowLeft'
        break
        case 'ArrowUp':
            enemy.velocity.y = -20
        break

        // Attack command
        case ' ':
            player.attack()
    }

    // console.log(event)
    console.log(event.key)
    // const right = event[key] === 'k'
})
document.addEventListener('keyup', (event) => {
    switch (event.key){
        case 'd':
            keys.d.pressed = false

        break
        case 'a':
            keys.a.pressed = false
        break

        //Enemy movement
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft': 
            keys.ArrowLeft.pressed = false;
        break
    }

    // console.log(event)
    // console.log(event.key)
    // const right = event[key] === 'k'
})