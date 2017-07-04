window.onload = DoStuff;
var maxPoints = 20;
var xIncrement, yIncrement;

function DoStuff() {
    var c = document.getElementById("playArea");
    xIncrement = 20;
    yIncrement = 20;

    DrawMap();
};

function DrawMap() {
    var c = document.getElementById("playArea");
    var ctx = c.getContext("2d");

    var currentPos = { x: 200, y: 25 };

    ctx.beginPath();
    ctx.moveTo(currentPos.x, currentPos.y);
    for (i = 0; i < maxPoints; i++) {
        var endPos = GetNextPosition(currentPos, i);
        console.log(endPos);
        var cPoints = GetControlPoints(currentPos, endPos);
        console.log(cPoints);
        ctx.bezierCurveTo(cPoints.cp1x, cPoints.cp1y, cPoints.cp2x, cPoints.cp2y, endPos.x, endPos.y);

        currentPos = endPos;
    }
    endPos = { x: 400, y: 25 };
    // var cPoints = GetControlPoints(currentPos, endPos);
    // ctx.bezierCurveTo(cPoints.cp1x, cPoints.cp1y, cPoints.cp2x, cPoints.cp2y, endPos.x, endPos.y);
    ctx.stroke();
};

function GetNextPosition(currentPos, index) {
    var x, y;
    if (index < maxPoints / 2) {
        if (index < maxPoints / 4) {
            x = currentPos.x - xIncrement;
        } else {
            x = currentPos.x + xIncrement;
        }
        y = currentPos.y + yIncrement;
    }
    else {
        if (index >= (maxPoints / 4) * 3) {
            x = currentPos.x - xIncrement;
        } else {
            x = currentPos.x + xIncrement;
        }
        y = currentPos.y - yIncrement;
    }

    return { x: x, y: y };

};

function GetControlPoints(currentPos, endPos) {
    var cp1x = GetIncrement(currentPos.x);
    var cp1y = GetIncrement(currentPos.y);

    var cp2x = GetIncrement(cp1x);
    var cp2y = GetIncrement(cp1y);

    // var cp1x = Math.min(endPos.x, currentPos.x * Math.random());
    // var cp1y = Math.min(endPos.y, currentPos.y * Math.random());

    // var cp2x = Math.max(endPos.x, currentPos.x * Math.random());
    // var cp2y = Math.max(endPos.y, currentPos.y * Math.random());

    return { cp1x: cp1x, cp1y: cp1y, cp2x: cp2x, cp2y: cp2y };
};

function GetIncrement(startingpoint) {
    return startingpoint + startingpoint * Math.random() / 10;
}