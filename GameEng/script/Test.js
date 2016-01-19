requirejs.config({
    baseUrl: "script",
    urlArgs: "ver=" + (new Date()).getTime(),
    paths: {
        jquery: "lib/jquery-2.1.4",
    }
});

require(["Test02"], function (game) {
    var g = new game("cav");
    g.run();
});