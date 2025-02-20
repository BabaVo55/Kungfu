const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.7

class Sprite {
    constructor({position, velocity, type}){
        this.position = position;
        this.velocity = velocity;
        this.type = type
        this.height = 150
        this.width = 50
        this.lastPressedKey;
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 10,
            offset: 50,
            player:{
                specs: {
                 
                        position: this.position,
                        width: 100,
                        height: 10,
                    
                },
                offset: 50
            }

        }
        this.health = 100;
        this.isAttacking
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        
        //Attack Box
        if (this.type === 'player'){
            c.fillStyle = 'yellow'
            c.fillRect(this.attackBox.position.x + this.attackBox.offset, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        }else{
            c.fillStyle = 'white'
            c.fillRect(this.attackBox.player.specs.position.x - 100, this.attackBox.player.specs.position.y + 30, this.attackBox.player.specs.width, this.attackBox.player.specs.height)

        }
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
    type: 'player'
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
    type: ''
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

    if (player.attackBox.position.x + player.attackBox.width + player.attackBox.offset >= enemy.position.x && 
        player.attackBox.position.x <= enemy.position.x + enemy.width && 
        player.attackBox.position.y + player.attackBox.height >= enemy.position.y && 
        player.attackBox.position.y <= enemy.position.y + enemy.height && player.isAttacking){
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