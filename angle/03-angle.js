const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

///// Star Spinning background 

let particlesArray = [];
let hue = 0;

class Particle {
     constructor(moveRadius, step, position, size, color) {
        this.moveRadius = moveRadius;
        this.step = step;
        this.position = position;
        this.size = size;
        this.color = color; 
     };     
       
     draw(){
        ctx.beginPath();
        ctx.arc(Math.cos(this.position) * this.moveRadius + canvas.width / 2,
        Math.sin(this.position) * this.moveRadius + canvas.height / 2, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.strokeStyle = 'white';
        ctx.fillStyle = this.color;
        ctx.fill();        
     };
     update(){
        this.position += this.step;        
        this.draw();
     };
}; 

function spinningStar(){     
     for(let i = 0; i < 1500; i++){
         let moveRadius = Math.random() * canvas.width /2;
        let position = Math.random() * Math.PI * 2; 
        let step = Math.random() * 0.001 + 0.0001;
        let size = Math.random() * 3 + 0.01;
        //let color = 'hsl(' + position + ', 100%, 50%)';
        let color = 'rgb('+ Math.random()*255 +', '+ Math.random()*255 +', '+ Math.random()*255 +')';

         particlesArray.push(new Particle(moveRadius, step, position, size, color));         
     }

     for(let i = 0; i < 5; i++){
         let moveRadius = Math.random() * canvas.width /2 + 230;
        let position = Math.random() * Math.PI * 2; 
        let step = Math.random() * 0.0006 + 0.0001;
        let size = Math.random() * 100 + 20;
        let color = 'rgb('+ Math.random()*255 +', '+ Math.random()*255 +', '+ Math.random()*255 +')';

         particlesArray.push(new Particle(moveRadius, step, position, size, color));         
     }
  
     for(let i = 0; i < 100; i++){
         let moveRadius = Math.random() * canvas.width /2 + 100;
        let position = Math.random() * Math.PI * 2; 
        let step = Math.random() * 0.0001 + 0.00001;
        let size = Math.random() * 26 + 1;
        let color = 'rgb('+ Math.random()*255 +', '+ Math.random()*55 +', '+ Math.random()*25 +')';
         particlesArray.push(new Particle(moveRadius, step, position, size, color));         
     }
}

spinningStar();

//toggle to sounds off on
const toggles = {
     sound: document.getElementById("sound-toggle")
   }

   

const colors = [    
     '#39FF14', 
     '#7FFF00', 
     '#CCFF00',
     '#1F51FF',
     '#0FF0FC',
     '#BC13FE', 
     '#8A2BE2',
     '#FF1493', 
     '#FF44CC',
     '#EA00FF',
     '#FF3131', 
     '#FF5E00',
     '#FFF01F',
     '#FFF01F', 
     '#E7EE4F',
     '#39FF14', 
     '#7FFF00', 
     '#CCFF00',
     '#1F51FF',
     '#0FF0FC',
     '#FFFFFF', 
];





const startTime = new Date().getTime();
const duration = 300;
const maxCycles = Math.max(colors.length, 50);
let soundEnabled = false;
let pulseEnabled = true;

   const handleSoundToggle = (enabled = !soundEnabled) => {  
    soundEnabled = enabled;
     toggles.sound.dataset.toggled = enabled;
   }
   
   document.onvisibilitychange = () => handleSoundToggle(false);
   
   document.onclick = () => handleSoundToggle();
////////////////

/*
const maxCycles = Math.max(colors.length, 50);
const duration = 300;
const startTime = new Date().getTime();
let soundEnabled = false;

let pulseEnabled = true;

document.onvisibilitychange = () => {
     soundEnabled = false;
}

//toggle 
 const toggleBtn = document.getElementById('sound-toggle');
const soundMsg = document.getElementById('sound-message');
canvas.addEventListener('click', () => {
     soundEnabled = !soundEnabled;
     if(soundEnabled){
          toggleBtn.innerText = 'Sound On';
          soundMsg.style.display = 'none';
     } else {
          toggleBtn.innerText = 'Sound Off';
          soundMsg.style.display = 'block';
     }
}); */

const audios = [
     new Audio('./assets/vibraphone/key-0.mp3'),
     new Audio('./assets/vibraphone/key-1.mp3'),
     new Audio('./assets/vibraphone/key-2.mp3'),
     new Audio('./assets/vibraphone/key-3.mp3'),
     new Audio('./assets/vibraphone/key-4.mp3'),
     new Audio('./assets/vibraphone/key-5.mp3'),
     new Audio('./assets/vibraphone/key-6.mp3'),
     new Audio('./assets/vibraphone/key-7.mp3'),
     new Audio('./assets/vibraphone/key-8.mp3'),
     new Audio('./assets/vibraphone/key-9.mp3'),
     new Audio('./assets/vibraphone/key-10.mp3'),
     new Audio('./assets/vibraphone/key-11.mp3'),
     new Audio('./assets/vibraphone/key-12.mp3'),
     new Audio('./assets/vibraphone/key-13.mp3'),
     new Audio('./assets/vibraphone/key-14.mp3'),
     new Audio('./assets/vibraphone/key-15.mp3'),
     new Audio('./assets/vibraphone/key-16.mp3'),
     new Audio('./assets/vibraphone/key-17.mp3'),
     new Audio('./assets/vibraphone/key-18.mp3'),
     new Audio('./assets/vibraphone/key-19.mp3'),
     new Audio('./assets/vibraphone/key-20.mp3'),
     new Audio('./assets/vibraphone/key-21.mp3'),
     new Audio('./assets/vibraphone/key-22.mp3'),
     new Audio('./assets/vibraphone/key-23.mp3'),
     new Audio('./assets/vibraphone/key-24.mp3'),
     new Audio('./assets/vibraphone/key-25.mp3'),
     new Audio('./assets/vibraphone/key-26.mp3'),
     new Audio('./assets/vibraphone/key-27.mp3'),
     new Audio('./assets/vibraphone/key-28.mp3'),
     new Audio('./assets/vibraphone/key-29.mp3'),
     new Audio('./assets/vibraphone/key-30.mp3'),
     new Audio('./assets/vibraphone/key-31.mp3'),
     new Audio('./assets/vibraphone/key-32.mp3'),
     new Audio('./assets/vibraphone/key-33.mp3'),
     new Audio('./assets/vibraphone/key-34.mp3'),
     new Audio('./assets/vibraphone/key-35.mp3'),
     new Audio('./assets/vibraphone/key-36.mp3'),
];

audios.map(audio => {
     audio.currentTime = 0;
     audio.volume = 0.4;
})

let arcs = [];
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';
ctx.globalAlpha = 1;

function calculateVelocity(index){
     const numberOfCycles = maxCycles - index;
     return numberOfCycles * Math.PI * 0.5 / duration;
}

function calculateNextImpactTime(currentImpactTime, velocity){
     return currentImpactTime + ((Math.PI / 2)/velocity) * 1000;
}

function calculateDynamicOpacity(currentTime, lastImpactTime, baseOpacity, maxOpacity, opacityDuration){
     const timeSinceImpact = currentTime - lastImpactTime;
     let percentage = Math.min(timeSinceImpact / opacityDuration, 1);
     let opacityDelta = maxOpacity - baseOpacity;
     let determineOpacity = maxOpacity - (opacityDelta * percentage);
     if(!pulseEnabled){
          return baseOpacity;
     } else {
          return determineOpacity;
     }
}

// basic draw arc
function drawArc(x, y, radius, start, end){
     ctx.beginPath();
     ctx.arc(x, y, radius, start, end)
     ctx.stroke();
}

//basic draw point on arc
function drawPointOnArc(centerX, centerY, arcRadius, pointRadius, angle){
     const position = {
          x: centerX + arcRadius * Math.cos(angle),
          y: centerY + arcRadius * Math.sin(angle)
     }

     
     ctx.beginPath();
     ctx.lineWidth = 1;
     ctx.strokeStyle = 'white';
     ctx.moveTo(centerX, centerY);
     ctx.lineTo(position.x, position.y)
     ctx.stroke();
     ctx.beginPath();
     ctx.arc(position.x, position.y, pointRadius, 0, Math.PI * 2);
     ctx.fill();
}

arcs = colors.map((color, index) => {
     
     const velocity = calculateVelocity(index);
     let lastImpactTime = 0;
     let nextImpactTime = calculateNextImpactTime(startTime, velocity);

     return {
          color,
          velocity,
          lastImpactTime,
          nextImpactTime,
     }
})

 
//draw pendulum arc point bar
function drawPendulum(){ 
     canvas.width = canvas.clientWidth;
     canvas.height = canvas.clientHeight;

      const currentTime = new Date().getTime();
     let elapsedTime = (currentTime - startTime) / 1000;   
     const barLength = canvas.width * 0.9;

     const center = {
          x: canvas.width / 2,
          y: canvas.height * 0.2
     }
     const barStart = {
          x: (canvas.width - barLength) / 2,
          y: canvas.height * 0.2
     }
     const barEnd = {
          x: center.x + barLength/2,
          y: canvas.height * 0.2
     }

     //draw bar
     ctx.globalAlpha = 1;
     ctx.lineWidth = barLength * 0.006;
     ctx.strokeStyle = '#111';
     ctx.moveTo(barStart.x, barStart.y);
     ctx.lineTo(barEnd.x, barEnd.y);
     ctx.stroke();

     //center hinge
     ctx.fillStyle = 'white';
     ctx.beginPath();
     ctx.arc(center.x, center.y, barLength * 0.01, Math.PI, Math.PI * 2);
     ctx.fill();

     //draw arcs and points
     arcs.forEach((arc, index) => {
          let space = (center.x - barStart.x - (barLength * 0.06)) / arcs.length;
          const arcRadius = barLength * 0.06 + index * space;

          //draw arcs
          ctx.globalAlpha = calculateDynamicOpacity(currentTime, arc.lastImpactTime, 0.3, 0.8, 1000);
          ctx.lineWidth = barLength * 0.006;
          ctx.strokeStyle = arc.color;
          //right side arcs
          drawArc(center.x, center.y, arcRadius, 0, Math.PI * 0.25);
          //left side arcs
          drawArc(center.x, center.y, arcRadius, Math.PI * 0.75, Math.PI);

         //middle arcs
          ctx.strokeStyle = '#111';
          ctx.lineWidth = 1;
          drawArc(center.x, center.y, arcRadius, Math.PI * 0.25, Math.PI * 0.75);

                      
          // draw points on arc
          const pointRadius = (barLength * 0.0075) ;          
                    
          let distance =  (elapsedTime * arc.velocity) % (Math.PI * 2);
          
          let   angle = Math.PI * 0.25 + distance;
          
          if(angle >= Math.PI * 0.75){
               angle = Math.PI * 1.25 - distance;
          }
          if(angle <= Math.PI * 0.25){
               angle = -Math.PI * 0.75 + distance ;
          }  
          if(angle >= Math.PI * 0.75){
               angle = Math.PI * 0.25 - distance;
          }

          ctx.globalAlpha = calculateDynamicOpacity(currentTime, arc.lastImpactTime, 0.9, 1, 500);
         
          ctx.fillStyle = 'white';
          drawPointOnArc(center.x, center.y, arcRadius, pointRadius, angle);     
          
      
          // pendulum set 2 Left  ///////////////////
          let position2X = center.x - arcRadius * Math.cos(- angle);
          let position2Y = center.y - arcRadius * Math.sin(- angle);
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'white';
          ctx.moveTo(center.x, center.y);
          ctx.lineTo(position2X, position2Y)
          ctx.stroke();

          ctx.beginPath();
          ctx.fillStyle = 'white';
          ctx.arc(position2X, position2Y, pointRadius, 0, Math.PI * 2);
          ctx.fill(); 

          // draw vibraphone 
          ctx.globalAlpha = calculateDynamicOpacity(currentTime, arc.lastImpactTime, 0.65, 1, 500);   
          let h = barLength * 0.06;  
          let w = space * 0.95;      
            let rectLeftX = center.x - (space * index) - (barLength * 0.05) - w;
            let rectRightX = center.x + (space * index) + (barLength * 0.05) ;
            let rectY = barStart.y - h;
            ctx.fillStyle = arc.color;
            ctx.fillRect(rectLeftX, rectY, w, h);
            ctx.fillRect(rectRightX, rectY, w, h);

           // draw vibraphone 
           ctx.globalAlpha = calculateDynamicOpacity(currentTime, arc.lastImpactTime, 0.15, 0.75, 2000);   

          //sound impact time
          if(currentTime >= arc.nextImpactTime){
               if(soundEnabled){

                    audios[index].play();
                    arc.lastImpactTime = arc.nextImpactTime;
               }
               arc.nextImpactTime = calculateNextImpactTime(arc.nextImpactTime, arc.velocity);
          }
     })
};

function animate(){
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     drawPendulum();
     for(let i = 0; i < particlesArray.length; i++){
          particlesArray[i].update();
     }
     requestAnimationFrame(animate);
};

animate();