document.addEventListener('DOMContentLoaded', function() {
    const focusText = document.getElementById('focus-text');
    const canvas = document.getElementById('background-animation');
    const ctx = canvas.getContext('2d');

    const focusList = [
        "Exploring alternate realities",
        "Decoding the universe's hidden messages",
        "Surfing the waves of consciousness",
        "Unraveling the cosmic tapestry",
        "Channeling interdimensional wisdom"
    ];

    function updateFocus() {
        if (focusText) {
            const randomIndex = Math.floor(Math.random() * focusList.length);
            focusText.textContent = focusList[randomIndex];
        }
    }

    // Update focus immediately and then every hour
    updateFocus();
    setInterval(updateFocus, 3600000);

    // Background animation
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();

    const particles = [];

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.01;
            if (this.size <= 0.2) this.reset();
        }

        draw() {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function createParticles() {
        for (let i = 0; i < 200; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    createParticles();
    animateParticles();

    // Optimize resize event handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            particles.length = 0;
            createParticles();
        }, 100);
    });
});
