function Particle(x,y) {
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);

    this.apply = function (force) {
        this.acceleration.add(force);
    };

    this.update = function() {
        this.velocity.add(this.acceleration);
        if(this.velocity.mag() > 0.8){
            this.velocity.add(this.velocity.copy().normalize().mult(-0.005));
        }
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    };
    
    this.edges = function (){
        if(this.position.x < 0 || this.position.x > width){
            this.position.x = width - this.position.x;
        }

        if(this.position.y < 0 || this.position.y > height){
            this.position.y = height - this.position.y;
        }
    };

    this.show = function () {
        fill(255);
        noStroke();
        ellipse(this.position.x, this.position.y, 3);
    }
}