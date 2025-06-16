// Product Array as specified in the requirements
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

// Function to populate product select options
function populateProductSelect() {
    const productSelect = document.getElementById('productName');
    
    // Clear any existing options (except the placeholder)
    while (productSelect.children.length > 1) {
        productSelect.removeChild(productSelect.lastChild);
    }
    
    // Add each product as an option
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}

// Function to enhance star rating functionality
function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    const radioInputs = document.querySelectorAll('input[name="rating"]');
    
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', () => {
            highlightStars(index);
        });
        
        star.addEventListener('mouseleave', () => {
            resetStars();
            highlightSelectedStars();
        });
        
        star.addEventListener('click', () => {
            radioInputs[index].checked = true;
            highlightSelectedStars();
        });
    });
    
    function highlightStars(index) {
        stars.forEach((star, i) => {
            if (i <= index) {
                star.style.color = '#ffd700';
                star.style.transform = 'scale(1.1)';
            } else {
                star.style.color = '#ddd';
                star.style.transform = 'scale(1)';
            }
        });
    }
    
    function resetStars() {
        stars.forEach(star => {
            star.style.color = '#ddd';
            star.style.transform = 'scale(1)';
        });
    }
    
    function highlightSelectedStars() {
        const selectedRating = document.querySelector('input[name="rating"]:checked');
        if (selectedRating) {
            const selectedIndex = parseInt(selectedRating.value) - 1;
            highlightStars(selectedIndex);
        }
    }
}

// Function to add form validation feedback
function setupFormValidation() {
    const form = document.getElementById('reviewForm');
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('invalid', (e) => {
            e.target.style.borderColor = '#e74c3c';
        });
        
        field.addEventListener('input', (e) => {
            if (e.target.validity.valid) {
                e.target.style.borderColor = '#27ae60';
            } else {
                e.target.style.borderColor = '#e74c3c';
            }
        });
        
        field.addEventListener('change', (e) => {
            if (e.target.validity.valid) {
                e.target.style.borderColor = '#27ae60';
            }
        });
    });
}

// Function to set up accessibility features
function setupAccessibility() {
    // Add ARIA labels to star rating
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.setAttribute('aria-label', `${index + 1} star${index === 0 ? '' : 's'}`);
    });
    
    // Add live region for form validation feedback
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    document.body.appendChild(liveRegion);
    
    // Announce validation errors
    const form = document.getElementById('reviewForm');
    form.addEventListener('submit', (e) => {
        const invalidFields = form.querySelectorAll(':invalid');
        if (invalidFields.length > 0) {
            liveRegion.textContent = `Please correct ${invalidFields.length} error${invalidFields.length === 1 ? '' : 's'} in the form.`;
        }
    });
}

// Function to enhance form usability
function setupFormEnhancements() {
    // Auto-expand textarea on input
    const textarea = document.getElementById('writtenReview');
    textarea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
    
    // Add character counter for textarea (optional enhancement)
    const maxLength = 1000;
    textarea.setAttribute('maxlength', maxLength);
    
    const charCounter = document.createElement('div');
    charCounter.className = 'char-counter';
    charCounter.style.textAlign = 'right';
    charCounter.style.fontSize = '0.9rem';
    charCounter.style.color = '#666';
    charCounter.style.marginTop = '0.25rem';
    textarea.parentNode.appendChild(charCounter);
    
    function updateCharCounter() {
        const remaining = maxLength - textarea.value.length;
        charCounter.textContent = `${remaining} characters remaining`;
        charCounter.style.color = remaining < 100 ? '#e74c3c' : '#666';
    }
    
    textarea.addEventListener('input', updateCharCounter);
    updateCharCounter(); // Initialize counter
}

// Function to handle form submission preparation
function setupFormSubmission() {
    const form = document.getElementById('reviewForm');
    
    form.addEventListener('submit', (e) => {
        // Ensure all form data is properly formatted
        const formData = new FormData(form);
        
        // Get selected features as a comma-separated string
        const selectedFeatures = [];
        document.querySelectorAll('input[name="features"]:checked').forEach(checkbox => {
            selectedFeatures.push(checkbox.value);
        });
        
        // Add features to form data as a single parameter
        if (selectedFeatures.length > 0) {
            // Remove individual feature checkboxes from form data
            formData.delete('features');
            formData.append('features', selectedFeatures.join(','));
        }
        
        // The form will naturally submit with the GET method to review.html
        // No need to prevent default submission
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    populateProductSelect();
    setupStarRating();
    setupFormValidation();
    setupAccessibility();
    setupFormEnhancements();
    setupFormSubmission();
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Focus management
    const firstInput = document.getElementById('productName');
    if (firstInput) {
        firstInput.focus();
    }
    
    console.log('Product Review Form initialized successfully');
    console.log(`Loaded ${products.length} products`);
});