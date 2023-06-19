import {animate} from './spinningStar.js';
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



const toggles = {
  sound: document.getElementById("sound-toggle")
}

const colors = [
  "#D0E7F5",
  "#D9E7F4",
  "#D6E3F4",
  "#BCDFF5",
  "#B7D9F4",
  "#C3D4F0",
  "#9DC1F3",
  "#9AA9F4",
  "#8D83EF",
  "#AE69F0",
  "#D46FF1",
  "#DB5AE7",
  "#D911DA",
  "#D601CB",
  "#E713BF",
  "#F24CAE",
  "#FB79AB",
  "#FFB6C1",
  "#FED2CF",
  "#FDDFD5",
  "#FEDCD1"
];

const settings = {
  startTime: new Date().getTime(), 
  duration: 300, // Total time 
  maxCycles: Math.max(colors.length, 50), // Must be above colors.length 
  soundEnabled: false, // User interact 
  pulseEnabled: true, // Pulse will only show if sound is enabled as well
  instrument: "vibraphone" // "default" | "wave" | "vibraphone"
}

const handleSoundToggle = (enabled = !settings.soundEnabled) => {  
  settings.soundEnabled = enabled;
  toggles.sound.dataset.toggled = enabled;
}

document.onvisibilitychange = () => handleSoundToggle(false);

canvas.onclick = () => handleSoundToggle();

const getFileName = index => {
  if(settings.instrument === "default") return `key-${index}`; 
  
  return `${settings.instrument}/key-${index}`;
} 

const getUrl = index => `./assets/${getFileName(index)}.mp3`;

const keys = colors.map((color, index) => {
  const audio = new Audio(getUrl(index));  
  audio.volume = 0.2;
  audio.currentTime = 0;
  
  return audio;
});

let arcs = [];

const calculateVelocity = index => {  
    const numberOfCycles = settings.maxCycles - index,
          distancePerCycle = 1 * Math.PI;
  
  return (numberOfCycles * distancePerCycle) / settings.duration;
}

const calculateNextImpactTime = (currentImpactTime, velocity) => {
  return currentImpactTime + (Math.PI / velocity) * 1000;
}

const determineOpacity = (currentTime, lastImpactTime, baseOpacity, maxOpacity, duration) => {
  const timeSinceImpact = currentTime - lastImpactTime;
  const percentage = Math.min(timeSinceImpact / duration, 1);
  const opacityDelta = maxOpacity - baseOpacity;  
  let determineOpacity = maxOpacity - (opacityDelta * percentage);
  if(!settings.pulseEnabled) return baseOpacity;
  return determineOpacity;
}

const playKey = index => {
  keys[index].play();
}
  
arcs = colors.map((color, index) => {
  const velocity = calculateVelocity(index);
  const lastImpactTime = 0;
  const nextImpactTime = calculateNextImpactTime(settings.startTime, velocity);

  return {
    color,
    velocity,
    lastImpactTime,
    nextImpactTime
  }
});

function drawArc(x, y, radius, start, end, action = "stroke"){
  ctx.beginPath();  
  ctx.arc(x, y, radius, start, end);  
  if(action === "stroke") ctx.stroke();    
  else ctx.fill();
}

function drawPointOnArc(center, arcRadius, pointRadius, angle){  
  const position = {
    x: center.x + arcRadius * Math.cos(angle),
  y: center.y + arcRadius * Math.sin(angle)
  };
  
  drawArc(position.x, position.y, pointRadius, 0, 2 * Math.PI, "fill");   
  
  //base line
  ctx.beginPath();
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'white';
  ctx.moveTo(center.x, center.y);
  ctx.lineTo(position.x, position.y);
  ctx.stroke()
}

///// draw pendulums

function drawPendulum(){ // Definitely not optimized
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  

  const currentTime = new Date().getTime();
  const elapsedTime = (currentTime - settings.startTime) / 1000;
  
  const length = Math.min(canvas.width, canvas.height) * 0.8;
  const offset = (canvas.width - length) / 2;
  
  const start = {
    x: offset,
    y: canvas.height / 2
  }

  const end = {
    x: canvas.width - offset,
    y: canvas.height / 2
  }

  const center = {
    x: canvas.width / 2,
    y: canvas.height / 2
  }

  const base = {
    length: end.x - start.x,
    minAngle: 0,
    startAngle: 0,
    maxAngle: 2 * Math.PI
  }

  base.initialRadius = base.length * 0.05;
  base.circleRadius = base.length * 0.01;
  base.clearance = base.length * 0.03;
  base.spacing = (base.length - base.initialRadius - base.clearance) / 2 / colors.length;

  //draw arcs points impact sound
  arcs.forEach((arc, index) => {
    const radius = base.initialRadius + (base.spacing * index);

    // Draw arcs
    ctx.globalAlpha = determineOpacity(currentTime, arc.lastImpactTime, 0.125, 0.95, 1000);
    ctx.lineWidth = base.length * 0.0025;
    ctx.strokeStyle = arc.color;
    
    const offset = base.circleRadius * (6 / 3) / radius;
    
     drawArc(center.x, center.y, radius, Math.PI * 1.5 + offset, (Math.PI * 0.5) - offset);//right arcs
    
    drawArc(center.x, center.y, radius, Math.PI * 0.5 + offset, Math.PI * 1.5 - offset); //left arcs
    
    // Draw impact points
    ctx.globalAlpha = determineOpacity(currentTime, arc.lastImpactTime, 0.4, 1, 500);
    ctx.fillStyle = arc.color;
    
    drawPointOnArc(center, radius, base.circleRadius * 1.25, Math.PI/2);
    
    drawPointOnArc(center, radius, base.circleRadius * 1.25, Math.PI * 1.5);
    
    // Draw moving circles
    ctx.globalAlpha = 1;
    //ctx.fillStyle = arc.color;
    ctx.fillStyle = 'white';
    
    if(currentTime >= arc.nextImpactTime) {      
      if(settings.soundEnabled) {
        playKey(index);
        arc.lastImpactTime = arc.nextImpactTime;
      }
      
      arc.nextImpactTime = calculateNextImpactTime(arc.nextImpactTime, arc.velocity);      
    }
    
    let distance = elapsedTime >= 0 ? (elapsedTime * arc.velocity) : 0;
    let angle = (Math.PI * 1.5 + distance) % base.maxAngle;
    let angle2 = (Math.PI* 1.5 - distance) % base.maxAngle;
    
    drawPointOnArc(center, radius, base.circleRadius, angle);

    //draw point set 2    
    drawPointOnArc(center, radius, base.circleRadius, angle2);

    ctx.globalAlpha = determineOpacity(currentTime, arc.lastImpactTime, 0.25, 0.75, 2000);   
  });
  
  requestAnimationFrame(drawPendulum);
};

function render(){
  requestAnimationFrame(drawPendulum);
  animate();
}
render();

