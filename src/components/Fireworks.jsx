import { useEffect, useRef } from 'react';

const COLORS = ['#ffd700', '#ff6b35', '#00d4ff', '#ff1493', '#7b2cbf', '#fff'];

function Fireworks() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let fireworks = [];

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      constructor(x, y, vx, vy, color, decay = 0.98) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.alpha = 1;
        this.decay = decay;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05;
        this.vx *= this.decay;
        this.vy *= this.decay;
        this.alpha -= 0.012;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class Firework {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * (canvas.height * 0.5) + 50;
        this.vy = -8 - Math.random() * 4;
        this.vx = (Math.random() - 0.5) * 2;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.exploded = false;
      }
      update() {
        if (!this.exploded) {
          this.x += this.vx;
          this.y += this.vy;
          this.vy += 0.15;
          if (this.vy >= 0) {
            this.explode();
          }
        }
      }
      explode() {
        this.exploded = true;
        const count = 60 + Math.floor(Math.random() * 40);
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count + Math.random();
          const speed = 2 + Math.random() * 4;
          particles.push(
            new Particle(
              this.x,
              this.y,
              Math.cos(angle) * speed,
              Math.sin(angle) * speed,
              this.color
            )
          );
        }
      }
      draw() {
        if (!this.exploded) {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function spawnFirework() {
      if (Math.random() < 0.08) {
        fireworks.push(new Firework());
      }
    }

    function loop() {
      ctx.fillStyle = 'rgba(15, 10, 35, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      spawnFirework();
      [...fireworks].forEach((fw) => {
        fw.update();
        fw.draw();
      });
      fireworks = fireworks.filter((fw) => !fw.exploded);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      particles = particles.filter((p) => p.alpha > 0);
      animationId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fireworks-canvas" />;
}

export default Fireworks;
