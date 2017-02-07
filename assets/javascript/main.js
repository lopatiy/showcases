var logo;

var particles = [];

function preload() {
    var textCanvas = document.createElement('canvas');
    var text = 'Сёрега Играется';
    var size = 16;
    textCanvas.width = text.length * size*0.55;
    textCanvas.height = size;
    var ctx = textCanvas.getContext('2d');
    ctx.font = size + 'px Arial';

    ctx.fillText(text, 0, 16);
    var canvasImg = textCanvas.toDataURL();
    logo = loadImage('assets/img/logo_01.svg', function () {
        logo.loadPixels();

        var scale = 3,
            step = 2,
            offsetX = (document.body.getBoundingClientRect().width - (scale * logo.width))/2,
            offsetY = (document.body.getBoundingClientRect().height - (scale * logo.height))/2;

        for (var x = 0; x < logo.width; x+=step) {
            for (var y = 0; y < logo.height; y+=step) {
                var color = logo.get(x, y);
                if (Math.max.apply(this, color)) {
                    particles.push(new Particle(offsetX + x * scale, offsetY + y * scale, color))
                }
            }
        }
    });
}

var layout;

function setup() {
    createCanvas(document.body.getBoundingClientRect().width, document.body.getBoundingClientRect().height);
    preload();
    layout = new Layout();
    fps.start();
}

function draw() {
    background(51);
    processLayout();
    fps.frame();
}

function processLayout(){
    for(var i = 0; i < particles.length; i++){
        var force;

        if (isMousePressed) {
            var mouse = createVector(mouseX, mouseY);
            force = p5.Vector.sub(mouse, particles[i].position).normalize().mult(0.03);
            particles[i].apply(force);
        }

        particles[i].update();
        particles[i].friction();
        layout.setColor(particles[i].position.x,particles[i].position.y, particles[i].color);
    }

    layout.render();
}
