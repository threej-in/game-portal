export class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lifespan = 90;

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        this.dx = Math.cos(angle) * speed;
        this.dy = Math.sin(angle) * speed;
        
        // New Neon Color Palette
        const colors = ['#ec4899', '#facc15', '#22d3ee', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        this.dx *= 0.98;
        this.dy *= 0.98;
        this.lifespan--;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.lifespan / 90);
        
        // Add a glow to the particles
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;

        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
}