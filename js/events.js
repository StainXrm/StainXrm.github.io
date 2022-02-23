   //für Mausspielereien:
   document.addEventListener("mousemove", function(e) {
       cursorX = e.layerX;
       cursorY = e.layerY;
   });

   canvas.addEventListener("mousedown", function(e) {
       if (e.button === 0) gravitateMouse = true;
       if (e.button === 1) negativeMouse = true;
   });

   canvas.addEventListener("mouseup", function(e) {
       if (e.button === 0) gravitateMouse = false;
       if (e.button === 1) negativeMouse = false;
   });

   //touch:
   document.addEventListener("touchmove", function(e) {
       cursorX = e.touches[0].clientX;
       cursorY = e.touches[0].clientY;
   });


   canvas.addEventListener("touchstart", function(e) {
       gravitateMouse = true;
   });
   canvas.addEventListener("touchend", function(e) {
       gravitateMouse = false;
   });


   //Button events:
   document.getElementById("addButton").addEventListener("click", function(e) {
       for (let index = 0; index < 5; index++) {
           nNeurons++;
           Neurons[nNeurons] = new Neuron(nNeurons);
       }
   });

   document.getElementById("remButton").addEventListener("click", function(e) {
       for (let index = 0; index < 5; index++) {
           if (typeof Neurons[nNeurons] === "undefined") return;
           Neurons[nNeurons] = null;
           nNeurons--;
       }
   });

   document.getElementById("gravitativeNeurons").addEventListener("click", function(e) {
       gravitateNeurons = !gravitateNeurons;
       if (gravitateNeurons) this.style = "color:cyan";
       if (!gravitateNeurons) this.style = "color:white";
   });

   document.getElementById("collisionsButton").addEventListener("click", function(e) {
       collisions = !collisions;
       if (collisions) this.style = "color:cyan";
       if (!collisions) this.style = "color:white";
   });

   document.getElementById("pauseButton").addEventListener("click", function(e) {
       paused = !paused;
       if (paused) this.style = "color:cyan";
       if (!paused) {
           this.style = "color:white";
           requestAnimationFrame(animate);
       }
   })

   document.getElementById("resetButton").addEventListener("click", function(e) {
       initCanvas();
   });