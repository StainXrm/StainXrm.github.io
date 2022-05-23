const MAXLINEDISTANCE = 150;
const MOUSERANGE = 300;
const VELOCITYCHANGSPEED = 0.03;
const MOUSEGRAVITY = 0.3;

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
    for (let index = 0; index <= nNeurons; index++) { //erst clearen
        Neurons[index] = null;
    }
    nNeurons = Math.ceil(screen.availWidth * screen.availHeight / 20000); //Neuronen Anzahl berechnen...
    nNeurons = Math.max(nNeurons, 10); //Minimum 10!
    for (let index = 0; index <= nNeurons; index++) {
        Neurons[index] = new Neuron(index); //Warum Kommentier ich eigenlich auf Deutsch?
    }
}

var cursorX = -1;
var cursorY = -1;
var gravitateMouse = false;
var antigravityNeurons = false;
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

window.addEventListener('load', function () {
    initCanvas();
})