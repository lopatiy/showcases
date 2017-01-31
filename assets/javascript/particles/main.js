
function setup() {
    createCanvas(800, 800);
    var particlesMap = new Array(width+1);

    for (var i = 0; i < particlesMap.length; i++) {
        particlesMap[i] = (new Array(height+1));
    }

    fps.start();
    for (var j = 0; j < 500; j++) {
        var x = random(width);
        var y = random(height);

        particles.push(new Particle(x, y, particlesMap));
    }
}

function draw() {
    background(51);

    var mouse = createVector(mouseX, mouseY);
    var force;

    for (var i = 0; i < particles.length; i++) {
        if (isMousePressed) {
            force = p5.Vector.sub(mouse, particles[i].position).normalize().mult(particles[i].type ? 0.03 : -0.03);
            particles[i].apply(force);
        }
        particles[i].update();
        particles[i].edges(1);
        particles[i].links();
        particles[i].show();
    }

    rotate(0,0,2);
    fps.frame();
}