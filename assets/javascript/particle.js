function Particle(x, y, fillColor) {
    this.fillColor = fillColor;
    this.originalPosition = createVector(x, y);
    this.position = createVector(x, y).copy();
    this.type = Math.round(random(0, 1));

    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);

    this.apply = function (force) {
        this.acceleration.add(force);
    };

    this.update = function () {
        this.velocity.add(this.acceleration);
        this.prevX = this.position.x;
        this.prevY = this.position.y;
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    };

    this.friction = function () {
        this.velocity.add(this.velocity.copy().normalize().mult(-consts.FORCE*0.2));
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

    this.show = function (layout) {
        layout.setColor(this.prevX, this.prevY, color(consts.BG));
        layout.setColor(this.position.x, this.position.y, this.fillColor);
    };
}