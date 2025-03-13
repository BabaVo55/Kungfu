// import { Sprite, Fighter } from './js/classes.js';


const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const enemyHealth = document.getElementById('enemyHealth')
const playerHealth = document.getElementById('playerHealth')

// const timer = document.getElementById('timer')

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 1



// Background
const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc: './img/background.png', 
    scale: 1,
    
})

const shop = new Sprite({
    position: {
        x:600,
        y:127
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    framesMax: 6

})

// Player 1
const player = new Fighter({
    position : { 
        x:200,
        y:200
    },
    velocity : {
        x:0,
        y: 0
    },
    // color: 'red',
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.5,
    offset: {
        x: 215,
        y: 155
    }, 
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2
        }
    }
})

// Player 2
const enemy = new Fighter({
    position : {
        x: 500,
        y: 100,
        
    },
    velocity : {
        x:0,
        y: 0
    },
    // color: 'blue',
    imageScr: './img/kenji/Idle.png',
    framesMax: 8,
    scale: 2,
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



decreaseTimer()


function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    
    // enemy.update()

    //ALT VERSION FOR WHEN WE ARE NOT HOLDING DOWN ON A KEY - RESET x
    player.velocity.x = 0;
    enemy.velocity.x = 0


    // Player Movement Logic
    // player.switchSprite('idle')d
    if (keys.a.pressed && player.lastPressedKey === 'a'){
        player.velocity.x = -7;
        player.framesMax = player.sprites.run.framesMax
        // player.switchSprite(run)
        
    } 
    else if (keys.d.pressed && player.lastPressedKey === 'd') {
        player.velocity.x = 7;
        player.framesMax = player.sprites.run.framesMax
        // player.switchSprite(run)
        
    } 

    if (player.velocity.y < 0){
    //    player.switchSprite(jump)
    if (player.image !== player.sprites.jump.image){
        player.image = player.sprites.jump.image
        player.framesMax = player.sprites.jump.framesMax
    }
    }
    
    // Enemy Movement Logic
    if (keys.ArrowLeft.pressed && enemy.lastPressedKey === 'ArrowLeft'){
        enemy.velocity.x = -10; 
    } 
    else if (keys.ArrowRight.pressed && enemy.lastPressedKey === 'ArrowRight'){
        enemy.velocity.x = 10;
    } 

    
    // else {
    //     enemy.velocity.x = 0;
    // }

    //Collision Detection System

    if (rectangularCollision({rectangle1:player, rectangle2:enemy}) && player.isAttacking){
        player.isAttacking = false
        enemy.health -= 20
        enemyHealth.style.width =  enemy.health + '%'
    } else if(rectangularCollision({rectangle1:enemy, rectangle2:player}) && enemy.isAttacking){
        enemy.isAttacking = false;
        player.health -= 20
        playerHealth.style.width = player.health + '%'
    }

    // Game over
    if (enemy.health <= 0 || player.health <= 0){
        determineWinner({player:player, enemy:enemy, timerId:timerId})

        document.getElementById('displayText').style.display = 'flex'
        document.getElementById('displayText').innerText = 'Game Over'

        if (enemy.health === 100){
            document.getElementById('displayText').innerText = 'Flawless Victory';
            player.height = 0
            player.width = 0

        } else if(player.health === 100){
            document.getElementById('displayText').innerText = 'Perfect Victory';
            enemy.height = 0
            enemy.width = 0
        }

    }

    // I THINK THIS MAKES MORE SENSE FOR INFINITE ANIMATION RATHER THAN ON TOP
    // window.requestAnimationFrame(animate)

} 


animate()


document.addEventListener('keydown', (event) => {
    
    console.log(event.key)
    switch (event.key){
        case 'd':
            keys.d.pressed = true
            player.lastPressedKey = 'd'
            player.image = player.sprites.run.image
        break
        case 'a':
            keys.a.pressed = true
            player.lastPressedKey = 'a'
            player.image = player.sprites.run.image
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

        // PlayerAttack command
        case ' ':
            player.attack()
        break

        // EnemyAttack command
        case 'ArrowDown':
            enemy.attack()
        break
    }

    // console.log(event)
    console.log(event.key)
    // const right = event[key] === 'k'
})
document.addEventListener('keyup', (event) => {
    switch (event.key){
        case 'd':
            keys.d.pressed = false
            player.image = player.sprites.idle.image

        break
        case 'a':
            keys.a.pressed = false
            player.image = player.sprites.idle.image

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