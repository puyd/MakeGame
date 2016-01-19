define([
    "jquery",
    "Log",
    "GameEngine/GameEngine",
    "GameEngine/TextArea"
],
function ($, Log, GameEngine, TextArea) {
    return (function (cav) {
        
        var self = this;

        var start;
        var fps;

        var src;

        var sprite;
        var back;

        function init() {
            
            start = (new Date()).getTime();
            fps = 0;

            src = { x: 0, y: 0, w: self.width, h: self.height };

            back = new self.Image({
                img: "pic/map01.png",
                width: 807,
                height: 649
            });

            sprite = new self.Image({
                img: "pic/001.png",
                width: 128,
                height: 128,
                col: 8
            });

            var tw=new TextArea(self,{
                left:100,
                top:100,
                width:200,
                height:30,
                //backColor:"#FF0000",
                text: "",
            });

            for (var i = 0; i < 7; i++) {
                tw.text += "哈哈哈哈哈1234567";
            }

            Log.write("game.init()");
        }



        this.onPaint = function (g, rect) {

            fps++;

            var delta = (new Date()).getTime() - start;
            var f = fps * 1000.0 / delta;

            g.clear("#000000");

            var dest = { x: 0, y: 0, w: self.width, height: self.height };
            testMouse();


            back.draw(0, src, dest);

            g.drawLine(new Line(self.mouse.x, 0, self.mouse.x, rect.h), "#FFFF00", 2);
            g.drawLine(new Line(0, self.mouse.y, rect.w, self.mouse.y), "#FFFF00", 2);

            g.drawText({ text: f.toFixed(1) + "帧/秒", x: self.width - 100, y: 0, color: "#00FF00", size: "20px", font: "楷体" });

            var sr = 32;
            var sx = 0;
            var dx = sr * Math.sqrt(3);
            var sw = dx * 12;
            var sy = 0;
            var sh = sr * 7 / (2 / 3);

            for (var j = 0; j < sh / sr * 2 / 3; j++) {
                var iy = sy + sr * (3 / 2 * j + 1);
                var cnt = sw / dx;
                if (j % 2 == 1) cnt--;
                for (var i = 0; i < cnt  ; i++) {
                    var ix = i * dx + dx / 2 + sx;

                    if (j % 2 == 1) {
                        ix += dx / 2;
                    }

                    var s = new SexangleCR(ix, iy, sr);
                    g.drawPolygon(s, "#FF0000", 1);
                }
            }

            g.drawRect(new Rect(sx, sy, sw, sh), "#00FF00", 2);

            var id = parseInt(delta / 100) % 8;

            if (id > 3) id = 7 - id;

            sprite.draw(id, null, { x: 0, y: 0 });
        }

        this.onMainLoop = function () {
        }

        this.onMouseMove = function (mouse) {
            return true;
        }

        this.onMouseUp = function (m, btn) {
            Log.write(btn);
        }

        this.onMouseWheel = function (mouse, delta) {
            var w = self.width;
            var h = self.height;

            var o = {
                x: mouse.x / w * src.w,
                y: mouse.y / h * src.h,
                s: src.w / w
            };

            if (delta > 0) {
                src.w = src.w / 1.2;
            }
            else {
                src.w = src.w * 1.2;
            }

            if (src.w < w / 2) src.w = w / 2;
            if (src.w > w) src.w = w;

            var r = h / w;
            var s = src.w / w;
            src.h = w * r * s;

            src.x = src.x - o.x * (s / o.s - 1);
            src.y = src.y - o.y * (s / o.s - 1);

            if (src.x < 0) src.x = 0;
            if (src.y < 0) src.y = 0;

            if (src.x + src.w > w) src.x = w - src.w;
            if (src.y + src.h > h) src.y = h - src.h;
        }

        function testMouse() {
            var h = back.height;
            var w = back.width;
            var x = self.mouse.x;
            var y = self.mouse.y;

            if (x > self.width - 32) {
                src.x = src.x + 10;
                if (src.x > w - src.w) src.x = w - src.w;
            }

            if (x < 32) {
                src.x = src.x - 10;
                if (src.x < 0) src.x = 0;
            }

            if (y > self.height - 32) {
                src.y = src.y + 10;
                if (src.y > h - src.h) src.y = h - src.h;
            }

            if (y < 32) {
                src.y = src.y - 10;
                if (src.y < 0) src.y = 0;
            }
        }

        function Line(x0, y0, x1, y1) {
            this.x0 = x0;
            this.y0 = y0;
            this.x1 = x1;
            this.y1 = y1;
        }

        function SexangleCR(cx, cy, r) {
            this.getPath = function () {
                var p = new Array(6);
                var dx = r * 0.5 * Math.sqrt(3);
                var dy = r * 0.5;

                p[0] = { x: cx - dx, y: cy - dy };
                p[1] = { x: cx, y: cy - r };
                p[2] = { x: cx + dx, y: cy - dy };
                p[3] = { x: cx + dx, y: cy + dy };
                p[4] = { x: cx, y: cy + r };
                p[5] = { x: cx - dx, y: cy + dy };

                return p;
            }
        }

        function Rect(x, y, w, h) {
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;

            this.getPath = function () {
                var p = new Array();
                p.push({ x: x, y: y });
                p.push({ x: x + w, y: y });
                p.push({ x: x + w, y: y + h });
                p.push({ x: x, y: y + h });
                return p;
            }
        }

        GameEngine.apply(self, [cav]);
        
        init();

        self.run();
    });
});