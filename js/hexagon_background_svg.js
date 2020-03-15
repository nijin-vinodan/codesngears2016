var svgNS = "http://www.w3.org/2000/svg";
var xLinkNS = 'http://www.w3.org/1999/xlink';
var mysvg = document.getElementById('hexagon_background_svg');

var tracker;
var i = 0;
var hexagons = [];

var hexagon_min_radius = 5;
var hexagon_max_radius = 25;
var min_hexagons = 20;
var max_hexagons = 45;
var hexagon_animation_duration = '100000s';
var number_of_path_points = 1000;
var colors = ['rgb(48,86,63)', 'rgb(195,147,60)', 'rgb(190,87,52)', 'rgb(143,42,45)'];


function generateBubbles(i, mouseX, mouseY) {
    hexagon = document.createElementNS(svgNS, 'path');

    var randomRadius = (Math.random() * hexagon_max_radius);
    var hexagonRadius = randomRadius < hexagon_min_radius ? hexagon_min_radius : randomRadius;
    var hexagonPath = generateHexagonPath(0, 0, hexagonRadius);

    hexagon.setAttributeNS(null, 'd', hexagonPath);
    
    hexagon.setAttributeNS(null, 'fill', colors[i % colors.length]);

    var animateMotion = document.createElementNS(svgNS, 'animateMotion');
    var mpath = document.createElementNS(svgNS, 'mpath');

    animateMotion.setAttributeNS(null, 'dur', hexagon_animation_duration);
    animateMotion.setAttributeNS(null, 'repeatCount', 'indefinite');

    var generatedPath = 'M';

    for (var j = 0; j < number_of_path_points; j++) {
        x = (Math.random() * window.innerWidth) % window.innerWidth;
        y = (Math.random() * window.innerHeight) % window.innerHeight;

        generatedPath += (x + ',' + y + ',');
    }
    generatedPath = generatedPath.substr(0, generatedPath.length - 1);
   
    var currentPath = document.createElementNS(svgNS, 'path');
    var currentPathId = 'path' + i;
    currentPath.setAttributeNS(null, 'id', currentPathId);
    currentPath.setAttributeNS(null, 'd', generatedPath);
    currentPath.setAttributeNS(null, 'fill', "none");
    mysvg.appendChild(currentPath);

    mpath.setAttributeNS(xLinkNS, 'xlink:href', '#' + currentPathId);

    animateMotion.appendChild(mpath);
    hexagon.appendChild(animateMotion);

    mysvg.appendChild(hexagon);

    hexagons.push(hexagon);
}

for (var i = 0; i < max_hexagons; i++) {
    generateBubbles(i);
}

mysvg.onmousemove = function(event) {
    //tracker = setInterval(function() {
    generateBubbles(i++, event.x, event.y);
    //}, 10)
}

mysvg.onmouseup = function() {
    clearInterval(tracker);
}

setInterval(function() {

    if (hexagons.length > max_hexagons) {
        hexagons[0].remove();
        hexagons.splice(0, 1);
    }
}, 50);

function generateHexagonPath(x,y,r) {
    var x1 = x;
    var y1 = y-r;
    var x2 = x+(Math.cos(Math.PI/6)*r);
    var y2 = y-(Math.sin(Math.PI/6)*r);
    var x3 = x+(Math.cos(Math.PI/6)*r);
    var y3 = y+(Math.sin(Math.PI/6)*r);
    var x4 = x;
    var y4 = y+r;
    var x5 = x-(Math.cos(Math.PI/6)*r);
    var y5 = y+(Math.sin(Math.PI/6)*r);
    var x6 = x-(Math.cos(Math.PI/6)*r);
    var y6 = y-(Math.sin(Math.PI/6)*r);
    
    var path = "M"+x1+" "+y1+" L"+x2+" "+y2+" L"+x3+" "+y3+" L"+x4+" "+y4+" L"+x5+" "+y5+" L"+x6+" "+y6+"z";
    return path;
}
