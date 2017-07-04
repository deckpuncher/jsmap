window.onload = DoStuff;
var maxPoints = 21;
var xIncrement, yIncrement;

function DoStuff() {
    var c = document.getElementById("playArea");
    xIncrement = c.clientWidth / (maxPoints / 1.5);
    yIncrement = c.clientHeight / (maxPoints / 1.5);

    DrawMap();
};

function DrawMap() {
    var c = document.getElementById("playArea");
    var ctx = c.getContext("2d");

    var currentPos = { x: 400, y: 25 };

    ctx.beginPath();
    ctx.moveTo(currentPos.x, currentPos.y);
    for (i = 0; i < maxPoints; i++) {
        var endPos = GetNextPosition(currentPos, i);
        console.log(endPos);
        var cPoints = GetControlPoints(currentPos, i);
        console.log(cPoints);
        ctx.bezierCurveTo(cPoints.cp1x, cPoints.cp1y, cPoints.cp2x, cPoints.cp2y, endPos.x, endPos.y);

        currentPos = endPos;
    }
    endPos = { x: 400, y: 25 };
    var cPoints = GetControlPoints(currentPos, endPos);
    ctx.bezierCurveTo(cPoints.cp1x, cPoints.cp1y, cPoints.cp2x, cPoints.cp2y, endPos.x, endPos.y);

    ctx.fillStyle = "brown";
    ctx.strokeStyle = "brown";
    ctx.fill();
    ctx.stroke();
};

function GetNextPosition(currentPos, index, increments) {
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

function GetControlPoints(currentPos, index) {
    var cp1 = GetIncrement(currentPos, index);
    var cp2 = GetIncrement(cp1, index);

    return { cp1x: cp1.x, cp1y: cp1.y, cp2x: cp2.x, cp2y: cp2.y };
};

function GetIncrement(position, index) {
    var x, y;

    if (index < maxPoints / 2) {
        if (index < maxPoints / 4) {
            x = position.x - GetSalty(position.x);
        } else {
            x = position.x + GetSalty(position.x);
        }
        y = position.y + GetSalty(position.y);
    }
    else {
        if (index >= (maxPoints / 4) * 3) {
            x = position.x - GetSalty(position.x);
        } else {
            x = position.x + GetSalty(position.x);
        }
        y = position.y - GetSalty(position.y);
    }

    return { x: x, y: y };
}

function GetSalty(position) {
    var salt = Math.random() > 0.5 ? -1 : 1;
    return position * (Math.random() % 0.3) * salt;
}