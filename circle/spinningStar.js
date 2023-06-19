 const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height= window.innerHeight; 

let hue = 0;
let particlesArray = [];

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

export function spinningStar(){     
    for(let i = 0; i < 1000; i++){
        let moveRadius = Math.random() * canvas.width /2;
        let position = Math.random() * Math.PI * 2; 
        let step = Math.random() * 0.001 + 0.0001;
        let size = Math.random() * 3 + 0.01;
        //let color = 'hsl(' + position + ', 100%, 50%)';
        let color = 'rgba('+ Math.random()*55 +', '+ Math.random()*255 +', '+ Math.random()*25 +', 0.5)';

        particlesArray.push(new Particle(moveRadius, step, position, size, color));         
    }

    for(let i = 0; i < 4; i++){
        let moveRadius = Math.random() * canvas.width /2 + 200;
        let position = Math.random() * Math.PI * 2; 
        let step = Math.random() * 0.0006 + 0.0001;
        let size = Math.random() * 100 + 20;
        let color = 'rgb('+ Math.random()*255 +', '+ Math.random()*255 +', '+ Math.random()*255 +')';

        particlesArray.push(new Particle(moveRadius, step, position, size, color));         
    }
  
    for(let i = 0; i < 20; i++){
        let moveRadius = Math.random() * canvas.width /2 + 100;
        let position = Math.random() * Math.PI * 2; 
        let step = Math.random() * 0.0009 + 0.0004;
        let size = Math.random() * 26 + 1;
        let color = 'rgb('+ Math.random()*255 +', '+ Math.random()*55 +', '+ Math.random()*25 +')';
        particlesArray.push(new Particle(moveRadius, step, position, size, color));         
    }
}
spinningStar();

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.09';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    hue += 1;
    for(let i = 0; i < particlesArray.length; i++){        
        particlesArray[i].update();
    }
} 

export {animate}; 