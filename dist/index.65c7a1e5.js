let canvas = document.getElementById("drawing-board");
let ctx = canvas.getContext("2d");
let eraser = document.getElementById("eraser");
let brush = document.getElementById("brush");
let remove = document.getElementById("remove");
let ColorBtn = document.getElementsByClassName("color-item");
let save = document.getElementById("save");
let range = document.getElementById("range");
let clear = false;
let lWidth = 2;
autoSetSize(canvas);
listenToUser(canvas);
getColor();
function autoSetSize(canvas) {
    canvasSetSize();
    function canvasSetSize() {
        let pageWidth = document.documentElement.clientWidth;
        let pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
    window.onresize = function() {
        canvasSetSize();
    };
}
function listenToUser(canvas) {
    let painting = false;
    let lastPoint = {
        x: undefined,
        y: undefined
    };
    canvas.onmousedown = function(e) {
        this.firstDot = ctx.getImageData(0, 0, canvas.width, canvas.height); //在这里储存绘图表面
        painting = true;
        let x = e.clientX;
        let y = e.clientY;
        lastPoint = {
            x: x,
            y: y
        };
        ctx.save();
        drawCircle(x, y, 0);
    };
    canvas.onmousemove = function(e) {
        if (painting) {
            let x = e.clientX;
            let y = e.clientY;
            let newPoint = {
                x: x,
                y: y
            };
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, clear);
            lastPoint = newPoint;
        }
    };
    canvas.onmouseup = function() {
        painting = false;
    };
    canvas.mouseleave = function() {
        painting = false;
    };
}
function drawCircle(x, y, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    if (clear) {
        ctx.clip();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }
}
function drawLine(x1, y1, x2, y2) {
    ctx.lineWidth = lWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (clear) {
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        ctx.clip();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    } else {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
    }
}
range.onchange = function() {
    lWidth = this.value;
};
eraser.onclick = function() {
    clear = true;
    this.classList.add("active");
    brush.classList.remove("active");
};
brush.onclick = function() {
    clear = false;
    this.classList.add("active");
    eraser.classList.remove("active");
};
remove.onclick = function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBg("white");
};
save.onclick = function() {
    let imgUrl = canvas.toDataURL("image/png");
    let saveA = document.createElement("a");
    document.body.appendChild(saveA);
    saveA.href = imgUrl;
    saveA.download = "zspic" + new Date().getTime();
    saveA.target = "_blank";
    saveA.click();
};
function getColor() {
    for(let i = 0; i < ColorBtn.length; i++)ColorBtn[i].onclick = function() {
        for(let i = 0; i < ColorBtn.length; i++){
            ColorBtn[i].classList.remove("active");
            this.classList.add("active");
            activeColor = this.style.backgroundColor;
            ctx.fillStyle = activeColor;
            ctx.strokeStyle = activeColor;
        }
    };
}

//# sourceMappingURL=index.65c7a1e5.js.map
