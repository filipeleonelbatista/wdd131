// Site Plan Interactive Features
// This JavaScript file adds interactive functionality to the site plan document

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initColorPaletteInteractions();
    initSmoothScrolling();
    initWireframeInteractions();
    initFontExampleInteractions();
    initAccessibilityFeatures();
    
    console.log('Site Plan document loaded successfully!');
});

/**
 * Color Palette Interactive Features
 */
function initColorPaletteInteractions() {
    const colorBoxes = document.querySelectorAll('.color-box');
    
    colorBoxes.forEach(box => {
        // Click to copy color value to clipboard
        box.addEventListener('click', function() {
            const colorValue = this.textContent.split('\n')[0]; // Get color code
            copyToClipboard(colorValue);
            showNotification(`Color ${colorValue} copied to clipboard!`);
        });
        
        // Add hover effect with color name
        box.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        box.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Smooth scrolling for internal navigation
 */
function initSmoothScrolling() {
    // Add smooth scrolling to section headings when clicked
    const sectionHeadings = document.querySelectorAll('h2');
    
    sectionHeadings.forEach(heading => {
        heading.style.cursor = 'pointer';
        heading.addEventListener('click', function() {
            this.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}

/**
 * Wireframe Interactive Features
 */
function initWireframeInteractions() {
    const wireframes = document.querySelectorAll('.wireframe');
    
    wireframes.forEach(wireframe => {
        // Add click to expand/focus functionality
        wireframe.addEventListener('click', function() {
            this.classList.toggle('focused');
            
            if (this.classList.contains('focused')) {
                this.style.transform = 'scale(1.1)';
                this.style.zIndex = '10';
                this.style.position = 'relative';
            } else {
                this.style.transform = 'scale(1)';
                this.style.zIndex = '1';
            }
        });
        
        // Reset focus when clicking outside
        document.addEventListener('click', function(e) {
            if (!wireframe.contains(e.target)) {
                wireframe.classList.remove('focused');
                wireframe.style.transform = 'scale(1)';
                wireframe.style.zIndex = '1';
            }
        });
    });
}

/**
 * Font Example Interactive Features
 */
function initFontExampleInteractions() {
    const fontExamples = document.querySelectorAll('.font-example');
    
    fontExamples.forEach(example => {
        // Add click to highlight font information
        example.addEventListener('click', function() {
            // Remove highlight from other examples
            fontExamples.forEach(ex => ex.classList.remove('highlighted'));
            
            // Add highlight to clicked example
            this.classList.add('highlighted');
            
            // Add highlighted styles
            this.style.borderLeftWidth = '8px';
            this.style.backgroundColor = '#e8f4f8';
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                this.classList.remove('highlighted');
                this.style.borderLeftWidth = '4px';
                this.style.backgroundColor = 'var(--background-light)';
            }, 3000);
        });
    });
}

/**
 * Accessibility Features
 */
function initAccessibilityFeatures() {
    // Add keyboard navigation support
    addKeyboardNavigation();
    
    // Add focus indicators
    addFocusIndicators();
    
    // Add skip navigation
    addSkipNavigation();
}

/**
 * Keyboard Navigation Support
 */
function addKeyboardNavigation() {
    const interactiveElements = document.querySelectorAll('.color-box, .wireframe, .font-example');
    
    interactiveElements.forEach(element => {
        // Make elements focusable
        element.setAttribute('tabindex', '0');
        
        // Add keyboard event listeners
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

/**
 * Focus Indicators
 */
function addFocusIndicators() {
    const style = document.createElement('style');
    style.textContent = `
        .color-box:focus,
        .wireframe:focus,
        .font-example:focus {
            outline: 3px solid var(--accent-color);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Skip Navigation
 */
function addSkipNavigation() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    
    // Add skip link styles
    const skipStyle = document.createElement('style');
    skipStyle.textContent = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 0 0 4px 4px;
            z-index: 1000;
            transition: top 0.3s;
        }
        .skip-link:focus {
            top: 0;
        }
    `;
    document.head.appendChild(skipStyle);
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add id to main element
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main';
    }
}

/**
 * Utility Functions
 */

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
}

/**
 * Show notification message
 */
function showNotification(message) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
    `;
    
    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Responsive behavior adjustments
 */
function handleResponsiveChanges() {
    const wireframeContainer = document.querySelector('.wireframe-container');
    
    function adjustLayout() {
        if (window.innerWidth < 768) {
            wireframeContainer?.classList.add('mobile-layout');
        } else {
            wireframeContainer?.classList.remove('mobile-layout');
        }
    }
    
    window.addEventListener('resize', adjustLayout);
    adjustLayout(); // Run on load
}

// Initialize responsive handling
handleResponsiveChanges();

/**
 * Print optimization
 */
window.addEventListener('beforeprint', function() {
    // Ensure all interactive elements are visible for print
    const interactiveElements = document.querySelectorAll('.color-box, .wireframe');
    interactiveElements.forEach(element => {
        element.style.transform = 'none';
        element.style.transition = 'none';
    });
});

/**
 * Performance monitoring
 */
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                console.log(`Site Plan loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
            }, 0);
        });
    }
}

logPerformance();