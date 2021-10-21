let canvas=document.getElementById("drawing-board"),ctx=canvas.getContext("2d"),eraser=document.getElementById("eraser"),brush=document.getElementById("brush"),remove=document.getElementById("remove"),ColorBtn=document.getElementsByClassName("color-item"),save=document.getElementById("save"),range=document.getElementById("range"),clear=!1,lWidth=2;function autoSetSize(t){function e(){let e=document.documentElement.clientWidth,c=document.documentElement.clientHeight;t.width=e,t.height=c}e(),window.onresize=function(){e()}}function listenToUser(t){let e=!1,c={x:void 0,y:void 0};t.onmousedown=function(n){this.firstDot=ctx.getImageData(0,0,t.width,t.height),e=!0;let o=n.clientX,i=n.clientY;c={x:o,y:i},ctx.save(),drawCircle(o,i,0)},t.onmousemove=function(t){if(e){let e={x:t.clientX,y:t.clientY};drawLine(c.x,c.y,e.x,e.y,clear),c=e}},t.onmouseup=function(){e=!1},t.mouseleave=function(){e=!1}}function drawCircle(t,e,c){ctx.save(),ctx.beginPath(),ctx.arc(t,e,c,0,2*Math.PI),ctx.fill(),clear&&(ctx.clip(),ctx.clearRect(0,0,canvas.width,canvas.height),ctx.restore())}function drawLine(t,e,c,n){ctx.lineWidth=lWidth,ctx.lineCap="round",ctx.lineJoin="round",clear?(ctx.save(),ctx.globalCompositeOperation="destination-out",ctx.moveTo(t,e),ctx.lineTo(c,n),ctx.stroke(),ctx.closePath(),ctx.clip(),ctx.clearRect(0,0,canvas.width,canvas.height),ctx.restore()):(ctx.moveTo(t,e),ctx.lineTo(c,n),ctx.stroke(),ctx.closePath())}function getColor(){for(let t=0;t<ColorBtn.length;t++)ColorBtn[t].onclick=function(){for(let t=0;t<ColorBtn.length;t++)ColorBtn[t].classList.remove("active"),this.classList.add("active"),activeColor=this.style.backgroundColor,ctx.fillStyle=activeColor,ctx.strokeStyle=activeColor}}autoSetSize(canvas),listenToUser(canvas),getColor(),range.onchange=function(){lWidth=this.value},eraser.onclick=function(){clear=!0,this.classList.add("active"),brush.classList.remove("active")},brush.onclick=function(){clear=!1,this.classList.add("active"),eraser.classList.remove("active")},remove.onclick=function(){ctx.clearRect(0,0,canvas.width,canvas.height),setCanvasBg("white")},save.onclick=function(){let t=canvas.toDataURL("image/png"),e=document.createElement("a");document.body.appendChild(e),e.href=t,e.download="zspic"+(new Date).getTime(),e.target="_blank",e.click()};
//# sourceMappingURL=index.7e8d7a45.js.map
