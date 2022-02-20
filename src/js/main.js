const MAXLINEDISTANCE = 150;
const MOUSERANGE = 200;
const VELOCITYCHANGSPEED = 0.03;
const GRAVITYMULTIPLYER = 0.001;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var nNeurons = 0;
var Neurons = {}

window.onresize = initCanvas;
initCanvas();

function initCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvas.centerX = canvas.width / 2;
    canvas.centerY = canvas.height / 2;
    let nNeurons = Math.ceil(canvas.width * canvas.height / 10000); //calculate Neuron amount by resolution
    for (const [key, e] of Object.entries(Neurons)) {
        e.exists = false;
    }
    for (let index = 0; index < nNeurons; index++) {
        Neurons[index] = new Neuron();
    }
}

var cursorX = -1;
var cursorY = -1;
var gravitateMouse = false;
var gravitateNeurons = false;
var negativeMouse = false;
var paused = false;
var collisions = true;


//die eigentliche Animation:
const animate = (currentTime) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let index = 0; index < nNeurons; index++) {
        if (typeof Neurons[index] === "undefined") continue;
        if (!Neurons[index].exists) continue;
        Neurons[index].draw();
    }
    if (!paused) requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

window.addEventListener('load', function() {
    initCanvas();
})