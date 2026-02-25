// Dark mode toggle functionality
function initDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '🌓';
    darkModeToggle.style.position = 'fixed';
    darkModeToggle.style.top = '20px';
    darkModeToggle.style.right = '20px';
    darkModeToggle.style.backgroundColor = 'var(--bg-color, #fff)';
    darkModeToggle.style.border = '2px solid var(--text-color, #333)';
    darkModeToggle.style.borderRadius = '50%';
    darkModeToggle.style.width = '50px';
    darkModeToggle.style.height = '50px';
    darkModeToggle.style.fontSize = '24px';
    darkModeToggle.style.cursor = 'pointer';
    darkModeToggle.style.transition = 'all 0.3s ease';
    darkModeToggle.style.zIndex = '1000';

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    if (savedDarkMode === 'true' || (savedDarkMode === null && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
    }

    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });

    document.body.appendChild(darkModeToggle);
}

// Smooth scroll for navigation links
function initSmoothScroll() {
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
}

// Add active navigation highlighting
function initActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = '#0066cc';
                link.style.fontWeight = 'bold';
            } else {
                link.style.fontWeight = 'normal';
            }
        });
    });
}

// Add typing animation to header
function initTypingAnimation() {
    const title = document.querySelector('h1');
    const originalText = title.textContent;
    title.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    setTimeout(typeWriter, 500);
}

// Back to top button functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Create mailto link
        const mailtoLink = `mailto:v530034069@mail.uic.edu.cn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;

        // Open email client
        window.location.href = mailtoLink;

        // Reset form
        contactForm.reset();

        // Show success message (optional)
        alert('Thank you for your message! Your email client should open now.');
    });
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initSmoothScroll();
    initActiveNav();
    initTypingAnimation();
    initBackToTop();
    initContactForm();
});

// Add CSS for dark mode class
const darkModeStyles = `
body.dark-mode {
    background-color: #1a1a1a;
    color: #e0e0e0;
}

body.dark-mode h2 {
    border-bottom-color: #444;
}

body.dark-mode header p {
    color: #b0b0b0;
}

body.dark-mode .nav a:hover {
    background-color: #333;
}

body.dark-mode #projects h3,
body.dark-mode .skill-item h4 {
    color: #66b3ff;
}

body.dark-mode a {
    color: #66b3ff;
}

body.dark-mode a:hover {
    color: #4da6ff;
}

body.dark-mode .skill-tag {
    background-color: #333;
    color: #e0e0e0;
}

body.dark-mode .skill-tag:hover {
    background-color: #444;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = darkModeStyles;
document.head.appendChild(styleSheet);