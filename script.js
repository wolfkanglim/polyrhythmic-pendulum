const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
let hue = 0;

// Star Spinning background //

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

function init(){     
     for(let i = 0; i < 1500; i++){
         let moveRadius = Math.random() * canvas.width /2;
        let position = Math.random() * Math.PI * 2; 
        let step = Math.random() * 0.001 + 0.0001;
        let size = Math.random() * 2 + 0.01;
        //let color = 'hsl(' + position + ', 100%, 50%)';
        let color = 'rgb('+ Math.random()*255 +', '+ Math.random()*255 +', '+ Math.random()*255 +')';

         particlesArray.push(new Particle(moveRadius, step, position, size, color));         
     }

     for(let i = 0; i < 4; i++){
         let moveRadius = Math.random() * canvas.width /2 + 300;
        let position = Math.random() * Math.PI * 2; 
        let step = Math.random() * 0.0006 + 0.0001;
        let size = Math.random() * 100 + 20;
        let color = 'rgb('+ Math.random()*255 +', '+ Math.random()*255 +', '+ Math.random()*255 +')';

         particlesArray.push(new Particle(moveRadius, step, position, size, color));         
     }
  
     for(let i = 0; i < 50; i++){
         let moveRadius = Math.random() * canvas.width /2 + 100;
        let position = Math.random() * Math.PI * 2; 
        let step = Math.random() * 0.0009 + 0.0004;
        let size = Math.random() * 26 + 1;
        let color = 'rgb('+ Math.random()*255 +', '+ Math.random()*55 +', '+ Math.random()*25 +')';
         particlesArray.push(new Particle(moveRadius, step, position, size, color));         
     }
}

init();
 
// neon colors 
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

let arcs = [];
const maxCycles = Math.max(colors.length, 50);
const duration = 300;
const startTime = new Date().getTime();

let pulseEnabled = true; //show when sound enabled
let soundEnabled = false;
document.onvisibilitychange = () => soundEnabled = false;
const toggleBtn = document.getElementById('sound-toggle');
const soundMsg = document.getElementById('sound-message');
canvas.addEventListener('click', () => {
     soundEnabled = !soundEnabled;
     if(soundEnabled){
     toggleBtn.innerText = 'Sound On';
     soundMsg.style.display = 'none';     
} else {
          soundMsg.style.display = 'block';     
      toggleBtn.innerText = 'Sound Off';   
     }     
})

ctx.strokeStyle = 'white';
ctx.fillStyle = 'white';

 const audios = [
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
     new Audio('./assets/vibraphone/key-37.mp3'),
]  

audios.map(audio => {
     audio.volume = 0.5;
     audio.currentTime = 0;
})

// draw arc
function drawArc(x, y, radius, start, end, action = 'stroke'){     
     ctx.beginPath();
     ctx.lineWidth = 2;
     ctx.arc(x, y, radius, start, end);
     if(action === 'stroke'){
          ctx.stroke();
     } else {
          ctx.fill();
     }     
}

function calculateVelocity(index){
     const numberOfCycles = maxCycles - index;
     return numberOfCycles * Math.PI / duration;
};

function calculateNextImpactTime(currentImpactTime, velocity){
     return currentImpactTime + (Math.PI/velocity) * 1000;
};

function calculateDynamicOpacity(currentTime, lastImpactTime, baseOpacity, maxOpacity, duration){
     const timeSinceImpact = currentTime - lastImpactTime;
     let percentage = Math.min(timeSinceImpact / duration, 1);
     let opacityDelta = maxOpacity - baseOpacity;

     return maxOpacity - (opacityDelta * percentage);
};

function determineOpacity(currentTime, lastImpactTime, baseOpacity, maxOpacity, duration){
     if(!pulseEnabled) return baseOpacity;
     return calculateDynamicOpacity(currentTime, lastImpactTime, baseOpacity, maxOpacity, duration);

}

//draw point on arc
function drawPointOnArc(centerX, centerY, arcRadius, pointRadius, angle){
     
     //ctx.fillStyle = 'white';
     const position = {
          x: centerX + arcRadius * Math.cos(angle),
          y: centerY + arcRadius * Math.sin(angle)
     }
     
     drawArc(position.x, position.y, pointRadius, 0, Math.PI * 2, 'fill');
}

arcs = colors.map((color, index) => {
     const velocity = calculateVelocity(index);
     let lastImpactTime = 0;
     let nextImpactTime = calculateNextImpactTime(startTime, velocity);

     return {
          color, 
          velocity,
          lastImpactTime,
          nextImpactTime
     }
})

// draw base, circle and point

function draw(){
     canvas.width = canvas.clientWidth;
     canvas.height = canvas.clientHeight;
     
     const currentTime = new Date().getTime();
     let elapsedTime = (currentTime - startTime) / 1000;

     //const length = canvas.width * 0.9;
     const length = canvas.width * 0.75;
     //const length = canvas.height * 0.9;

     const baseStart = {
          x: (canvas.width - length) / 2,
          y: canvas.height * 0.8
     }

     const baseEnd = {
          x: canvas.width - canvas.width * 0.1 / 2,
          y: canvas.height * 0.8
     }

     const centerX = canvas.width / 2;
     const centerY = canvas.height * 0.8;
     
     //draw base
     ctx.beginPath();
     ctx.lineWidth = 6;
     ctx.strokeStyle = '#222';
     ctx.moveTo(baseStart.x, baseStart.y + 6);
     ctx.lineTo(baseEnd.x, baseEnd.y + 6);
     ctx.stroke();
     
     //draw arc circle arcs for each
     arcs.forEach((arc, index) => {         
          let space = (centerX - baseStart.x - (length * 0.05)) / arcs.length;
          const arcRadius = length * 0.05 + space * index;
          ctx.strokeStyle = arc.color;
          drawArc(centerX, centerY, arcRadius, Math.PI, Math.PI * 2, 'stroke');  
          
          //opacity
          ctx.globalAlpha = determineOpacity(currentTime, arc.lastImpactTime, 0.3, 1, 2000);

          //draw point arc
          let pointRadius = length * 0.0075;
          
          let distance = (Math.PI + (elapsedTime * arc.velocity)) % (Math.PI * 2);
          if(distance <= Math.PI) {
               distance = (Math.PI - (elapsedTime * arc.velocity)) % (Math.PI * 2);                 
          } 

          ctx.globalAlpha = determineOpacity(currentTime, arc.lastImpactTime, 0.8, 1, 500);
          ctx.fillStyle = arc.color;
          drawPointOnArc(centerX, centerY, arcRadius, pointRadius, distance);

          ctx.globalAlpha = determineOpacity(currentTime, arc.lastImpactTime, 0.4, 1, 1000);

          //draw vibraphone
          let rectLeftX = centerX - (space * index) - (length * 0.05) - (space * 0.5);
          let rectRightX = centerX + (space * index) + (length * 0.05) - (space * 0.5);
          let rectY = baseStart.y + 3;
          ctx.fillStyle = arc.color;
          ctx.fillRect(rectLeftX, rectY, space * 0.94 , 38);
          ctx.fillRect(rectRightX, rectY, space * 0.94, 38);

          //impact sounds
           if(currentTime >= arc.nextImpactTime){
               if(soundEnabled){
                    audios[index].play();
                    arc.lastImpactTime = arc.nextImpactTime;
               }
               arc.nextImpactTime = calculateNextImpactTime(arc.lastImpactTime, arc.velocity);
          }
     });     
};

function render(){
     draw();    
     for(let i = 0; i < particlesArray.length; i++){        
     particlesArray[i].update();
     }
     requestAnimationFrame(render);
};

render();
