define(["jquery"], function ($) {
    return new function Log() {
        var log = $("#log");

        this.write = function (text) {
            if (log == null) return;

            var s = log.html().trim();
            if (s != "") s += "<br/>";
            s += text;
            log.html(s);

            log.scrollTop(999999);
        }
    }
})