(function () {
    function FPS() {
        this.counter = 0;
        this.lastValue = 0;
        this.interval = null;

        this.eachSecond = function () {
            this.lastValue = this.counter;
            this.counter = 0;
        };

        this.start = function () {
            this.interval = setInterval(this.eachSecond.bind(this), 1000);
        };

        this.frame = function () {
            this.counter++;
            textSize(16);
            fill(200, 200, 100);
            text(this.lastValue, width - 20, 20);
        };
    }

    window.fps = new FPS();
})();

