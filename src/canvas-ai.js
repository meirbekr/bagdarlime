/**
 * High-Tech Interactive Neural Network & Particle Canvas for BagdarLime Hero Section
 */
export function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let isVisible = true;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  // Responsive particle density
  const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
  const connectionDistance = 140;
  const mouseConnectionDistance = 180;

  const particles = [];
  const mouse = {
    x: -1000,
    y: -1000,
    radius: 180,
    active: false
  };

  // Node Colors: Neon lime and deep emerald
  const colors = [
    'rgba(0, 255, 135, 0.8)',
    'rgba(16, 185, 129, 0.7)',
    'rgba(52, 211, 153, 0.6)',
    'rgba(255, 255, 255, 0.6)'
  ];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1.2;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.pulseSpeed = 0.02 + Math.random() * 0.03;
      this.pulseVal = Math.random() * Math.PI;
      // Data packet traveling along connection
      this.packetProgress = 0;
      this.hasPacket = Math.random() > 0.6;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around edges smoothly
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;

      this.pulseVal += this.pulseSpeed;

      // Mouse interaction
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5;
          this.x += (dx / dist) * force;
          this.y += (dy / dist) * force;
        }
      }

      if (this.hasPacket) {
        this.packetProgress += 0.008;
        if (this.packetProgress > 1) this.packetProgress = 0;
      }
    }

    draw() {
      const currentRadius = this.radius + Math.sin(this.pulseVal) * 0.5;

      // Outer soft glow
      ctx.beginPath();
      ctx.arc(this.x, this.y, currentRadius * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 255, 135, 0.08)';
      ctx.fill();

      // Main core
      ctx.beginPath();
      ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);

  // Mouse / Touch listeners
  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    if (e.clientY < rect.bottom && e.clientY > rect.top) {
      mouse.x = e.clientX;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    } else {
      mouse.active = false;
    }
  });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY - rect.top;
      mouse.active = true;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouse.active = false;
  });

  // Populate particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    if (!isVisible) {
      animationFrameId = requestAnimationFrame(render);
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Draw lines between close particles
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];

      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.28;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(0, 255, 135, ${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();

          // Traveling data impulse / photon
          if (p1.hasPacket && dist < 100) {
            const px = p1.x + (p2.x - p1.x) * p1.packetProgress;
            const py = p1.y + (p2.y - p1.y) * p1.packetProgress;
            ctx.beginPath();
            ctx.arc(px, py, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.shadowColor = '#00FF87';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }
      }

      // Draw connection to mouse
      if (mouse.active) {
        const dx = p1.x - mouse.x;
        const dy = p1.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouseConnectionDistance) {
          const alpha = (1 - dist / mouseConnectionDistance) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(0, 255, 135, ${alpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
      }

      p1.update();
      p1.draw();
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // IntersectionObserver to pause rendering when hero is out of view (saves battery & GPU)
  const heroSection = document.getElementById('hero');
  if (heroSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(heroSection);
  }

  render();
}
