//创建画布
let canvas = document.getElementById("drawing-board");
let ctx = canvas.getContext("2d");
// 橡皮擦
let eraser = document.getElementById("eraser");
//刷子
let brush = document.getElementById("brush");
//清空
let reSetCanvas = document.getElementById("clear");
//颜色按钮(
let aColorBtn = document.getElementsByClassName("color-item");
//保存
let save = document.getElementById("save");
//幅度大小
let range = document.getElementById("range");



let clear = false;       //清空

let activeColor = "black";      //默认颜色

let lWidth = 4;           //默认大小

autoSetSize(canvas);        //初始化  

setCanvasBg("white");           //画布背景

listenToUser(canvas);            //监听使用者

getColor();                       //获取颜色

//初始化画布大小
function autoSetSize(canvas) {
    canvasSetSize();

    function canvasSetSize() {
        let pageWidth = document.documentElement.clientWidth;
        let pageHeight = document.documentElement.clientHeight;

        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }

    window.onresize = function () {
        canvasSetSize();
    };
}


//设置颜色
function setCanvasBg(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}


//监听使用者
function listenToUser(canvas) {
    let painting = false;
    // 一开始记录
    let lastPoint = { x: undefined, y: undefined };

    // 鼠标按下
    canvas.onmousedown = function (e) {
        this.firstDot = ctx.getImageData(0, 0, canvas.width, canvas.height); //在这里储存绘图表面
        painting = true;
        let x = e.clientX;
        let y = e.clientY;
        lastPoint = { x: x, y: y };
        ctx.save();
        drawCircle(x, y, 0);
    };
    // 鼠标移动
    canvas.onmousemove = function (e) {
        if (painting) {
            let x = e.clientX;
            let y = e.clientY;
            let newPoint = { x: x, y: y };
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y, clear);
            lastPoint = newPoint;
        }
    };
    // 鼠标松开
    canvas.onmouseup = function () {
        painting = false;
    };
    // 鼠标离开
    canvas.mouseleave = function () {
        painting = false;
    };

}

// 坐标函数
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


//画线的函数
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

//改变大小
range.onchange = function () {
    lWidth = this.value;
};

//橡皮擦
eraser.onclick = function () {
    clear = true;
    this.classList.add("active");
    brush.classList.remove("active");
};


//画笔的大小
brush.onclick = function () {
    clear = false;
    this.classList.add("active");
    eraser.classList.remove("active");
};

// 清空画布
reSetCanvas.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasBg("white");
};

//保存为png
save.onclick = function () {
    let imgUrl = canvas.toDataURL("image/png");
    let saveA = document.createElement("a");
    document.body.appendChild(saveA);
    saveA.href = imgUrl;
    saveA.download = "zspic" + new Date().getTime();
    saveA.target = "_blank";
    saveA.click();
};

//获取颜色
function getColor() {
    for (let i = 0; i < aColorBtn.length; i++) {
        aColorBtn[i].onclick = function () {
            for (let i = 0; i < aColorBtn.length; i++) {
                aColorBtn[i].classList.remove("active");
                this.classList.add("active");
                activeColor = this.style.backgroundColor;
                ctx.fillStyle = activeColor;
                ctx.strokeStyle = activeColor;
            }
        };
    }
}
