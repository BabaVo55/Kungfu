
// Background Class
class Sprite {
    constructor({position, imageSrc, scale, framesMax = 1}){
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale
        this.framesMax = framesMax
        
    }

    draw(){
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x, 
            this.position.y, 
            (this.image.width / this.framesMax)* this.scale, 
            this.image.height * this.scale
        )

    }

    scrollThrough(){

    }
 
    update(){
        this.draw();
    }
}




// Character Class
class Fighter {
    constructor({position, velocity, offset, color}){
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
        this.color = color;
        this.isAttacking
        this.health = 100
    }

    draw(){
        c.fillStyle = this.color
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

        if (this.position.y + this.height + this.velocity.y >= canvas.height - 95){
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }

    }
    
    attack(){
        this.isAttacking = true;

        setTimeout(() => {
            this.isAttacking = false;
        }, 100)
    }

}