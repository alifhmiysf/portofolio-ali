/* ==============================================================
   ALI FAHMI YUSUF - PORTFOLIO JAVASCRIPT
   Interactive Features & Animations
   ============================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
        });

        navLinksItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // 3. Active Nav Link on Scroll & Smooth Scrolling
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 4. Hero Subtitle Typing Animation
    const typedTextSpan = document.getElementById('typed-text');
    const textArray = [
        "Informatics Student & Developer",
        "Backend Architecture Enthusiast",
        "AI & Machine Learning Explorer",
        "Fullstack Software Engineer"
    ];
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        if (!typedTextSpan) return;
        const currentText = textArray[textArrayIndex];

        if (isDeleting) {
            typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of sentence
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            typingSpeed = 500;
        }

        setTimeout(typeText, typingSpeed);
    }

    if (typedTextSpan) {
        setTimeout(typeText, 1000);
    }

    // 5. Scroll Reveal Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const aosElements = document.querySelectorAll('[data-aos]');
    aosElements.forEach(el => observer.observe(el));

    // 6. Contact Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                formMessage.style.color = '#ef4444';
                formMessage.textContent = 'Please fill out all fields.';
                return;
            }

            // Simulate sending
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                formMessage.style.color = '#34d399';
                formMessage.textContent = 'Thank you! Your message has been sent successfully.';
                contactForm.reset();
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;

                setTimeout(() => {
                    formMessage.textContent = '';
                }, 5000);
            }, 1500);
        });
    }
});
