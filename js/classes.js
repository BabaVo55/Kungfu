
// Background Class
class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1 }){
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 7;
        this.loaded = false; // ✅ Added: track if image is loaded

        this.image.onload = () => {
            this.loaded = true; // ✅ Mark image as loaded
        };

        this.image.onerror = () => {
            console.error(`Failed to load image: ${imageSrc}`); // ✅ Debug broken images
        };
        
    }


    draw() {
        if (!this.loaded) return; // ✅ Ensure image is ready before drawing

        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        );
    }
    
    
    
    update() {
        this.draw();
        this.framesElapsed++;
        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
    }
    // update() {
    //     this.draw();
    //     this.framesElapsed++;
    
    //     if (this.framesElapsed % this.framesHold === 0) {
    //         this.framesCurrent = (this.framesCurrent + 1) % this.framesMax;
    //     }
    // }
    
}




// Character Class
class Fighter extends Sprite{
    constructor({ position, velocity, offset, color, imageSrc, scale, framesMax = 1 }){
        super({ position, imageSrc, scale, framesMax });

        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastPressedKey;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 10
        };
        this.color = color;
        this.isAttacking = false;
        this.health = 100;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 7;
    }


    
    draw() {
        if (!this.loaded) return; // ✅ Added: prevent drawing if image is not ready

        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x,
            this.position.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        );
    }

        

    update(){
        
        this.draw();
        this.framesElapsed++
        // console.log(this.framesElapsed)
        if (this.framesElapsed % this.framesHold === 0){
            // console.log(this.framesElapsed % this.framesHold)
            if (this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }


    
    attack(){
        this.isAttacking = true;

        setTimeout(() => {
            this.isAttacking = false;
        }, 100)
    }
}

// RECTANGLES - PROTOTYPE
// class Fighter {
//     constructor({position, velocity, offset, color}){
//         this.position = position;
//         this.velocity = velocity;
//         this.height = 150
//         this.width = 50
//         this.lastPressedKey;
//         this.attackBox = {
//             position: {
//                 x: this.position.x,
//                 y: this.position.y
//             },
//             //Short hand syntax
//             offset,
//             width: 100,
//             height: 10,
//         },
//         this.color = color;
//         this.isAttacking
//         this.health = 100
//     }

//     draw(){
//         c.fillStyle = this.color
//         c.fillRect(this.position.x, this.position.y, this.width, this.height);
        
//         // Attack Box
//         if (this.isAttacking){
//                 c.fillStyle = 'yellow'
//                 c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
//         }
//     }
 
//     update(){
//         this.draw();
//         this.attackBox.position.x = this.position.x + this.attackBox.offset.x;
//         this.attackBox.position.y = this.position.y;
//         this.position.x += this.velocity.x
//         this.position.y += this.velocity.y

//         if (this.position.y + this.height + this.velocity.y >= canvas.height - 95){
//             this.velocity.y = 0;
//         } else {
//             this.velocity.y += gravity;
//         }

//     }
    
//     attack(){
//         this.isAttacking = true;

//         setTimeout(() => {
//             this.isAttacking = false;
//         }, 100)
//     }

// }