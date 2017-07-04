window.onload = DoStuff;
var maxPoints = 21;
var xIncrement, yIncrement;
var landTiles = [];
var landColor = "rgb(117, 80, 53)";
var playzoneSize = 200;

function DoStuff() {
    var c = document.getElementById("playArea");
    xIncrement = c.clientWidth / (maxPoints / 1.5);
    yIncrement = c.clientHeight / (maxPoints / 1.5);

    DrawMap();
    DrawPlayzone();
};

function DrawPlayzone() {
    var c = document.getElementById("playArea");
    var ctx = c.getContext("2d");

    var centroid = landTiles[Math.floor(Math.random() * landTiles.length)];
    ctx.beginPath();
    ctx.arc(centroid[0], centroid[1], playzoneSize, 0, 2 * Math.PI);
    ctx.strokeStyle = "black";
    ctx.stroke();
}

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

    ctx.fillStyle = landColor;
    ctx.strokeStyle = landColor;
    ctx.fill();
    ctx.stroke();

    CalculateLandTiles();

};

function CalculateLandTiles() {
    var c = document.getElementById("playArea");
    var ctx = c.getContext("2d");
    var x, y = 0;

    var data = ctx.getImageData(0, 0, c.clientWidth, c.clientHeight).data;
    for (i = 0; i < data.length; i += 4) {
        var x = (i / 4) % c.clientWidth;
        var y = Math.floor((i / 4) / c.clientWidth);

        if (data[i] === 117 && data[i + 1] === 80 && data[i + 2] === 53) {
            landTiles.push([x, y]);
        }
    }
}
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