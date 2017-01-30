var particles = [];

function setup() {
    createCanvas(800,800);

    for(var i = 0; i < 100; i++){
        particles.push(new Particle(random(width), random(height)));
    }
}

function draw(){
    background(51);

    var mouse = createVector(mouseX, mouseY);
    var force;

    for(var i = 0; i < particles.length; i++){
        if(isMousePressed){
            force = p5.Vector.sub(mouse, particles[i].position).normalize().mult(-0.003);
            particles[i].apply(force);
        }
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }
}