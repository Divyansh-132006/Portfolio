const texts = [
            "Full-Stack Developer",
            "AI Enthusiast", 
            "Problem Solver",
            "Tech Explorer",
            "Creative Coder",
            "Gen-AI Developer",
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingElement = document.getElementById('typingText');

        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }
            let typeSpeed = isDeleting ? 50 : 100;
            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(typeText, typeSpeed);
        }

        
        document.addEventListener('DOMContentLoaded', typeText);

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    
                    if (entry.target.classList.contains('timeline-item')) {
                        entry.target.classList.add('visible');
                    }
                }
            });
        }, observerOptions);

        
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));

        document.querySelectorAll('.magnetic').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });

       
        const trails = document.querySelectorAll('.cursor-trail');
        let mouseX = 0, mouseY = 0;
        let trailX = 0, trailY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateTrail() {
            trailX += (mouseX - trailX) * 0.1;
            trailY += (mouseY - trailY) * 0.1;
            
            trails.forEach((trail, index) => {
                const delay = index * 2;
                trail.style.left = (trailX - delay) + 'px';
                trail.style.top = (trailY - delay) + 'px';
                trail.style.opacity = Math.max(0, 1 - index * 0.2);
            });
            
            requestAnimationFrame(animateTrail);
        }

        document.addEventListener('mouseenter', () => {
            trails.forEach(trail => trail.style.opacity = '1');
            animateTrail();
        });

       
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const button = this.querySelector('button[type="submit"]');
            const span = button.querySelector('span');
            const originalText = span.textContent;
            
            span.textContent = 'Sending';
            span.classList.add('loading-dots');
            button.disabled = true;
            
            
            setTimeout(() => {
                span.textContent = 'Message Sent!';
                span.classList.remove('loading-dots');
                button.style.background = 'linear-gradient(90deg, #10b981, #059669)';
                
                setTimeout(() => {
                    span.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    this.reset();
                }, 2000);
            }, 2000);
        });

        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.getElementById('home');
            const particles = document.querySelectorAll('.particle');
            
            // if (hero) {
            //     hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            // }
            
            particles.forEach((particle, index) => {
                particle.style.transform = `translateY(${scrolled * (0.1 + index * 0.02)}px)`;
            });
        });

        
        document.getElementById('darkModeToggle').addEventListener('click', function() {
            const icon = this.querySelector('i');
            const body = document.body;
            
            
            icon.style.transform = 'rotate(180deg)';
            
            setTimeout(() => {
                if (icon.classList.contains('fa-moon')) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
                icon.style.transform = 'rotate(0deg)';
            }, 150);
        });

        
        document.addEventListener('DOMContentLoaded', function() {
            const particles = document.querySelectorAll('.particle');
            particles.forEach((particle, index) => {
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.left = Math.random() * 100 + '%';
            });
        });


        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = Math.random() * 0.5 + 's';
                    entry.target.classList.add('animate-pulse');
                }
            });
        });







        











        

        // GSAP
        document.querySelectorAll('.skill-icon').forEach(skill => {
            skillObserver.observe(skill);
        });
        gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.fade-in').forEach((el, i) => {
    gsap.from(el, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: i * 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none reverse"
        }
    });
});

function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    document.querySelector(".particles").appendChild(particle);

    gsap.set(particle, {
        x: 100 + window.innerWidth,
        y: window.innerHeight + 10,
        opacity: 0.5,
        scale: Math.random() * 1.5
        
    });

    gsap.to(particle, {
        y: 10,
        rotation: 360,
        duration: 6 + Math.random() * 3,
        ease: "back.inOut",
        onComplete: () => {
            particle.remove();
            createParticle(); // loop
        }
    });
   
}

for (let i = 0; i < 50; i++) createParticle();

gsap.to(".progress-bar", {
    width: (i, el) => el.dataset.progress + "%",
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".progress-bar",
        start: "top 90%",
        toggleActions: "play none none none"
    }
});

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener("mouseenter", () => {
        gsap.to(card, {
            y: -15,
            scale: 1.02,
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)",
            duration: 0.4,
            ease: "back.inout(1.7)"
        });
    });

    card.addEventListener("mouseleave", () => {
        gsap.to(card, {
            y: 0,
            scale: 1,
            boxShadow: "none",
            duration: 0.4,
            ease: "power2.inOut"
        });
    });
});

gsap.to(".float", {
    y: -20,
    repeat: -1,
    yoyo: true,
    duration: 3,
    ease: "sine.inOut"
});

gsap.registerPlugin(TextPlugin);

gsap.to(".scramble", {
    text: "Final Decoded Text Here",
    duration: 2,
    ease: "power2.inOut"
});
gsap.to(".typing-animation", {
    borderColor: "transparent",
    repeat: -1,
    yoyo: true,
    duration: 0.5
});

gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.fromTo(el, {
        opacity: 0,
        y: 80
    }, {
        opacity: 1,
        y: 0,
        scrollTrigger: {
            trigger: el,
            start: "top 75%",
            toggleActions: "play none none reverse"
        },
        duration: 1,
        ease: "back.out(1.7)"
    });
});


// gsap.to(".animation",{
//     scale: 1.2,
//     rotation: 0,

//     x: -20,
//     y: 30,
//     duration: 2,
    
//     yoyo: true,
//     scrollTrigger: {
//           opacity : 0,
//         trigger: ".animation",
//         start: "top 65%",
//         toggleActions: "play none none reverse"
//     }
// })



