define(["Log"],function (Log) {
    return (function (ge, _f, _b) {
        var b = _b.ctx;
        var f = _f.ctx;

        this.ctx = b;

        this.present = function () {
            f.drawImage(_b.cav, 0, 0);
        }

        this.clear = function (color) {
            b.fillStyle = color;
            b.fillRect(0, 0, ge.width, ge.height);
        }

        this.drawLine = function (line, color, width) {
            if (color == null) color = "#FFFFFF";
            if (width == null) width = 1;
            b.beginPath();
            b.strokeStyle = color;
            b.lineWidth = width;
            b.moveTo(line.x0, line.y0);
            b.lineTo(line.x1, line.y1);
            b.stroke();
        }

        function setTextParam(text){
            if (text.size == null) text.size = "12px";
            if (text.font == null) text.font = "宋体";
            if (text.color == null) text.color = "#FFFFFF";
            if (text.lineH == null) text.lineH = 12;
            if (text.width == null) text.width = 0;

            b.fillStyle = text.color;
            b.font = text.size + " " + text.font;
            b.textBaseline = "top";
        }

        this.getTextWidth = function (text) {
            setTextParam(text);
            return b.measureText(text.text).width;
        }

        this.drawText = function (text) {
            setTextParam(text);
            b.fillText(text.text, text.x, text.y);
        }

        this.drawImg = function (img, src, dest) {
            if (dest == null) dest = { x: 0, y: 0, w: src.w, h: src.h };
            b.drawImage(img, src.x, src.y, src.w, src.h, dest.x, dest.y, dest.w, dest.h);
        }

       this.fillRect = function (rect, color) {
            b.fillStyle = color;
            b.fillRect(rect.x, rect.y, rect.w, rect.h);
        }

        this.drawRect = function (rect, color, width) {
            if (color == null) color = "#FFFFFF";
            if (width == null) width = 1;
            b.strokeStyle = color;
            b.lineWidth = width;
            b.strokeRect(rect.x, rect.y, rect.w, rect.h);
        }

        this.beginClip = function (rect) {
            b.save();
            b.beginPath();
            b.rect(rect.x, rect.y, rect.w, rect.h);
            b.closePath();
            b.clip();
        }

        this.endClip = function () {
            b.restore();
        }
    })
})