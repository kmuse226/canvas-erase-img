const canvas = document.getElementById("canvas-005");
const backgroundCanvas = document.getElementById("canvas-004");
const mergedCanvas = document.getElementById("canvas-006");

const ctx = canvas.getContext('2d');
const mergedCtx =  mergedCanvas.getContext('2d');

const img = new Image(), origin = new Image()
img.addEventListener("load", function() {
  canvas.height = img.height;
  canvas.width = img.width;
  ctx.drawImage(img,0,0);
}, false);

img.src = "./example-(41).png"; // Set source path
origin.src = "./hang-in-there.jpg"; // Set source path

document.querySelector('#merge').addEventListener("click", () => {  

  ctx.globalCompositeOperation="destination-over"; // New shapes are drawn behind the existing canvas content. 바탕화면 그림은 기존에 존재했던 낙서뒤에 존재한다.
  ctx.drawImage(origin,0,0);
  canvas.toBlob(function(blob) {
    let link = document.createElement('a');
    link.download = 'example.png';
    link.href = URL.createObjectURL(blob);
    link.click();
    // URL.revokeObjectURL(link.href);
  }, 'image/png');

  })
let coord = { x: 0, y: 0 };
let erase = false

document.querySelector('#erase').addEventListener("click", () => {
  erase = true
})
document.querySelector('#init').addEventListener("click", () => {
  erase = false
})

document.addEventListener("mousedown", start);
document.addEventListener("mouseup", stop);
window.addEventListener("resize", resize);

resize();

function resize() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}
function reposition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}
function start(event) {
  document.addEventListener("mousemove", draw);
  reposition(event);
}
function stop() {
  document.removeEventListener("mousemove", draw);
}

function draw(event) {
  console.log(erase)
  if (erase) {
      remove(event);
      return
  }
    console.log('draw')
    ctx.globalCompositeOperation = 'source-over'
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#ACD3ED";
    ctx.moveTo(coord.x, coord.y);
    reposition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
}

function remove(event) {
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath();
    ctx.lineWidth = 30;
    ctx.lineCap = "round";
    ctx.moveTo(coord.x, coord.y);
    reposition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
}



