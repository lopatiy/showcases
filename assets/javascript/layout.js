function Layout() {
    this.img = createImage(width, height);
    this.img.loadPixels();

    this.clear = function () {
        this.img = createImage(width, height);
        this.img.loadPixels();
    };

    this.setColor = function(x,y, color) {
        this.img.set(x,y, color)
    };

    this.render = function () {
        this.img.updatePixels();
        image(this.img, 0, 0, width, height);
        this.clear();
    }
}