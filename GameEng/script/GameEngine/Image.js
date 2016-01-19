define(function () {
    return (function (ge, data) {
        this.width = data.width;
        this.height = data.height;

        var col = (data.col == null) ? 1 : data.col;
        var img = new Image();

        img.src = data.img;

        this.draw = function (id, src, dest) {
            var w = this.width;
            var h = this.height;

            if (src == null) src = { x: 0, y: 0, w: w, h: h };

            if (dest.w == null) dest.w = w;
            if (dest.h == null) dest.h = h;

            if (id == null) id = 0;

            var ds = {
                x: parseInt(id % col) * w + src.x,
                y: parseInt(id / col) * h + src.y,
                w: src.w,
                h: src.h
            }

            ge.g.drawImg(img, ds, dest);
        }
    })
})