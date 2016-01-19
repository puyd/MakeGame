define(["jquery","Log"],function ($,Log) {
    return _Window;

    function _Window(parent, prop) {
        var self = this;

        var def = {
            left: 0,
            top: 0,
            width: 0,
            height: 0,
            visible: true,

            cursorType: null,

            onPaint: function (g, rect) { },
            onMouseMove: function (mouse) { return false; },
            onMouseWheel: function (mouse, delta) { return false;},
            onMouseUp: function (mouse, btn) { return false; }
        }

        $.extend(this, def, prop);
        
        this.children = new Array();

        if (parent != null) {
            parent.children.push(self);
            this.parent = parent;
        }

        this.getRect = function () {
            if (this.parent == null) {
                return { x: self.left, y: self.top, w: self.width, h: self.height }
            }

            var rect = this.parent.getRect();

            rect.x += self.left;
            rect.y += self.top;
            rect.w = self.width;
            rect.h = self.height;

            return rect;
        }

        this.hide = function () {
            this.visible = false;
        }

        this.show = function () {
            this.visible = true;
        }

        this.paint = function (g) {
            if (!self.visible) return;

            var rect = self.getRect();

            if (self.backColor != null) {
                g.fillRect(rect, self.backColor);
            }

            if (self.onPaint != null) {
                self.onPaint(g, rect);
            }
            for (var i = 0; i < self.children.length; i++) {
                self.children[i].paint(g);
            }
        }

        this.toClient = function (point) {
            var p = point;
            var rect = self.getRect();
            p.x -= rect.x;
            p.y -= rect.y;
            return p;
        }

        this.toScreen = function (point) {
            var p = point;
            var rect = self.getRect();
            p.x += rect.x;
            p.y += rect.y;
            return p;
        }

        this.inArea = function (point) {
            var rect = self.getRect();
            return (point.x >= rect.x
                && point.y >= rect.y
                && point.x < rect.x + rect.w
                && point.y <= rect.y + rect.h);
        }

        this.mouseMove = function (mouse) {
            for (var i = self.children.length - 1; i >= 0 ; i--) {
                var r = self.children[i].mouseMove(mouse);
                if (r) return true;
            }
            if (self.onMouseMove == null || !self.inArea(mouse)) return false;

            return self.onMouseMove(mouse);
        }

        this.mouseWheel = function (cursor, delta) {
            for (var i = self.children.length - 1; i >= 0 ; i--) {
                var r = self.children[i].mouseWheel(mouse, delta);
                if (r) return true;
            }
            if (self.onMouseWheel == null || !self.inArea(mouse)) return false;

            return self.onMouseWheel(mouse, delta);
        }

        this.mouseUp = function (mouse, btn) {
            for (var i = self.children.length - 1; i >= 0 ; i--) {
                var r = self.children[i].mouseUp(mouse, btn);
                if (r) return true;
            }
            if (self.onMouseUp == null || !self.inArea(mouse)) return false;

            return self.onMouseUp(mouse, btn);
        }

        this.getCursorType = function (mouse) {

            for (var i = self.children.length - 1; i >= 0 ; i--) {
                var t = self.children[i].getCursorType(mouse);
                if (t!=null) return t;
            }

            if (!self.inArea(mouse)) return null;

            return self.cursorType;
        }
    }
})