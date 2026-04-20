/* script.js - Complete JavaScript for All Pages */

// ============ NAVIGATION FUNCTIONS ============
function goToContact() {
    window.location.href = "contact.html";
}

function goToProjects() {
    window.location.href = "projects.html";
}

// ============ MOBILE MENU TOGGLE ============
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navUl.classList.toggle('show');
        });
    }
    
    // Add animation on scroll
    const cards = document.querySelectorAll('.card, .skill-category, .resume-card, .info-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ============ PROJECT MODAL FUNCTIONS ============
function showProjectModal(title, description) {
    // Create modal if it doesn't exist
    let modal = document.getElementById('projectModal');
    
    if (!modal) {
        // Create modal dynamically
        modal = document.createElement('div');
        modal.id = 'projectModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close" onclick="closeModal()">&times;</span>
                <i class="fas fa-rocket modal-icon"></i>
                <h2 id="modalTitle">Project Title</h2>
                <p id="modalDesc">Project description goes here...</p>
                <button class="btn-primary" onclick="closeModal()">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Update modal content
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = description;
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeModal();
    }
}

// ============ RESUME DOWNLOAD FUNCTION ============
function downloadResume() {
    // Create a simple resume content
    const resumeContent = `
        ALEX MORGAN - RESUME
        ====================
        
        CONTACT
        -------
        Email: alex.morgan@portfolio.com
        Phone: +1 (555) 123-4567
        Location: San Francisco, CA
        
        PROFESSIONAL SUMMARY
        --------------------
        Creative Web Developer with 5+ years of experience in building responsive,
        user-friendly websites and applications. Expert in modern frontend technologies
        and passionate about UI/UX design.
        
        WORK EXPERIENCE
        ---------------
        Senior Web Developer | 2022 - Present
        • Leading front-end development for multiple client projects
        • Mentoring junior developers
        • Implementing modern UI/UX solutions
        
        Frontend Developer | 2019 - 2022
        • Built responsive web applications
        • Collaborated with design teams
        • Optimized website performance
        
        EDUCATION
        ---------
        B.Sc. Computer Science | University of Technology | 2013 - 2017
        Graduated with Honors, GPA: 3.8/4.0
        
        SKILLS
        ------
        • HTML5, CSS3, JavaScript
        • React, Node.js
        • Python, SQL
        • Figma, Adobe XD
        • Git, VS Code, Docker
        
        CERTIFICATIONS
        --------------
        • Meta Frontend Developer Professional Certificate
        • Google UX Design Certificate
    `;
    
    // Create blob and download
    const blob = new Blob([resumeContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Alex_Morgan_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success message
    alert('Resume download started!');
}

// ============ CONTACT FORM SUBMISSION ============
function sendMessage(event) {
    if (event) event.preventDefault();
    
    const name = document.getElementById('name')?.value || '';
    const email = document.getElementById('email')?.value || '';
    const message = document.getElementById('message')?.value || '';
    const formStatus = document.getElementById('formStatus');
    
    if (!name || !email || !message) {
        if (formStatus) {
            formStatus.textContent = 'Please fill in all fields';
            formStatus.style.color = '#ff6b6b';
        }
        return false;
    }
    
    // Simulate sending message
    if (formStatus) {
        formStatus.textContent = 'Sending message...';
        formStatus.style.color = '#ffd89b';
    }
    
    setTimeout(() => {
        if (formStatus) {
            formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
            formStatus.style.color = '#4ecdc4';
        }
        document.getElementById('contactForm')?.reset();
    }, 1000);
    
    return false;
}

// ============ ADDITIONAL INTERACTIVE EFFECTS ============

// Add hover effect to cards
document.addEventListener('DOMContentLoaded', function() {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add typing animation to hero text (optional)
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle && heroTitle.textContent.includes('Hello')) {
        const originalText = heroTitle.innerHTML;
        heroTitle.innerHTML = '<span class="gradient-text">Hello, I\'m Alex Morgan</span>';
    }
});

// ============ PAGE LOAD ANIMATIONS ============
window.addEventListener('load', function() {
    // Fade in content
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
    
    // Add active class to current page in nav
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// ============ SMOOTH SCROLLING ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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