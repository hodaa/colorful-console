"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var node_util_1 = require("node:util");
var http = require("node:http");
var ColorConsole = /** @class */ (function () {
    function ColorConsole() {
    }
    return ColorConsole;
}());
var BlueConsole = /** @class */ (function (_super) {
    __extends(BlueConsole, _super);
    function BlueConsole() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BlueConsole.prototype.log = function (input, res) {
        res.write((0, node_util_1.styleText)("red", input) + "\n");
        console.log((0, node_util_1.styleText)('blue', input));
    };
    return BlueConsole;
}(ColorConsole));
var RedConsole = /** @class */ (function (_super) {
    __extends(RedConsole, _super);
    function RedConsole() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RedConsole.prototype.log = function (input, res) {
        res.write((0, node_util_1.styleText)("red", input));
    };
    return RedConsole;
}(ColorConsole));
var GreenConsole = /** @class */ (function (_super) {
    __extends(GreenConsole, _super);
    function GreenConsole() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GreenConsole.prototype.log = function (input, res) {
        res.write((0, node_util_1.styleText)("green", input));
    };
    return GreenConsole;
}(ColorConsole));
var colorMap = {
    "red": RedConsole,
    "green": GreenConsole,
    "blue": BlueConsole
};
function factory(color) {
    var colorObj = colorMap[color];
    return new colorObj();
}
http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("Hello from my public console!\n");
    var obj = factory("red");
    obj.log("This is a red message", res);
    res.end();
}).listen(3000, function () {
    console.log("Server is running at http://0.0.0.0:3000");
});
