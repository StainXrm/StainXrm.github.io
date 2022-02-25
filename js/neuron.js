/* Ein neues Neuron! Oh JS, deine Klassen sind auch nur Funktionen in Disguise */
class Neuron {
    constructor(id) {
        this.size = Math.random() * 5 + 1;
        this.gotosize = this.size;
        this.x = this.size + Math.random() * (canvas.width - this.size * 2);
        this.y = this.size + Math.random() * (canvas.height - this.size * 2);
        this.id = id;
        this.connections = [];
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.vxmax = Math.random() * 2 - 1;
        this.vymax = Math.random() * 2 - 1;
    }
    draw = function() {
        this.gravityMouse();
        if (antigravityNeurons) this.antiGravity();
        this.collisionCheck();
        this.calcCoords();
        this.drawNeuron();
        this.drawLines();
    }

    calcCoords = () => {
        //Normalisierung für Neuronen-Geschwindigkeit:
        if (this.vx > this.vxmax) this.vx -= VELOCITYCHANGSPEED;
        if (this.vy > this.vymax) this.vy -= VELOCITYCHANGSPEED;
        if (this.vx < -this.vxmax) this.vx += VELOCITYCHANGSPEED;
        if (this.vy < -this.vymax) this.vy += VELOCITYCHANGSPEED;

        //Nächste Koordinaten auf:
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;

        //Hier setzen wir dem spielraum Grenzen:
        if (this.x >= canvas.width - this.size) {
            this.vx = -this.vx;
            this.x = canvas.width - this.size;
        }
        if (this.y >= canvas.height - this.size) {
            this.vy = -this.vy;
            this.y = canvas.height - this.size;
        }
        if (this.x <= 0 + this.size) {
            this.vx = -this.vx;
            this.x = 0 + this.size;
        }
        if (this.y <= 0 + this.size) {
            this.vy = -this.vy;
            this.y = 0 + this.size;
        }
    }

    gravityMouse = () => {
        //Die Maus spielt mit!
        if (getDistance(cursorX, cursorY, this.x, this.y) < MOUSERANGE) {
            if (gravitateMouse) this.vx -= ((this.x - cursorX) / 1000) * MOUSEGRAVITY;
            if (gravitateMouse) this.vy -= ((this.y - cursorY) / 1000) * MOUSEGRAVITY;
            if (negativeMouse) this.vx += ((this.x - cursorX) / 1000) * MOUSEGRAVITY;
            if (negativeMouse) this.vy += ((this.y - cursorY) / 1000) * MOUSEGRAVITY;
        }
    }

    antiGravity = () => {
        //Sehr anzüglich, die Gravitation!
        for (let index = 0; index < nNeurons; index++) {
            if (typeof Neurons[index] === "undefined") continue;
            if (this.x === Neurons[index].x && this.y === Neurons[index].y) continue;
            if (getDistance(this.x, this.y, Neurons[index].x, Neurons[index].y) < MAXLINEDISTANCE / 4) {
                this.vx += (this.x - Neurons[index].x) * 0.0008;
                this.vy += (this.y - Neurons[index].y) * 0.0008;
            }
        }
    }

    collisionCheck = () => {
        //Sehr anzüglich, die Gravitation!
        for (let index = 0; index < nNeurons; index++) {
            if (typeof Neurons[index] === "undefined") continue;
            if (this.x === Neurons[index].x && this.y === Neurons[index].y) continue;
            if (collisions) {
                if (getDistance(this.x, this.y, Neurons[index].x, Neurons[index].y) <= this.size + Neurons[index].size) {
                    this.vx += (this.x - Neurons[index].x) * 0.01;
                    this.vy += (this.y - Neurons[index].y) * 0.01;
                }
            }
        }
    }

    drawNeuron = () => {
        //ab ans Zeichenbrett:
        this.gotosize = this.connections.length / 2 + 1;
        if (this.size < this.gotosize) this.size += 0.02;
        if (this.size > this.gotosize && this.size > 1) this.size -= 0.02;
        ctx.beginPath();
        ctx.globalCompositeOperation = "source-over";
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
    }

    drawLines = () => {
        //Verbindungslinien der Punkte
        for (let index = 0; index < nNeurons; index++) {
            if (typeof Neurons[index] === "undefined") continue;
            const i = this.connections.indexOf(Neurons[index].id);
            let distance = getDistance(this.x, this.y, Neurons[index].x, Neurons[index].y);
            if (i > -1 && distance >= MAXLINEDISTANCE) this.connections.splice(i, 1); // 2nd parameter means remove one item only
            if (this.x === Neurons[index].x && this.y === Neurons[index].y) continue;
            if (distance < MAXLINEDISTANCE) {
                if (i === -1) this.connections.push(Neurons[index].id);
                let alpha = 1 - (distance / MAXLINEDISTANCE);
                let offset = this.size / 2;
                ctx.beginPath();
                ctx.globalCompositeOperation = "destination-over";
                ctx.strokeStyle = "rgba(0,200,200, " + alpha + ")";
                ctx.moveTo(this.x - offset, this.y - offset);
                ctx.lineTo(Neurons[index].x, Neurons[index].y);
                ctx.stroke();
            }
        }
    }
}

/* Hier eine kleine Helper für Disanzberechnung */
const getDistance = (x1, y1, x2, y2) => {
    let x = x2 - x1;
    let y = y2 - y1;
    return Math.sqrt(x * x + y * y);
}