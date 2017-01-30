function Particle(x, y, particlesMap) {
    x = Math.abs(Math.floor(x));
    y = Math.abs(Math.floor(y));

    this.map = particlesMap;
    this.position = createVector(x, y);
    this.map[x][y] = 1;

    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.apply = function (force) {
        this.acceleration.add(force);
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

    this.connectors = function () {
        var size = 50;
        var x = Math.abs(Math.floor(this.position.x)) - size / 2;
        var y = Math.abs(Math.floor(this.position.y)) - size / 2;

        var iBound = size+x > 800 ? 800 : size+x;
        var jBound = size+y > 800 ? 800 : size+y;

        for (var i = x < 1 ? 0 : x; i < iBound ; i++) {
            for (var j = y < 1 ? 0 : y; j < jBound; j++) {
                if (this.map[i][j]) {
                    this.renderConnector(i, j);
                }
            }
        }
    };

    this.renderConnector = function (x, y) {
        stroke(255, 255, 255, 100);
        line(this.position.x, this.position.y, x, y);
    };

    this.show = function () {
        fill(255);
        noStroke();
        ellipse(this.position.x, this.position.y, 3);
    };
}