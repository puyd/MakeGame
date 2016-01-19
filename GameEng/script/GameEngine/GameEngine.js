define(["jquery", "Log",
        "GameEngine/Graphic",
        "GameEngine/Image",
        "GameEngine/Window",
        "GameEngine/Cursor"
],

function ($, Log, _Graphic, _Image, _Window, _Cursor) {
    return (function (cav) {

        _Window.apply(this, [null, this]);

        var ver = "0.1a";
        var self = this;
        var _f = {};
        var _b = {};

        this.cursor = new _Cursor();

        this.Image = function (data) {
            _Image.apply(this, [self, data]);
        }

        function updateCursor(e) {
            self.cursor.location = {
                x: e.offsetX * self.sx,
                y: e.offsetY * self.sy
            }
            return self.cursor.location;
        }

        this.run = function () {
            function mainLoop() {

                if (self.onMainLoop != null) {
                    self.onMainLoop();
                }
                if (self.visible) {
                    self.paint(self.g);

                    var t = self.getCursorType(self.cursor.location);
                    if (t != null) self.cursor.type = t;

                    self.cursor.paint(self.g);

                    self.g.present();

                    setTimeout(mainLoop, 15);
                }
            }

            mainLoop();
        }

        function init() {
            function onMouseMove(e) {
                var loc=updateCursor(e);
                self.mouseMove(loc);
            }

            function onMouseWheel(e) {
                var loc=updateCursor(e);
                self.mouseWheel(loc, e.wheelDelta);
            }

            function onMouseUp(e) {
                var loc=updateCursor(e);
                self.mouseUp(loc, e.button);
            }

            //_f.cav = document.getElementById(cav);
            _f.cav = $("#" + cav).get(0);
            _f.ctx = _f.cav.getContext("2d");
            self.left = 0;
            self.top = 0;
            self.width = _f.cav.width;
            self.height = _f.cav.height;

            self.cw = _f.cav.clientWidth;
            self.ch = _f.cav.clientHeight;

            self.sx = self.width * 1.0 / self.cw;
            self.sy = self.height * 1.0 / self.ch;


            //_b.cav = document.createElement("canvas");
            _b.cav = $("<canvas/>").get(0);
            _b.cav.width = self.width;
            _b.cav.height = self.height;
            _b.ctx = _b.cav.getContext("2d");

            _f.cav.oncontextmenu = function (e) { return false };

            _f.cav.addEventListener("mousemove", onMouseMove, false);
            _f.cav.addEventListener("mousewheel", onMouseWheel, false);
            _f.cav.addEventListener("mouseup", onMouseUp, false);

            self.g = new _Graphic(self, _f, _b);

            Log.write("Init GameEngine (ver " + ver + ")");
        };

        init();
    })
})
