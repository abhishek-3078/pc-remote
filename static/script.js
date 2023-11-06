document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("touchpad");
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    ctx.lineWidth = 3; // Line width
    ctx.lineCap = "round"; // Line cap style (round, butt, square)
    ctx.strokeStyle = "#29AB87"
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDrawing);
   
    function getTouchPos(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const touch = e.touches[0];
        return {
            x: (touch.clientX - rect.left) * scaleX,
            y: (touch.clientY - rect.top) * scaleY,
        };
    }
    function startDrawing(e) {
      isDrawing = true;
        const pos = getTouchPos(e);
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
    }

    function draw(e) {
      if (!isDrawing) return;
        const pos = getTouchPos(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.closePath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});







let cursorX = 0;
let cursorY = 0;
let currentX=0; currentY=0;
let double_touch_time=0;
function display(d){
document.getElementById("error").innerText=d
}
const touchpad = document.getElementById("touchpad");
const e = document.getElementById("error");
function moveCursor(x, y) {

moveMouse(x, y);

}
let isTouching = false;
let double_touch=false;
let lastTapTime = 0;
touchpad.addEventListener('touchstart', (e) => {
    isTouching = true;
    e.preventDefault();
    let fingers=e.touches.length;
    const currentTime = new Date().getTime();
    if(fingers==2){
      double_touch=true;
      // display("two fingers")
      double_touch_time=currentTime;
      return;
    }else{
      double_touch=false;
    }
    const touch = e.touches[0];
    
    cursorX = touch.clientX;
    cursorY = touch.clientY;
if (
  currentTime - lastTapTime > 100 &&
  currentTime - lastTapTime < 300
) {
  
  display("Double tap detected!!");
  clickEvent()

}
lastTapTime = currentTime;
});


touchpad.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const deltaX = touch.clientX - cursorX;
    const deltaY = touch.clientY - cursorY;
    cursorX = touch.clientX;
    cursorY = touch.clientY;
    // display(double_touch+" "+deltaY)
    if(double_touch){
      display("Scrolling")
      scroll(deltaY);
      return;
    }
   
    const newX = currentX + deltaX;
    const newY = currentY + deltaY;
    // if(double_touch){
    //   dragMouse(deltaX,deltaY);
    // }else
    moveCursor(deltaX,deltaY)
    
});      
touchpad.addEventListener("touchend", () => {
isTouching = false;
if(double_touch){
  if(new Date().getTime()-double_touch_time <80){
    display("right click")
    rightclick()
    double_touch_time=0;
    // double_touch=false;
  }
}else{
  if(!double_touch && new Date().getTime()-lastTapTime <100){
    clickEvent();
  }
}
// double_touch=false;
});

touchpad.addEventListener("touchcancel", () => {
isTouching = false;
// double_touch=false;
});

e.addEventListener("dblclick", (e) => {
alert("hello error");
});
document.querySelector("#keyboard").oninput=(e)=>{
sendText(e.target.value)
e.target.value=''
}
document.addEventListener('keydown', function(event) {

if (event.key === "Backspace" || event.keyCode === 8) {

sendText("backspace") 
}
if (event.key === "Enter" || event.keyCode === 13) {

sendText("enter") 
}
});

