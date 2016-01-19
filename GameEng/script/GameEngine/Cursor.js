define(["jquery", "Log", "GameEngine/VecLib"], function ($, Log, VecLib) {
    return function () {
        var self = this;

        this.location = { x: 0, y: 0 }

        this.paint=function(g){
            if (self.type != null) {
                self.type.paint(g, self.location);
            }
        }

        this.type = null;

        this.CursorType = function (img) {
            
            this.paint = function (g, location) {
                var t = new VecLib.Transform();
                t.translate(location.x, location.y);
                img.paint(g, t.value);
            }
        }
    };
})