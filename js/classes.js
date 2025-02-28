
// Background Class
class Sprite {
    constructor({position, imageSrc, scale, framesMax = 1, }){
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0 
        this.framesHold = 10
        
    }

    draw(){
        c.drawImage(
            this.image,

            // 0,     // where to begin crop on x                
            // 0,     //where to being crop on y                          
            // 1000,   // where to crop until on the x           
            // 1000,   // where to crop until on the y            

            // this.position.x,                 
            // this.position.y,                
            // 1000,
            // 1000   


            // this.image,

            // this.framesCurrent * this.image.width / this.framesMax,                               // sx: Start cropping at the current frame's X position
            // 0,                               // sy: Always 0 because we only have one row of frames
            // (this.image.width / this.framesMax),                // sWidth: Width of one frame (total width ÷ frames)
            // this.image.height,               // sHeight: Full height of the image (no vertical cropping)

            // this.position.x,                 // dx: X position on the canvas
            // this.position.y,                 // dy: Y position on the canvas
            // (this.image.width / this.framesMax) * this.scale,   // dWidth: Frame width scaled by the "scale" value
            // this.image.height * this.scale   // dHeight: Frame height scaled by the "scale" value
        )
    }
//     draw(){
//         c.drawImage(
//             this.image,
// //          CROP 
//             this.framesCurrent * (this.image.width / this.framesMax), // sx - 0 * width / 6 to split the sprite into 6 - But apparently this does'nt just cut moves???
//             0,                                                        // sy - 0 as we don't want to crop vertically as height is fine
//             this.image.width / this.framesMax,                        // sWidth - 
//             this.image.height,                                        // sHeight - 

//             this.position.x, 
//             this.position.y, 
//             (this.image.width / this.framesMax) * this.scale, 
//             this.image.height * this.scale
//         )
//     }

    draw() {
        c.drawImage(
            this.image, // The source image (like shop.png)
    
            // CROP (which part of the image to draw — defines the "frame" to show)
            this.framesCurrent * (this.image.width / this.framesMax), // sx: Start cropping at the current frame's X position
            0,                                                        // sy: Always 0 because we only have one row of frames
            this.image.width / this.framesMax,                        // sWidth: Width of one frame (total width ÷ frames)
            this.image.height,                                        // sHeight: Full height of the image (no vertical cropping)
    
            // DRAW (where and how big to draw the cropped frame on canvas)
            this.position.x,                                           // dx: X position on the canvas
            this.position.y,                                           // dy: Y position on the canvas
            (this.image.width / this.framesMax) * this.scale,          // dWidth: Frame width scaled by the "scale" value
            this.image.height * this.scale                             // dHeight: Frame height scaled by the "scale" value
        );
    }
    
 
    update(){
        this.draw();
        this.framesElapsed++
        if (this.framesElapsed % this.framesHold === 0){

            if (this.framesCurrent < this.framesMax -1){
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
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