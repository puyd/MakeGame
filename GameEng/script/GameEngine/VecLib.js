define(["jquery","Log"], function ($, Log) {
    return (new function () {
        this.Image=function(prop){
            var items = prop;

            this.paint = function (g, trans) {
                if (trans == null) trans = [1, 0, 0, 0, 1, 0];
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    item.paint(g, trans);
                }
            }

            this.add=function(item){
                items.push(item);
            }
        }

        this.Path = function (prop) {
            var self = this;

            var def = {
                data: "",
                color: "#FFFFFF",
                width: 1,
                fill: ""
            };

            $.extend(this, def, prop);

            var proc = new Array();

            this.paint = function (g, trans) {

                var b = g.ctx;

                b.beginPath();
                b.strokeStyle = self.color;
                b.lineWidth = self.width;

                if (trans != null) {
                    b.setTransform(trans[0], trans[3], trans[1], trans[4], trans[2], trans[5])
                }

                for (var i = 0; i < proc.length ; i++) {
                    var p = proc[i];
                    p.do(b);
                }

                b.stroke();
                if (self.fill != null && self.fill != "") {
                    b.fillStyle = self.fill;
                    b.fill();
                }

                b.setTransform(1, 0, 0, 1, 0, 0);
            }

            function Proc(p, f, v) {
                var self = this;
                var func = [
                    "M", function (ctx) {
                        var p = param[0];
                        ctx.moveTo(p.x, p.y);
                        for (var i = 1; i < param.length; i++) {
                            var p = param[i];
                            ctx.lineTo(p.x, p.y);
                        }
                     },
                    "L", function (ctx) {
                        for (var i = 0; i < param.length; i++) {
                            var p = param[i];
                            ctx.lineTo(p.x, p.y);
                        }
                    },
                    "Q", function (ctx) {
                        for (var i = 0; i < param.length; i++) {
                            var p = param[i];
                            ctx.quadraticCurveTo(p.cx, p.cy, p.x, p.y);
                        }
                    },
                    "C", function (ctx) {
                        for (var i = 0; i < param.length; i++) {
                            var p = param[i];
                            ctx.bezierCurveTo(p.cx1, p.cy1, p.cx2, p.cy2, p.x, p.y);
                        }
                    },
                    "Z", function (ctx) {
                        ctx.closePath();
                    }
                ]

                var param = new Array();

                function getFunc(id) {
                    for (var i = 0; i < func.length; i = i + 2) {
                        if (func[i] == id.toUpperCase()) {
                            return func[i + 1];
                        }
                    }
                    return null;
                }

                if (f.match(/[ml]/i)) {
                    for (var i = 0; i < (v.length / 2) ; i++) {
                        if (f.match(/[ml]/)) {
                            p.x += parseFloat(v[i*2]);
                            p.y += parseFloat(v[i*2 + 1]);
                        }
                        else {
                            p.x = parseFloat(v[i*2]);
                            p.y = parseFloat(v[i*2 + 1]);
                        }

                        param.push({ x: p.x, y: p.y });
                    }
                }
                else if (f.match(/[h]/i)) {
                    for (var i = 0; i < (v.length) ; i++) {
                        if (f.match(/[h]/)) {
                            p.x += parseFloat(v[i]);
                        }
                        else {
                            p.x = parseFloat(v[i]);
                        }

                        param.push({ x: p.x, y: p.y });
                        f = "M";
                    }
                }
                else if (f.match(/[v]/i)) {
                    for (var i = 0; i < (v.length) ; i++) {
                        if (f.match(/[v]/)) {
                            p.y += parseFloat(v[i]);
                        }
                        else {
                            p.y = parseFloat(v[i]);
                        }

                        param.push({ x: p.x, y: p.y });
                        f = "M";
                    }
                }
                else if (f.match(/[q]/i)) {
                    for (var i = 0; i < (v.length / 4) ; i++) {
                        var c = {};
                        if (f.match(/[q]/)) {
                            c.x = p.x + parseFloat(v[i * 4]);
                            c.y = p.y + parseFloat(v[i * 4 + 1])
                            p.x = p.x + parseFloat(v[i * 4 + 2]);
                            p.y = p.y + parseFloat(v[i * 4 + 3]);
                        }
                        else {
                            c.x = parseFloat(v[i * 4]);
                            c.y = parseFloat(v[i * 4 + 1])
                            p.x = parseFloat(v[i * 4 + 2]);
                            p.y = parseFloat(v[i * 4 + 3]);
                        }

                        param.push({ cx: c.x, cy: c.y, x: p.x, y: p.y });
                    }
                }
                else if (f.match(/[c]/i)) {
                    for (var i = 0; i < (v.length / 6) ; i++) {
                        var c = {};
                        if (f.match(/[c]/)) {
                            c.x1 = p.x + parseFloat(v[i * 6]);
                            c.y1 = p.y + parseFloat(v[i * 6 + 1])
                            c.x2 = p.x + parseFloat(v[i * 6 + 2]);
                            c.y2 = p.y + parseFloat(v[i * 6 + 3])
                            p.x = p.x + parseFloat(v[i * 6 + 4]);
                            p.y = p.y + parseFloat(v[i * 6 + 5]);
                        }
                        else {
                            c.x1 = parseFloat(v[i * 6]);
                            c.y1 = parseFloat(v[i * 6 + 1])
                            c.x2 = parseFloat(v[i * 6 + 2]);
                            c.y2 = parseFloat(v[i * 6 + 3])
                            p.x = parseFloat(v[i * 6 + 4]);
                            p.y = parseFloat(v[i * 6 + 5]);
                        }

                        param.push({ cx1: c.x1, cy1: c.y1, cx2:c.x2, cy2:c.y2, x: p.x, y: p.y });
                    }
                }

                var d = getFunc(f);
                if (d != null) {
                    this.do = d;
                }
                
            }

            function init() {
                var data = self.data;

                var re = /[A-z]{1}(\s*[+-]*\d*\.*\d*[,\s]*)*/ig;
                var m = data.match(re);
                var p = { x: 0, y: 0 };

                for (var i = 0; i < m.length; i++) {
                    Log.write(m[i]);
                    var f = m[i].match(/[A-z]/g)[0];
                    var v = m[i].match(/[+-]*\d*\.*\d+/g);
                    proc.push(new Proc(p, f, v));
                }
            }

            init();
        }

        this.Transform = function (value) {
            var self = this;

            if (value == null) value = [1, 0, 0, 0, 1, 0];
            this.value = value;

            this.translate = function (x, y) {
                self.value[2] += x;
                self.value[5] += y;
                return self;
            }

            this.scale = function (x, y) {
                self.value[0] = self.value[0] * x;
                self.value[4] = self.value[4] * y;
                return self;
            }
        }

    })
})