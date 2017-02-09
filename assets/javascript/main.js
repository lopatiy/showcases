function distanceSquared(vec1, vec2) {
    var x = vec1.x - vec2.x;
    var y = vec1.y - vec2.y;

    return x*x + y*y;
}

var particles = [],
    consts = {
        FORCE : 0.15,
        TEXT_SIZE : 16,
        BG: 55
    };

function preload() {
    consts.containerWidth = document.body.getBoundingClientRect().width;
    consts.containerHeight = document.body.getBoundingClientRect().height;
    var canvasCenterX = consts.containerWidth / 2;
    var canvasCenterY = consts.containerHeight / 2;
    
    particlizeImg(particles, 'assets/img/logo_01.svg', canvasCenterX, canvasCenterY);
    particlizeText(particles, 'FRESHCODE', canvasCenterX, canvasCenterY);
}

var layout;

function setup() {
    createCanvas(consts.containerWidth, consts.containerHeight);
    layout = new Layout();
}

function draw() {
    background(consts.BG);
    processLayout(layout);
}

function processLayout(layout){
    var mouse = createVector(mouseX, mouseY);
    for(var i = 0; i < particles.length; i++){
        if (isMousePressed) {
            var force = p5.Vector.sub(mouse, particles[i].position).normalize().mult(consts.FORCE);
            particles[i].apply(force);
        }
        particles[i].update();
        particles[i].friction();
        particles[i].show(layout);
    }
    layout.render();
}
