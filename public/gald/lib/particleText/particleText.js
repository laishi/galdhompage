class Particle {
  constructor(x, y, options) {
    this.x = Math.random() * options.ww;
    this.y = Math.random() * options.wh;
    this.dest = { x, y };
    this.r = Math.random() * (options.particleSizeRange[1] - options.particleSizeRange[0]) + options.particleSizeRange[0];
    this.vx = (Math.random() - 0.5) * 20;
    this.vy = (Math.random() - 0.5) * 20;
    this.accX = 0;
    this.accY = 0;
    this.friction = Math.random() * (options.frictionRange[1] - options.frictionRange[0]) + options.frictionRange[0];
    this.color = options.colors[Math.floor(Math.random() * options.colors.length)];
  }
}

class ParticleText {
  constructor(options = {}) {
    // Canvas setup
    this.canvas = document.querySelector(options.canvasSelector || "#particleText");
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.amount = 0;
    this.mouse = { x: 0, y: 0 };
    this.radius = 1;
    
    // Configuration
    this.text = options.text;
    this.colors = options.colors || ["#FFFFFF", "#FFFACD", "#FFFFE0", "#FFD700", "#FFECB3"];
    this.frictionRange = options.frictionRange || [0.94, 0.99];
    this.particleSizeRange = options.particleSizeRange || [2, 7];
    this.particleDensity = options.particleDensity || 150;

    this.canvasWidth = 0;
    this.canvasHeight = 0;
    
    // Initialize
    this.init();
  }
  
  init() {
    const sideHeight = window.CurveHeader?.sideHeight;
    console.log(" particle sideHeight: ", sideHeight);

    this.ww = this.canvas.width = window.innerWidth;
    this.wh = this.canvas.height = sideHeight;
    
    // Event listeners
    window.addEventListener("resize", () => this.initScene());
    window.addEventListener("mousemove", (e) => this.onMouseMove(e));
    window.addEventListener("touchmove", (e) => this.onTouchMove(e));
    window.addEventListener("click", () => this.onMouseClick());
    window.addEventListener("touchend", (e) => this.onTouchEnd(e));
    
    // Start animation
    this.initScene();
    this.render();
  }
  
  initScene() {
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 3. 设置文字样式（关键修改点）
    const fontSize = Math.min(this.ww / 8, 250); // 限制最大100px
    this.ctx.font = `bold ${fontSize}px "sans-serif`;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle"; // 确保垂直居中
    this.ctx.fillStyle = "#FFFFFF"; // 临时文字颜色（仅用于生成粒子）

    // 4. 绘制文字（居中）
    const text = this.text;
    const centerX = this.ww / 2;
    const centerY = this.wh / 2;
    this.ctx.fillText(text, centerX, centerY);
    
    const data = this.ctx.getImageData(0, 0, this.ww, this.wh).data;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.globalCompositeOperation = "screen";
    
    this.particles = [];
    for (let i = 0; i < this.ww; i += Math.round(this.ww / this.particleDensity)) {
      for (let j = 0; j < this.wh; j += Math.round(this.ww / this.particleDensity)) {
        if (data[((i + j * this.ww) * 4) + 3] > 150) {
          const particle = new Particle(i, j, {
            ww: this.ww,
            wh: this.wh,
            particleSizeRange: this.particleSizeRange,
            frictionRange: this.frictionRange,
            colors: this.colors
          });
          this.particles.push(particle);
        }
      }
    }
    
    this.amount = this.particles.length;
  }
  
  renderParticle(particle) {
    particle.accX = (particle.dest.x - particle.x) / 1000;
    particle.accY = (particle.dest.y - particle.y) / 1000;
    particle.vx += particle.accX;
    particle.vy += particle.accY;
    particle.vx *= particle.friction;
    particle.vy *= particle.friction;
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    this.ctx.fillStyle = particle.color;
    this.ctx.beginPath();
    this.ctx.arc(particle.x, particle.y, particle.r, Math.PI * 2, false);
    this.ctx.fill();
    
    const a = particle.x - this.mouse.x;
    const b = particle.y - this.mouse.y;
    const distance = Math.sqrt(a * a + b * b);
    
    if (distance < (this.radius * 100)) {
      particle.accX = (particle.x - this.mouse.x) / 100;
      particle.accY = (particle.y - this.mouse.y) / 100;
      particle.vx += particle.accX;
      particle.vy += particle.accY;
    }
  }
  
  render() {
    requestAnimationFrame(() => this.render());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = 0; i < this.amount; i++) {
      this.renderParticle(this.particles[i]);
    }
  }
  
  onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
  }
  
  onTouchMove(e) {
    if (e.touches.length > 0) {
      this.mouse.x = e.touches[0].clientX;
      this.mouse.y = e.touches[0].clientY;
    }
  }
  
  onTouchEnd() {
    this.mouse.x = -9999;
    this.mouse.y = -9999;
  }
  
  onMouseClick() {
    this.radius++;
    if (this.radius === 5) {
      this.radius = 0;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const particleText = new ParticleText({
    text: "光爱照明设计",
    colors: ["#FFFFFF", "#FFFACD", "#FFFFE0", "#FFD700", "#FFECB3"],
    frictionRange: [0.94, 0.99],
    particleSizeRange: [2, 5],
    particleDensity: 150
  });
});