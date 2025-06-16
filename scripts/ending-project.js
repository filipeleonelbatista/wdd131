// Portfolio Website JavaScript - WDD 131 Final Project

// Object containing personal information
const personalInfo = {
    name: 'Filipe de Leonel Batista',
    role: 'Full Stack Developer',
    email: 'filipe.x2016@gmail.com',
    phone: '+55 (51) 99273-6445',
    location: 'Brazil (Remote)',
    github: 'github.com/filipeleonelbatista',
    linkedin: 'linkedin.com/in/filipeleonelbatista'
};

// Arrays for skills and experiences
const skillsData = [
    'ReactJS', 'Node.js', 'React Native', 'TypeScript', 'Redux',
    'Material UI', 'Styled Components', 'Tailwind CSS', 'Shadcn UI',
    'Firebase', 'Express JS', 'MySQL', 'Laravel', 'C#', 'Spring Boot',
    'Java', 'Python'
];

// Update projectsData with correct properties
const projectsData = [
    {
        id: 1,
        title: 'WhatsApp Sender',
        description: 'Bulk message sending solution using automation with Selenium and Puppeteer.',
        link: 'https://enviodemensagensemmassa.vercel.app/',
        icon: '💬',
        category: 'web',
        tags: ['Electron', 'Puppeteer', 'ReactJS', 'NextJS', 'AI Integration'],
        details: 'Developed an innovative solution to help small and medium-sized businesses improve their communication with customers through WhatsApp. Using automation with Selenium and Puppeteer, implemented mass sending of personalized messages with attachments.'
    },
    {
        id: 2,
        title: 'Resume AI CV',
        description: 'AI-powered CV analysis and generation platform.',
        link: 'https://resume-ai-cv.vercel.app/',
        icon: '📄',
        category: 'web',
        tags: ['ReactJS', 'NextJS', 'OpenAI', 'Typescript'],
        details: 'Created a platform for generating personalized resumes using AI. Implemented connections with OpenAI and Gemini APIs for intelligent analysis.'
    },
    {
        id: 3,
        title: 'MINHAS FINANÇA$',
        description: 'Family financial management platform with AI analysis.',
        link: 'https://minhasfinancas.vercel.app/',
        icon: '💰',
        category: 'web',
        tags: ['ReactJS', 'Typescript', 'OpenAI API'],
        details: 'Developed a complete platform for tracking income and expenses, monitoring household product inventory, and vehicle fuel costs.'
    }
];

// State Management
let currentFilter = 'all';
let visitCount = 0;

// DOM Manipulation Functions
function createElement(tag, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
}

function updateProfile() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const profileImage = document.querySelector('.hero-image img');

    if (heroTitle && heroSubtitle && profileImage) {
        heroTitle.innerHTML = `Hello, I'm <span class="highlight">${personalInfo.name}</span>`;
        heroSubtitle.textContent = personalInfo.role;
        profileImage.src = './images/filipe.png';
        profileImage.alt = personalInfo.name;
    }
}

// Template Literals for dynamic content
function createSkillTag(skill) {
    return `
        <span class="skill-tag" data-skill="${skill}">
            ${skill}
        </span>
    `;
}

// Array Method to render skills
function renderSkills() {
    const skillsContainer = document.querySelector('.skill-tags');
    if (skillsContainer) {
        skillsContainer.innerHTML = skillsData
            .map(skill => createSkillTag(skill))
            .join('');
    }
}

function renderProjects(filter = 'all') {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = '';

    const filteredProjects = filter === 'all' 
        ? projectsData 
        : projectsData.filter(project => project.category === filter);

    filteredProjects.forEach(project => {
        const projectCard = createElement('div', 'project-card');
        
        projectCard.innerHTML = `
            <div class="project-image">${project.icon}</div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;

        projectCard.addEventListener('click', () => openProjectModal(project));
        projectsGrid.appendChild(projectCard);
    });
}

function openProjectModal(project) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <div class="project-modal-content">
            <div class="project-modal-header">
                <div class="project-modal-icon">${project.icon}</div>
                <h2>${project.title}</h2>
            </div>
            <p class="project-modal-description">${project.details}</p>
            <div class="project-modal-tags">
                <h4>Technologies Used:</h4>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.style.display = 'none';
}

// Animation Functions
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            stat.textContent = Math.floor(current);
            if (current >= target) {
                clearInterval(timer);
                stat.textContent = target;
            }
        }, 20);
    });
}

// Navigation Functions
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function setActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Form Handling Functions
function handleContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
    
    // Form validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields');
        return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    // Store in localStorage
    const submission = {
        name,
        email,
        message,
        date: new Date().toISOString()
    };

    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    submissions.push(submission);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));

    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    event.target.reset();
    return true;
}

function validateForm() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    form.addEventListener('submit', (e) => {
        let isValid = true;
        const errors = [];

        if (nameInput.value.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
            isValid = false;
        }

        if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errors.push('Please enter a valid email address');
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault();
            alert(errors.join('\n'));
        }
    });
}

// Visitor Counter Functions
function initVisitorCounter() {
    visitCount = parseInt(localStorage.getItem('visitCount') || '0');
    visitCount++;
    localStorage.setItem('visitCount', visitCount.toString());
    updateVisitorDisplay();
}

function updateVisitorDisplay() {
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
        visitorCountElement.textContent = visitCount;
    }
}

function resetVisitorCounter() {
    if (confirm('Are you sure you want to reset the visitor counter?')) {
        visitCount = 0;
        localStorage.setItem('visitCount', '0');
        updateVisitorDisplay();
    }
}

// Smooth Scrolling Function
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId.replace('#', ''));
    if (targetElement) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Lazy Loading Implementation
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Array Methods and Data Processing
function getProjectsByCategory() {
    const categories = ['web', 'mobile', 'design'];
    const projectsByCategory = {};

    categories.forEach(category => {
        projectsByCategory[category] = projectsData.filter(project =>
            project.category === category
        );
    });

    return projectsByCategory;
}

function getProjectTags() {
    const allTags = projectsData.map(project => project.tags).flat();
    const uniqueTags = [...new Set(allTags)];
    return uniqueTags.sort();
}

// Event Listeners Setup
function setupEventListeners() {
    // Navigation
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScrollTo(targetId);

            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            const hamburgerEl = document.querySelector('.hamburger');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburgerEl.classList.remove('active');
            }
        });
    });

    // Hero buttons
    const viewWorkBtn = document.getElementById('view-work-btn');
    if (viewWorkBtn) {
        viewWorkBtn.addEventListener('click', () => {
            smoothScrollTo('#projects');
        });
    }

    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            smoothScrollTo('#contact');
        });
    }

    // Project filters
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.dataset.filter;
            currentFilter = filter;

            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(filterBtn => {
                filterBtn.classList.remove('active');
            });
            e.target.classList.add('active');

            // Render filtered projects
            renderProjects(filter);
        });
    });

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Modal close
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close modal when clicking outside
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Visitor counter reset
    const resetCounterBtn = document.getElementById('reset-counter');
    if (resetCounterBtn) {
        resetCounterBtn.addEventListener('click', resetVisitorCounter);
    }

    // Scroll event for navigation
    window.addEventListener('scroll', setActiveNavLink);

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');

                // Trigger stats animation when about section is visible
                if (entry.target.id === 'about') {
                    setTimeout(animateStats, 500);
                }
            }
        });
    }, observerOptions);

    // Observe sections for animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialization Function
function initializeWebsite() {
    // Render dynamic content
    updateProfile();
    renderSkills();
    renderProjects();

    // Initialize visitor counter
    initVisitorCounter();

    // Setup event listeners
    setupEventListeners();

    // Initialize lazy loading
    initLazyLoading();

    // Log project statistics to console
    console.log('Project Statistics:', {
        totalProjects: projectsData.length,
        projectsByCategory: getProjectsByCategory(),
        allTags: getProjectTags()
    });

    // Welcome message using template literal
    const welcomeMessage = `Welcome to Filipe de Leonel Batista's Portfolio! 
    Site initialized with ${projectsData.length} projects and ${skillsData.length} skills.
    You are visitor number ${visitCount}.`;

    console.log(welcomeMessage);
}

function verifyHeroImage() {
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.onerror = function() {
            console.error('Failed to load hero image');
            this.src = './images/filipe.png'; // Fallback to GitHub avatar
        };
    }
}

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', () => {
    initializeWebsite();
    verifyHeroImage();
});

// Window Load Event
window.addEventListener('load', () => {
    // Hide loading spinner if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }

    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
});

// Handle form input validation with real-time feedback
document.addEventListener('input', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        const input = e.target;
        const value = input.value.trim();

        // Remove existing validation classes
        input.classList.remove('valid', 'invalid');

        // Add validation class based on input type and value
        if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            input.classList.add(emailRegex.test(value) ? 'valid' : 'invalid');
        } else if (input.required) {
            input.classList.add(value.length > 0 ? 'valid' : 'invalid');
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape') {
        const modal = document.getElementById('project-modal');
        if (modal && modal.style.display === 'block') {
            closeModal();
        }
    }

    // Toggle mobile menu with Enter key on hamburger
    if (e.key === 'Enter' && e.target.classList.contains('hamburger')) {
        toggleMobileMenu();
    }
});

// Error handling for localStorage
function safeLocalStorage(action, key, value = null) {
    try {
        if (action === 'get') {
            return localStorage.getItem(key);
        } else if (action === 'set') {
            localStorage.setItem(key, value);
        } else if (action === 'remove') {
            localStorage.removeItem(key);
        }
    } catch (error) {
        console.warn('LocalStorage not available:', error);
        return null;
    }
}

// Performance monitoring
function logPerformanceMetrics() {
    if ('performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0];
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;

        console.log(`Page loaded in ${loadTime}ms`);

        // Log to localStorage for analytics
        const performanceData = {
            loadTime,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        };

        const performanceLog = JSON.parse(safeLocalStorage('get', 'performanceLog') || '[]');
        performanceLog.push(performanceData);

        // Keep only last 10 entries
        if (performanceLog.length > 10) {
            performanceLog.shift();
        }

        safeLocalStorage('set', 'performanceLog', JSON.stringify(performanceLog));
    }
}

// Call performance logging after page load
window.addEventListener('load', () => {
    setTimeout(logPerformanceMetrics, 1000);
});

window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo);
    return false;
};