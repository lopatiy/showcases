function Layout() {
    this.img = createImage(width, height);
    this.img.loadPixels();

    this.clear = function () {
        var length = this.img.pixels.length;
        this.img.pixels.length = 0;
        this.img.updatePixels();
        this.img.pixels.length = length;

        this.img.updatePixels();
    };

    this.setColor = function(x,y, color) {
        var idx = 4 * ((Math.floor(y) * width) + Math.floor(x));
        this.img.pixels[idx] = color[0];
        this.img.pixels[idx+1] = color[1];
        this.img.pixels[idx+2] = color[2];
        this.img.pixels[idx+3] = color[3];
    };

    this.render = function () {
        this.img.updatePixels();
        image(this.img, 0, 0, width, height);
        this.clear();
    }
}

function CanvasLayout() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');

    this.clear = function () {
        this.ctx.fillStyle = color(51);
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    };

    this.setColor = function(x,y, color) {
        this.ctx.fillStyle = 'rgb(' + color.join(',') + ')';
        this.ctx.fillRect(x,y,1,1);
    };

    this.render = function () {
        image(this.ctx, 0,0, width,height);
        this.clear();
    }
}