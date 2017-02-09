function particlizeText(containerArray, text, centerX, centerY) {
    var scale = 5, step = 1;

    var textCanvas = document.createElement('canvas');
    textCanvas.width = text.length * consts.TEXT_SIZE * 0.7;
    textCanvas.height = consts.TEXT_SIZE+5;
    var ctx = textCanvas.getContext('2d');
    ctx.font = consts.TEXT_SIZE + 'px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(text, 0, consts.TEXT_SIZE);

    text = loadImage(textCanvas.toDataURL(), function () {
        text.loadPixels();

        var offX = centerX - textCanvas.width/2 * scale,
            offY = centerY - textCanvas.height/2 * scale;

        for (var x = 0; x < text.width; x+=step) {
            for (var y = 0; y < text.height; y+=step) {
                var pxColor = text.get(x, y);
                if (Math.max.apply(this, pxColor)) {
                    containerArray.push(new Particle(offX + x * scale, offY + y * scale, pxColor))
                }
            }
        }
    });
}

function particlizeImg(containerArray, img, centerX, centerY) {
    var scale = 3, step = 2;

    var logo = loadImage(img, function () {
        logo.loadPixels();

        var offX = centerX - logo.width/2 * scale,
            offY = centerY - logo.height/2 * scale;

        for (var x = 0; x < logo.width; x+=step) {
            for (var y = 0; y < logo.height; y+=step) {
                var pxColor = logo.get(x, y);
                if (Math.max.apply(this, pxColor)) {
                    containerArray.push(new Particle(offX + x * scale, offY + y * scale, pxColor))
                }
            }
        }
    })
}