// import { Sprite, Fighter } from './js/classes.js';


const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const enemyHealth = document.getElementById('enemyHealth')
const playerHealth = document.getElementById('playerHealth')

// const timer = document.getElementById('timer')

canvas.width = 1024;
canvas.height = 576;

c.fillRect(0,0,canvas.width,canvas.height)

const gravity = 0.7




const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc: './img/background.png'
})



const player = new Fighter({
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

const enemy = new Fighter({
    position : {
        x: 500,
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



function determineWinner({player, enemy, timerId}){
    clearTimeout(timerId)
    if (player.health === enemy.health) {
        document.getElementById('displayText').innerText = 'Its A Tie!!!'
    }
    
    else if (player.health > enemy.health){
        document.getElementById('displayText').innerText = "Player 1 Wins"
    }
    
    else if (enemy.health > player.health){
        document.getElementById('displayText').innerHTML = 'Player 2 Wins';
    }
    
}
       
let timer = 20
let timerId;


function decreaseTimer(){
    
    if (timer > 0) {
        timer--
        document.getElementById('timer').innerHTML = timer
        timerId = setTimeout(decreaseTimer, 1000)
        console.log(timerId)
    } 

     if (timer === 0){
        document.getElementById('displayText').style.display = 'flex'
        determineWinner({player:player, enemy:enemy, timerId:timerId})
    }
}


decreaseTimer()


function animate(){
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
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