const MAXLINEDISTANCE = 150;
const MOUSERANGE = 200;
const VELOCITYCHANGSPEED = 0.02;
const GRAVITYMULTIPLYER = 0.001;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

var nNeurons = 0;
var Neurons = {}

window.onresize = initCanvas;

function initCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvas.centerX = canvas.width / 2;
    canvas.centerY = canvas.height / 2;
    for (let index = 0; index <= nNeurons; index++) { //clear all first!
        Neurons[index] = null;
    }
    nNeurons = Math.ceil(screen.availWidth * screen.availHeight / 20000); //calculate Neuron amount by resolution
    nNeurons = Math.max(nNeurons, 40);
    for (let index = 0; index <= nNeurons; index++) {
        Neurons[index] = new Neuron(index);
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
    for (let index = 0; index <= nNeurons; index++) {
        if (typeof Neurons[index] === "undefined") continue;
        Neurons[index].draw();
    }
    if (!paused) requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

window.addEventListener('load', function() {
    initCanvas();
})