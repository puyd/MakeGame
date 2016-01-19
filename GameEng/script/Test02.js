define([
    "jquery",
    "Log",
    "GameEngine/GameEngine",
    "GameEngine/VecLib"

],
function ($, Log, GameEngine, VecLib) {

    return Game;

    function Game(cav) {
        GameEngine.apply(this, [cav]);

        var self = this;

        this.backColor = "#000000";

        var curNormal = new VecLib.Image([
                    new VecLib.Path({
                        color: "#00FF00",
                        width: 5,
                        fill: "",
                        data: "M6,16 0,0 16,6"
                    }),
                    new VecLib.Path({
                        color: "#000000",
                        width: 1,
                        fill: "",
                        data: "M6,16 0,0 16,6"
                    })
        ]);
        
        self.cursorType = new self.cursor.CursorType(curNormal);

        var test = new VecLib.Path({
            color: "#00FF00",
            width: 2,
            fill: "#00FF00",
            data: ""
        });
        

        this.onPaint = function (g, rect) {
            var t = new VecLib.Transform();
            t.translate(self.cursor.location.x, self.cursor.location.y).scale(8,8);
            test.paint(g, t.value);
        }
    }
});