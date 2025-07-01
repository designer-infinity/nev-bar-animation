
        // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random starting position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
                
                particlesContainer.appendChild(particle);
            }
        }

        // Navigation functionality
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const overlay = document.getElementById('overlay');
        const navLinksItems = document.querySelectorAll('.nav-links a');

        function toggleNav() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('nav-open');
            overlay.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('nav-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }

        function closeNav() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('nav-open');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Event listeners
        hamburger.addEventListener('click', toggleNav);
        overlay.addEventListener('click', closeNav);

        // Close menu when clicking on navigation links (mobile)
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    closeNav();
                }
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                closeNav();
            }
        });

        // Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('nav-open')) {
                closeNav();
            }
        });

        // Magnetic effect for navigation links
        const navItems = document.querySelectorAll('.nav-links li a');
        
        navItems.forEach(item => {
            item.addEventListener('mouseenter', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                this.style.transformOrigin = `${x}px ${y}px`;
            });
            
            item.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                this.style.transform = `translateY(-5px) rotateX(${deltaY * 10}deg) rotateY(${deltaX * 10}deg) scale(1.05)`;
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.transformOrigin = '';
            });
        });

        // Parallax scrolling effect
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const particles = document.querySelectorAll('.particle');
            
            particles.forEach((particle, index) => {
                const speed = 0.5 + (index % 3) * 0.2;
                particle.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Initialize
        createParticles();
        
        // Add smooth cursor following effect
        document.addEventListener('mousemove', (e) => {
            const cursor = document.querySelector('.cursor');
            if (!cursor) {
                const newCursor = document.createElement('div');
                newCursor.className = 'cursor';
                newCursor.style.cssText = `
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    background: radial-gradient(circle, #ff6b6b, #4ecdc4);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    mix-blend-mode: difference;
                    transition: all 0.1s ease;
                `;
                document.body.appendChild(newCursor);
            }
            
            const currentCursor = document.querySelector('.cursor');
            currentCursor.style.left = e.clientX - 10 + 'px';
            currentCursor.style.top = e.clientY - 10 + 'px';
        });
