function Particle(x, y, color) {
    this.color = color;
    this.originalPosition = createVector(x, y);
    this.position = createVector(x, y).copy();
    this.type = Math.round(random(0, 1));
    
    this.linkNumber = 0;

    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.apply = function (force) {
        this.acceleration.add(force);
    };

    this.update = function () {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.linkNumber = 0;
    };

    this.friction = function () {
        this.velocity.add(this.velocity.copy().normalize().mult(-0.005));
    };

    this.edges = function (type) {
        if (!type) {
            if (this.position.x < 0 || this.position.x > width) {
                this.position.x = width - this.position.x;
            }

            if (this.position.y < 0 || this.position.y > height) {
                this.position.y = height - this.position.y;
            }
        }

        if (type === 1) {
            if (this.position.x < 0 || this.position.x > width) {
                this.velocity.x = -this.velocity.x;
            }

            if (this.position.y < 0 || this.position.y > height) {
                this.velocity.y = -this.velocity.y;
            }
        }
    };

    this.links = function () {
        for(var i = 0; i < particles.length; i++) {
            var other = particles[i];
            if(this.linkNumber < 6 && other.linkNumber < 6 ){
                var distance = dist(other.position.x,other.position.y, this.position.x, this.position.y);
                if(distance < 150) {
                    this.renderLink(other, 100 - distance/3*2)
                }
            }
        }
    };

    this.renderLink = function (other, opacity) {
        other.linkNumber++;
        this.linkNumber++;
        stroke(0,0,0,opacity);
        line(this.position.x, this.position.y, other.position.x, other.position.y);
    };

    this.show = function () {
        //this.type ? fill(255,100,100) : fill(100,100,255);
        fill(this.color);
        noStroke();
        ellipse(this.position.x, this.position.y, 5);
    };
}