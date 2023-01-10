class Sand{
    constructor(x, y, width, height, enviroment){
        this.x = x;
        this.y = y;
        this.w = width; 
        this.h = height;
        this.env = enviroment;

        this.isVisible = true;
    }

    touchingRoomba(){
        let isTouchingRoomba = false; 
        let distanceToRoomba = 0;
        
        distanceToRoomba= distanceBetweenPoints( ROOMBA.x, this.x, ROOMBA.y, this.y ) *0.9;
        isTouchingRoomba = isTouchingRoomba || (distanceToRoomba <= ROOMBA.r);

        distanceToRoomba= distanceBetweenPoints( ROOMBA.x, this.x+this.w, ROOMBA.y, this.y )*0.9;
        isTouchingRoomba = isTouchingRoomba || (distanceToRoomba <= ROOMBA.r);

        distanceToRoomba= distanceBetweenPoints( ROOMBA.x, this.x+this.w, ROOMBA.y, this.y+this.h )*0.9;
        isTouchingRoomba = isTouchingRoomba || (distanceToRoomba <= ROOMBA.r);

        distanceToRoomba= distanceBetweenPoints( ROOMBA.x, this.x, ROOMBA.y, this.y+this.h )*0.9;
        isTouchingRoomba = isTouchingRoomba || (distanceToRoomba <= ROOMBA.r);

        return isTouchingRoomba;
    }

    update(){
        const touchingRoomba = this.touchingRoomba();
        if (touchingRoomba){
            this.eliminate();
        }
    }

    eliminate(){
        this.isVisible = false;
    }

    draw(){
        if (!this.isVisible) return;

        fill('yellow')
        rect(this.x, this.y, this.w, this.h);
    }
}