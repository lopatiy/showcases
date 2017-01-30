function Particle(x, y, particlesMap) {
    x = Math.abs(Math.floor(x));
    y = Math.abs(Math.floor(y));

    this.map = particlesMap;
    this.position = createVector(x, y);
    this.map[x][y] = this;
    this.type = Math.round(random(0, 1));
    
    this.linkNumber = 0;

    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.apply = function (force) {
        this.acceleration.add(force);
    };

    this.inverse = function(){
        this.type = +!this.type
    };

    this.update = function () {
        this.velocity.add(this.acceleration);

        if (this.velocity.mag() > 0.8) {
            this.velocity.add(this.velocity.copy().normalize().mult(-0.005));
        }

        try{
            this.map[Math.abs(Math.floor(this.position.x))][Math.abs(Math.floor(this.position.y))] = undefined;
        } catch (err){
            this.map[this.position.x > 800 ? 800 : this.position.x][Math.abs(Math.floor(this.position.y))] = undefined;
        }
        this.position.add(this.velocity);
        try {
            this.map[Math.abs(Math.floor(this.position.x))][Math.abs(Math.floor(this.position.y))] = 1;
        } catch (err){
            this.map[this.position.x > 800 ? 800 : this.position.x][Math.abs(Math.floor(this.position.y))] = undefined;
        }
        this.acceleration.mult(0);
        this.linkNumber = 0;
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
        stroke(255,255,255,opacity);
        line(this.position.x, this.position.y, other.position.x, other.position.y);
    };

    this.show = function () {
        this.type ? fill(255,100,100) : fill(100,100,255);
        noStroke();
        ellipse(this.position.x, this.position.y, 5);
    };
}