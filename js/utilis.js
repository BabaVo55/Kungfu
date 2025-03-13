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



let timer = 99
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