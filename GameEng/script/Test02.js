define([
    "jquery",
    "Log",
    "GameEngine/GameEngine",
    "GameEngine/VecLib",
    "GameEngine/TextArea"

],
function ($, Log, GameEngine, VecLib, TextArea) {

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
            data: "M13,2.413L10,0v1.951C4.393,2.456,0,7.168,0,12.906c0,6.075,4.925,11,11,11v-1c-5.523,0-10-4.477-10-10c0-5.185,3.947-9.449,9-9.951v1.871L13,2.413z"
        });
        
        var text = new TextArea(self, {
            left: 100,
            top: 100,
            width: 200,
            height: 30,
            size: 24,
            font: "Segoe Script,方正行楷",
            color: "#FFFF00",
            backColor: null,
            text: "哈哈哈哈123abcd",
        });

        this.onPaint = function (g, rect) {
            var t = new VecLib.Transform();
            t.translate(self.cursor.location.x, self.cursor.location.y).scale(4,4);
            test.paint(g, t.value);

            
        }
    }
});