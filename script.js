/* script.js - Fixed & Enhanced JavaScript for Pavisha M Portfolio */

// ============ NAVIGATION FUNCTIONS ============
function goToContact() { window.location.href = "contact.html"; }
function goToProjects() { window.location.href = "projects.html"; }

// ============ MOBILE MENU TOGGLE ============
document.addEventListener('DOMContentLoaded', function () {

    // Add page fade-in
    document.body.classList.add('page-fade');

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (menuToggle && navUl) {
        menuToggle.addEventListener('click', function () {
            navUl.classList.toggle('show');
        });
        // Close menu when a link is clicked
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navUl.classList.remove('show'));
        });
    }

    // ===== ACTIVE NAV LINK =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav ul li a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // ===== SCROLL REVEAL ANIMATION =====
    const revealElements = document.querySelectorAll('.card, .skill-category, .resume-card, .info-card, .about-container, .achievement-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===== SKILL BAR ANIMATION =====
    const progressBars = document.querySelectorAll('.progress[data-width]');
    if (progressBars.length > 0) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    setTimeout(() => {
                        bar.style.width = bar.getAttribute('data-width');
                    }, 200);
                    barObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.3 });

        progressBars.forEach(bar => barObserver.observe(bar));
    }

    // ===== COUNTER ANIMATION (Hero Stats) =====
    const counters = document.querySelectorAll('.stat-num[data-target]');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    let current = 0;
                    const step = Math.ceil(target / 30);
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        el.textContent = current;
                    }, 50);
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }
});

// ============ PROJECT MODAL ============
function showProjectModal(title, description) {
    const modal = document.getElementById('projectModal');
    if (modal) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalDesc').textContent = description;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

window.addEventListener('click', function (e) {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) closeModal();
});

window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
});

// ============ RESUME DOWNLOAD ============
function downloadResume() {
    const resumeContent = `
PAVISHA M — RESUME
====================

CONTACT
-------
Email   : pavisha2906@gmail.com
Location: Nagercoil, Tamil Nadu, India
GitHub  : github.com/PAVISHAM

EDUCATION
---------
BE Computer Science — 2023 to 2027
University College of Engineering, Nagercoil
CGPA: 8.24

Pragati – Path to Future (Cohort 8) — 2026
Learning program: Communication & Aptitude Skills

WORK EXPERIENCE
---------------
Web Developer (Part-Time) — 2024 to Present
Frontend development for client projects, building responsive websites.

Freelance Projects — 2023 to 2024
Responsive web apps, team collaboration, performance optimization.

SKILLS
------
• HTML & CSS (85%)
• JavaScript (70%)
• React (60%)
• Python (70%)
• SQL (65%)
• Typewriting – English Senior (90%)

TOOLS
-----
VS Code, GitHub, Figma, ChatGPT, Claude AI, Gemini AI, Jenkins

CERTIFICATIONS
--------------
• Infosys Springboard Certificates (Python & more)
• Google UX Design Certificate
• IBM Cognos Analytics Certificate

PROJECTS
--------
1. Interactive Dashboard — github.com/PAVISHAM/INTERACTIVE-FORM-VALIDATION
2. Cloud Storage Dashboard — github.com/PAVISHAM/cloud-storage-project
3. IBM Cognos Analytics — github.com/PAVISHAM/IBM-Cognos-Analytics-Project-
`;

    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Pavisha_M_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ============ CONTACT FORM ============
function sendMessage(event) {
    if (event) event.preventDefault();

    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const message = document.getElementById('message')?.value.trim() || '';
    const formStatus = document.getElementById('formStatus');

    if (!name || !email || !message) {
        if (formStatus) {
            formStatus.textContent = '⚠️ Please fill in all required fields.';
            formStatus.style.color = '#ff6b6b';
        }
        return false;
    }

    if (formStatus) {
        formStatus.textContent = '⏳ Sending message...';
        formStatus.style.color = '#ffd89b';
    }

    setTimeout(() => {
        if (formStatus) {
            formStatus.textContent = '✅ Message sent! I will get back to you soon.';
            formStatus.style.color = '#4ecdc4';
        }
        document.getElementById('contactForm')?.reset();
    }, 1200);

    return false;
}

// ============ SMOOTH SCROLL ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
