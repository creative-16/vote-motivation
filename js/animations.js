// Global animation utilities
class AnimationUtils {
    static createStars(container, count = 100) {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.width = Math.random() * 3 + 'px';
            star.style.height = star.style.width;
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(star);
        }
    }
    
    static animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 16);
    }
    
    static createParticleEffect(x, y, color = '#8b5cf6') {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.backgroundColor = color;
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            const angle = (Math.PI * 2 * i) / 20;
            const velocity = 2 + Math.random() * 3;
            const lifetime = 1000 + Math.random() * 1000;
            
            document.body.appendChild(particle);
            
            let opacity = 1;
            let currentX = 0;
            let currentY = 0;
            
            const animate = () => {
                currentX += Math.cos(angle) * velocity;
                currentY += Math.sin(angle) * velocity;
                opacity -= 0.02;
                
                particle.style.transform = `translate(${currentX}px, ${currentY}px)`;
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Add click effects to buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            AnimationUtils.createParticleEffect(e.clientX, e.clientY);
        });
    });
});

// Export for use in other files
window.AnimationUtils = AnimationUtils;