var img;

var particles = [];

function preload() {
    var canvas = document.createElement('canvas');
    canvas.width = 55;
    canvas.height = 20;
    var ctx = canvas.getContext('2d');
    ctx.font = '16px Arial';
    ctx.fillText('Lopatiy', 0, 16);
    img = loadImage(canvas.toDataURL(), function () {
        img.loadPixels();

        var scale = 15;
        var offsetX = img.width * scale / 2;
        var offsetY = img.height * scale / 2;

        for (var x = 0; x < img.width; x++) {
            for (var y = 0; y < img.height; y++) {
                if (Math.max.apply(this, img.get(x, y))) {
                    particles.push(new Particle(offsetX + x * scale, offsetY + y * scale, color))
                }
            }
        }
    });
}

function setup() {
    createCanvas(document.body.getBoundingClientRect().width, document.body.getBoundingClientRect().height);
    preload();
    fps.start();
}

function draw() {
    background(51);
    processImage(img);
    fps.frame();
}

function processImage(img){
    for(var i = 0; i < particles.length; i++){
        var mouse = createVector(mouseX, mouseY);
        var force;

        if (isMousePressed) {
            force = p5.Vector.sub(mouse, particles[i].position).normalize().mult(particles[i].type ? 0.03 : -0.03);
            particles[i].apply(force);
        }
        particles[i].show();
        particles[i].update();
    }
}

