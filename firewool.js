"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Spark = function () {
    function Spark(pars) {
        _classCallCheck(this, Spark);

        this.pos = {
            x: pars.x + Math.random() * 30 - 15,
            y: pars.y + Math.random() * 30 - 15
        };

        var velocity = Math.random() * 10 + 5;
        var angle = pars.angle;

        this.vec = {
            x: velocity * Math.cos(angle),
            y: velocity * Math.sin(angle)
        };
        this.age = Math.random() * 50 + 50;
        this.killMe = false;
    }

    _createClass(Spark, [{
        key: "update",
        value: function update(canvas) {
            this.vec.y += .5;
            this.pos.x += this.vec.x;
            this.pos.y += this.vec.y;
            if (this.pos.y > canvas.height) {
                this.vec.x *= .5;
                this.vec.y = Math.max(this.vec.y * -.5, -15);;
                this.pos.y = canvas.height;
            }

            this.age--;
            if (this.age <= 0) this.killMe = true;
        }
    }, {
        key: "render",
        value: function render(context) {
            context.fillRect(this.pos.x, this.pos.y, this.age / 10, this.age / 10);
        }
    }]);

    return Spark;
}();

var OriginPoint = function () {
    function OriginPoint(origin) {
        var distance = arguments.length <= 1 || arguments[1] === undefined ? 300 : arguments[1];
        var speed = arguments.length <= 2 || arguments[2] === undefined ? .1 : arguments[2];
        var angle = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

        _classCallCheck(this, OriginPoint);

        this.pars = { origin: origin, distance: distance, speed: speed, angle: angle };
        this.pos = { x: 0, y: 0 };
    }

    _createClass(OriginPoint, [{
        key: "update",
        value: function update() {
            this.pars.angle -= this.pars.speed;
            this.pos.x = Math.round(Math.cos(this.pars.angle) * this.pars.distance + this.pars.origin.x);
            this.pos.y = Math.round(Math.sin(this.pars.angle) * this.pars.distance + this.pars.origin.y);
        }
    }, {
        key: "render",
        value: function render(context) {
            context.fillStyle = "#fff";
            context.fillRect(this.pos.x - 5, this.pos.y - 5, 10, 10);
        }
    }, {
        key: "getPars",
        value: function getPars() {
            return { x: this.pos.x, y: this.pos.y, angle: this.pars.angle };
        }
    }]);

    return OriginPoint;
}();

(function () {

    var canvas = document.getElementById("can"),
        context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var origin = new OriginPoint({
        x: canvas.width * .5,
        y: canvas.height * .5
    }),
        sparks = [];

    function render() {
        context.fillStyle = "#000";
        context.fillRect(0, 0, canvas.width, canvas.height);

        origin.update();
        origin.render(context);

        context.fillStyle = "#f00";

        var pos = origin.getPars();
        for (var i = 0; i < Math.random() * 10 + 5; i++) {
            sparks.push(new Spark(pos));
        }

        sparks = sparks.filter(function (spark) {
            spark.update(canvas);
            spark.render(context);

            return !spark.killMe;
        });

        window.requestAnimationFrame(function () {
            render(canvas, context);
        });
    }

    render();
})();