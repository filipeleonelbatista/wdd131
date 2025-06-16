// Product Array (same as in form.js for reference)
const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

// Function to get URL parameters
function getURLParameters() {
    const params = new URLSearchParams(window.location.search);
    const data = {};
    
    for (let [key, value] of params) {
        data[key] = value;
    }
    
    return data;
}

// Function to find product name by ID
function getProductName(productId) {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Unknown Product';
}

// Function to generate star display
function generateStarDisplay(rating) {
    const starCount = parseInt(rating);
    const stars = '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
    return `<span class="star-display">${stars}</span> (${rating}/5)`;
}

// Function to format features
function formatFeatures(featuresString) {
    if (!featuresString) return 'None selected';
    
    const features = featuresString.split(',');
    const featureLabels = {
        'easy-installation': 'Easy Installation',
        'user-friendly': 'User Friendly Interface',
        'durable': 'Durable Construction',
        'good-value': 'Good Value for Money',
        'reliable': 'Reliable Performance'
    };
    
    return features.map(feature => 
        `<span class="feature-tag">${featureLabels[feature] || feature}</span>`
    ).join('');
}

// Function to format date
function formatDate(dateString) {
    if (!dateString) return 'Not specified';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Function to display review summary
function displayReviewSummary() {
    const reviewData = getURLParameters();
    const summaryContainer = document.getElementById('reviewSummary');
    
    if (Object.keys(reviewData).length === 0) {
        summaryContainer.innerHTML = `
            <div class="no-data">
                <p>No review data found. Please submit a review first.</p>
                <a href="form.html" class="btn btn-primary">Submit a Review</a>
            </div>
        `;
        return;
    }
    
    const productName = getProductName(reviewData.productName);
    const ratingDisplay = reviewData.rating ? generateStarDisplay(reviewData.rating) : 'Not rated';
    const installDate = formatDate(reviewData.installDate);
    const features = formatFeatures(reviewData.features);
    const writtenReview = reviewData.writtenReview || 'No written review provided';
    const userName = reviewData.userName || 'Anonymous';
    
    summaryContainer.innerHTML = `
        <h3>Review Details</h3>
        <div class="summary-item">
            <span class="summary-label">Product:</span>
            <span class="summary-value">${productName}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Rating:</span>
            <span class="summary-value">${ratingDisplay}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Installation Date:</span>
            <span class="summary-value">${installDate}</span>
        </div>
        <div class="summary-item">
            <span class="summary-label">Useful Features:</span>
            <div class="features-list">${features}</div>
        </div>
        ${writtenReview !== 'No written review provided' ? `
        <div class="summary-item">
            <span class="summary-label">Written Review:</span>
            <div class="summary-value" style="margin-top: 0.5rem; font-style: italic; max-width: 100%; word-wrap: break-word;">"${writtenReview}"</div>
        </div>
        ` : ''}
        <div class="summary-item">
            <span class="summary-label">Reviewer:</span>
            <span class="summary-value">${userName}</span>
        </div>
    `;
}

// Function to update review counter using localStorage
function updateReviewCounter() {
    const counterElement = document.getElementById('reviewCounter');
    
    try {
        // Get current counter value from localStorage
        let reviewCount = localStorage.getItem('reviewCount');
        
        // If no counter exists, initialize it
        if (reviewCount === null) {
            reviewCount = 0;
        } else {
            reviewCount = parseInt(reviewCount);
        }
        
        // Increment the counter
        reviewCount++;
        
        // Store the updated counter
        localStorage.setItem('reviewCount', reviewCount.toString());
        
        // Display the counter with animation
        counterElement.textContent = reviewCount;
        
        // Add animation class
        counterElement.classList.add('counter-animate');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            counterElement.classList.remove('counter-animate');
        }, 600);
        
        console.log(`Review counter updated: ${reviewCount}`);
        
    } catch (error) {
        console.error('Error updating review counter:', error);
        counterElement.textContent = '1';
    }
}

// Function to add counter animation styles
function addCounterAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .counter-animate {
            animation: counterPulse 0.6s ease-in-out;
        }
        
        @keyframes counterPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); background: rgba(255, 255, 255, 0.4); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// Function to setup accessibility features
function setupAccessibility() {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.background = '#000';
    skipLink.style.color = '#fff';
    skipLink.style.padding = '8px';
    skipLink.style.textDecoration = 'none';
    skipLink.style.zIndex = '1000';
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const main = document.querySelector('main');
    main.setAttribute('id', 'main');
    
    // Announce success to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        announcement.textContent = 'Review submitted successfully. Thank you for your feedback.';
    }, 500);
}

// Function to handle page errors gracefully
function setupErrorHandling() {
    window.addEventListener('error', (event) => {
        console.error('Page error:', event.error);
        
        // Show user-friendly error message
        const errorDiv = document.createElement('div');
        errorDiv.style.background = '#ffe6e6';
        errorDiv.style.border = '1px solid #ff9999';
        errorDiv.style.padding = '1rem';
        errorDiv.style.margin = '1rem';
        errorDiv.style.borderRadius = '4px';
        errorDiv.style.color = '#cc0000';
        errorDiv.innerHTML = `
            <strong>Something went wrong!</strong><br>
            If you continue to experience issues, please try refreshing the page or contact support.
        `;
        
        document.querySelector('main').prepend(errorDiv);
    });
}

// Function to add performance monitoring
function addPerformanceTracking() {
    // Track page load time
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log(`Review page loaded in ${Math.round(loadTime)}ms`);
        
        // Track localStorage operations
        const startTime = performance.now();
        updateReviewCounter();
        const endTime = performance.now();
        console.log(`localStorage operation completed in ${Math.round(endTime - startTime)}ms`);
    });
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Review confirmation page initializing...');
    
    // Setup all features
    addCounterAnimationStyles();
    setupAccessibility();
    setupErrorHandling();
    addPerformanceTracking();
    
    // Display review data
    displayReviewSummary();
    
    // Update and display review counter
    updateReviewCounter();
    
    // Add smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Focus management for accessibility
    const mainHeading = document.querySelector('h1');
    if (mainHeading) {
        mainHeading.focus();
        mainHeading.setAttribute('tabindex', '-1');
    }
    
    console.log('Review confirmation page initialized successfully');
    
    // Log review data for debugging (remove in production)
    const reviewData = getURLParameters();
    console.log('Review data received:', reviewData);
});