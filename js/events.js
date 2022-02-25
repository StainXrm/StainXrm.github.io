   //BindEvent helper function:
   function BindEvent(elem, event, callback) {
       if (typeof elem !== "string" || typeof event !== "string") return callback;
       document.querySelector(elem).addEventListener(event, callback);
   }

   //für Mausspielereien:
   BindEvent("#canvas", "mousedown", function(e) {
       if (e.button === 0) negativeMouse = true;
       if (e.button === 1) gravitateMouse = true;
       cursorX = e.layerX;
       cursorY = e.layerY;
   });

   BindEvent("#canvas", "mouseup", function(e) {
       if (e.button === 0) negativeMouse = false;
       if (e.button === 1) gravitateMouse = false;
   });

   //Touch:
   BindEvent("#canvas", "touchmove", function(e) {
       cursorX = e.touches[0].clientX;
       cursorY = e.touches[0].clientY;
   });


   BindEvent("#canvas", "touchstart", function(e) {
       gravitateMouse = true;
   });
   BindEvent("#canvas", "touchend", function(e) {
       gravitateMouse = false;
   });


   //Button events:
   BindEvent("#addButton", "click", function(e) {
       for (let index = 0; index < 5; index++) {
           nNeurons++;
           Neurons[nNeurons] = new Neuron(nNeurons);
       }
   });

   BindEvent("#remButton", "click", function(e) {
       for (let index = 0; index < 5; index++) {
           if (typeof Neurons[nNeurons] === "undefined") return;
           Neurons[nNeurons] = null;
           nNeurons--;
       }
   });

   BindEvent("#antigravitativeNeurons", "click", function(e) {
       antigravityNeurons = !antigravityNeurons;
       if (antigravityNeurons) this.classList.add("button-active");
       if (!antigravityNeurons) this.classList.remove("button-active");
   });

   BindEvent("#collisionsButton", "click", function(e) {
       collisions = !collisions;
       if (collisions) this.classList.add("button-active");
       if (!collisions) this.classList.remove("button-active");
   });

   BindEvent("#pauseButton", "click", function(e) {
       paused = !paused;
       if (paused) this.style = "color:cyan";
       if (!paused) {
           this.style = "color:white";
           requestAnimationFrame(animate);
       }
   })

   BindEvent("#resetButton", "click", function() {
       initCanvas();
   });