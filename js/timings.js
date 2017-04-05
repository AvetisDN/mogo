//main animate function
function animate(options) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;
        var progress = options.timing(timeFraction);
        options.draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}
//Timing functions
function linear(timeFraction) {
    return timeFraction;
}
function easeInQuad(timeFraction) {
    return Math.pow(timeFraction, 2);
}
function easeInOct(timeFraction) {
    return Math.pow(timeFraction, 4);
}
function easeInCirc(timeFraction) {
    return 1 - Math.sin(Math.acos(timeFraction))
}
function easeInBack(timeFraction) {
    var x = 1.5;
    return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
}
function easeInBounce(timeFraction) {
    for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
        }
    }
}
function easeInElastic(timeFraction) {
    var x = 1.5;
    return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
}
//Reverse functions
function makeEaseOut(timing) {
    return function(timeFraction) {
        return 1 - timing(1 - timeFraction);
    }
}
var easeOutQuad = makeEaseOut(easeInQuad);
var easeOutOct = makeEaseOut(easeInOct);
var easeOutCirc = makeEaseOut(easeInCirc);
var easeOutBack = makeEaseOut(easeInBack);
var easeOutBounce = makeEaseOut(easeInBounce);
var easeOutElastic = makeEaseOut(easeInElastic);
//In-Out functions
function makeEaseInOut(timing) {
    return function(timeFraction) {
        if (timeFraction < .5)
            return timing(2 * timeFraction) / 2;
        else
            return (2 - timing(2 * (1 - timeFraction))) / 2;
    }
}
var easeInOutQuad = makeEaseInOut(easeInQuad);
var easeInOutOct = makeEaseInOut(easeInOct);
var easeInOutCirc = makeEaseInOut(easeInCirc);
var easeInOutBack = makeEaseInOut(easeInBack);
var easeInOutBounce = makeEaseInOut(easeInBounce);
var easeInOutElastic = makeEaseInOut(easeInElastic);