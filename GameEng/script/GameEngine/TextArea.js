define(["GameEngine/Window"], function (_Window) {
    return (function (parent,prop) {

        _Window.apply(this, [parent, prop]);

        var self = this;
        var output = null;

        this.update = function () {
            if (self.size == null) self.size = 12;
            if (self.font == null) self.font = "宋体";
            if (self.color == null) self.color = "#FFFFFF";
            if (self.lineH == null) self.lineH = self.size;
            if (self.text == null) self.text = "";

            output=null;
        }

        function makeOutput(g) {
            output = new Array();
            var p = getTextParam();
            p.text = self.text.replace("\r\n", "\n");

            var w = g.getTextWidth(p);

            if (w <= p.width && self.text.indexOf("\n")<0 ) {
                output.push({ y: 0, text: self.text })
                return output;
            }

            var ln = "";
            var si = 0;
            var l = self.text.length;
            var sy = 0;

            while (si < l) {
                var c = self.text.substr(si, 1);

                if (c == "\n") {
                    output.push({ y: sy, text: ln });
                    sy += p.lineH;
                    si++;
                    ln = "";
                    continue;
                }

                p.text = ln + c;
                w = g.getTextWidth(p)

                if (w > p.width) {
                    output.push({ y: sy, text: ln });
                    sy += p.lineH;
                    ln = "";
                }
                else {
                    ln += c;
                    si++;

                    if (si == l) {
                        output.push({ y: sy, text: ln });
                    }
                }
            }
            

            return output;
        }
    

        function getTextParam() {
            return {
                font: self.font,
                size: self.size.toString() + "px",
                color: self.color,
                lineH: self.lineH,
                width: self.width
            }
        }

        this.onPaint = function (g, rect) {
            if (self.text == "") return;

            if (output == null) {
                makeOutput(g);
            }

            var p = getTextParam();

            g.beginClip(rect);

            for (var i = 0; i < output.length; i++) {
                p.text = output[i].text;
                p.x = rect.x;
                p.y = rect.y + output[i].y;

                g.drawText(p);
            }

            g.endClip();
        }

        self.update();
    })
})