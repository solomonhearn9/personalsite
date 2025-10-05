// Main JavaScript file for Solomon H's personal website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initSmoothScrolling();
    initFormHandling();
    initPortfolioFilter();
    initBlogFilter();
    initModalFunctionality();
    initScrollAnimations();
    initNewsletterSignup();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    // Main inquiry form
    const inquiryForm = document.getElementById('inquiry-form');
    const projectForm = document.getElementById('project-inquiry-form');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', handleInquiryForm);
    }
    
    if (projectForm) {
        projectForm.addEventListener('submit', handleProjectForm);
    }
}

function handleInquiryForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        showSuccessMessage('Thank you for your inquiry! I\'ll respond within 24 hours with a customized strategy for your business.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

function handleProjectForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate required checkboxes
    const serviceCheckboxes = form.querySelectorAll('input[name="services"]:checked');
    if (serviceCheckboxes.length === 0) {
        showErrorMessage('Please select at least one service of interest.');
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending Project Details...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        showSuccessMessage('Thank you for your detailed project inquiry! I\'ll review your requirements and respond within 24 hours with a customized proposal and next steps.');
        form.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Scroll to top of form
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 2000);
}

function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => notification.remove());
    
    // Show notification with animation
    setTimeout(() => notification.classList.add('show'), 100);
}

// Portfolio Filter Functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Blog Filter Functionality
function initBlogFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter blog cards
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Modal Functionality for Portfolio Case Studies
function initModalFunctionality() {
    const modal = document.getElementById('case-study-modal');
    const closeBtn = modal?.querySelector('.close');
    const viewCaseBtns = document.querySelectorAll('.view-case-btn');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (modal) {
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                closeModal();
            }
        });
    }
    
    viewCaseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const caseType = this.getAttribute('data-case');
            openCaseStudy(caseType);
        });
    });
}

function openCaseStudy(caseType) {
    const modal = document.getElementById('case-study-modal');
    const content = document.getElementById('case-study-content');
    
    // Case study data
    const caseStudies = {
        dental: {
            title: 'Premier Dental Care - Complete Digital Transformation',
            results: [
                { metric: '340%', label: 'Increase in Online Bookings' },
                { metric: '#1', label: 'Local Search Rankings' },
                { metric: '180%', label: 'Website Traffic Growth' },
                { metric: '95%', label: 'Patient Satisfaction Score' }
            ],
            challenge: 'Premier Dental Care was struggling with low online visibility and minimal appointment bookings through their website. They were losing potential patients to competitors who ranked higher in local search results.',
            solution: 'I implemented a comprehensive digital transformation strategy including a complete website redesign, local SEO optimization, and conversion rate optimization.',
            process: [
                'Conducted thorough competitive analysis and keyword research',
                'Redesigned website with mobile-first approach and improved user experience',
                'Optimized for local search with Google My Business and local citations',
                'Implemented advanced conversion tracking and analytics',
                'Created content strategy focused on dental services and patient education'
            ],
            results: 'Within 3 months, Premier Dental Care saw a 340% increase in online bookings, achieved #1 rankings for 15+ local keywords, and generated $150,000+ in additional revenue.'
        },
        trainer: {
            title: 'Elite Fitness Training - Membership Platform & Growth Strategy',
            results: [
                { metric: '250%', label: 'Membership Growth' },
                { metric: '85%', label: 'Conversion Rate' },
                { metric: '120%', label: 'Revenue Increase' },
                { metric: '4.9/5', label: 'Client Rating' }
            ],
            challenge: 'Elite Fitness Training needed a scalable system to manage memberships and attract new clients. Their existing website wasn\'t converting visitors into paying members.',
            solution: 'I built a custom membership platform with integrated payment processing, class scheduling, and a comprehensive digital marketing strategy.',
            process: [
                'Developed custom membership management system',
                'Integrated payment processing and automated billing',
                'Created class scheduling and booking system',
                'Implemented targeted social media advertising campaigns',
                'Optimized website for lead generation and member onboarding'
            ],
            results: 'Elite Fitness Training achieved 250% membership growth, maintained an 85% conversion rate, and increased monthly revenue by 120% within 6 months.'
        },
        medspa: {
            title: 'Serenity Med Spa - Local SEO Domination Strategy',
            results: [
                { metric: '180%', label: 'Website Traffic Growth' },
                { metric: 'Top 3', label: 'Local Rankings' },
                { metric: '200%', label: 'Lead Generation' },
                { metric: '150%', label: 'Appointment Bookings' }
            ],
            challenge: 'Serenity Med Spa was struggling to compete with larger competitors in local search results. They needed to improve their online visibility and attract more qualified leads.',
            solution: 'I implemented a comprehensive local SEO strategy focused on dominating search results for med spa services in their geographic area.',
            process: [
                'Conducted extensive local keyword research and competitor analysis',
                'Optimized Google My Business profile and local citations',
                'Created location-specific content and service pages',
                'Implemented local schema markup and technical SEO',
                'Developed review management and reputation strategy'
            ],
            results: 'Serenity Med Spa achieved top 3 rankings for 25+ local keywords, increased website traffic by 180%, and generated 200% more qualified leads within 4 months.'
        }
    };
    
    const caseData = caseStudies[caseType];
    if (!caseData) return;
    
    content.innerHTML = `
        <div class="case-study-header">
            <h2>${caseData.title}</h2>
        </div>
        
        <div class="case-study-results">
            <h3>Key Results</h3>
            <div class="results-grid">
                ${caseData.results.map(result => `
                    <div class="result-item">
                        <span class="result-number">${result.metric}</span>
                        <span class="result-label">${result.label}</span>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="case-study-content">
            <div class="case-section">
                <h3>The Challenge</h3>
                <p>${caseData.challenge}</p>
            </div>
            
            <div class="case-section">
                <h3>The Solution</h3>
                <p>${caseData.solution}</p>
            </div>
            
            <div class="case-section">
                <h3>Our Process</h3>
                <ul>
                    ${caseData.process.map(step => `<li>${step}</li>`).join('')}
                </ul>
            </div>
            
            <div class="case-section">
                <h3>Final Results</h3>
                <p>${caseData.results}</p>
            </div>
        </div>
        
        <div class="case-study-cta">
            <h3>Ready to Achieve Similar Results?</h3>
            <p>Let's discuss how I can help your business achieve these kinds of results.</p>
            <div class="cta-buttons">
                <a href="contact.html" class="btn btn-primary">Start Your Project</a>
                <a href="services.html" class="btn btn-secondary">View Services</a>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('case-study-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .testimonial, .advantage-card, .blog-card');
    animateElements.forEach(el => observer.observe(el));
}

// Newsletter Signup
function initNewsletterSignup() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate subscription (replace with actual endpoint)
            setTimeout(() => {
                showSuccessMessage('Thank you for subscribing! You\'ll receive weekly growth insights starting next week.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Load more articles functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more articles
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                showNotification('More articles will be available soon! Subscribe to our newsletter to be notified when new content is published.', 'success');
                this.textContent = 'Load More Articles';
                this.disabled = false;
            }, 2000);
        });
    }
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for notifications and animations
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 400px;
        border-left: 4px solid #10b981;
    }
    
    .notification.show {
        transform: translateX(0);
        opacity: 1;
    }
    
    .notification-error {
        border-left-color: #ef4444;
    }
    
    .notification-content {
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .notification-icon {
        font-size: 20px;
        color: #10b981;
    }
    
    .notification-error .notification-icon {
        color: #ef4444;
    }
    
    .notification-message {
        flex: 1;
        color: #374151;
        font-weight: 500;
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        color: #6b7280;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }
    
    .modal-content {
        background-color: white;
        margin: 5% auto;
        padding: 0;
        border-radius: 16px;
        width: 90%;
        max-width: 800px;
        max-height: 90vh;
        overflow-y: auto;
        position: relative;
        animation: modalSlideIn 0.3s ease-out;
    }
    
    @keyframes modalSlideIn {
        from {
            opacity: 0;
            transform: translateY(-50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .modal .close {
        position: absolute;
        top: 20px;
        right: 30px;
        font-size: 30px;
        font-weight: bold;
        cursor: pointer;
        color: #666;
        z-index: 1001;
        background: white;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .modal .close:hover {
        color: #000;
        background: #f5f5f5;
    }
    
    .case-study-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 40px;
        text-align: center;
        border-radius: 16px 16px 0 0;
    }
    
    .case-study-header h2 {
        color: white;
        margin: 0;
        font-size: 2rem;
    }
    
    .case-study-results {
        padding: 40px;
        background: #f9fafb;
    }
    
    .case-study-results h3 {
        text-align: center;
        margin-bottom: 30px;
        color: #1f2937;
    }
    
    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 20px;
    }
    
    .result-item {
        text-align: center;
        background: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .result-number {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 8px;
    }
    
    .result-label {
        font-size: 0.9rem;
        color: #6b7280;
        font-weight: 500;
    }
    
    .case-study-content {
        padding: 40px;
    }
    
    .case-section {
        margin-bottom: 30px;
    }
    
    .case-section h3 {
        color: #1f2937;
        margin-bottom: 15px;
        font-size: 1.5rem;
    }
    
    .case-section p {
        color: #4b5563;
        line-height: 1.6;
        margin-bottom: 15px;
    }
    
    .case-section ul {
        color: #4b5563;
        line-height: 1.6;
    }
    
    .case-section li {
        margin-bottom: 8px;
    }
    
    .case-study-cta {
        background: #1f2937;
        color: white;
        padding: 40px;
        text-align: center;
        border-radius: 0 0 16px 16px;
    }
    
    .case-study-cta h3 {
        color: white;
        margin-bottom: 15px;
    }
    
    .case-study-cta p {
        color: #d1d5db;
        margin-bottom: 30px;
    }
    
    .case-study-cta .cta-buttons {
        display: flex;
        gap: 15px;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    @media (max-width: 768px) {
        .modal-content {
            margin: 10% auto;
            width: 95%;
        }
        
        .case-study-header {
            padding: 30px 20px;
        }
        
        .case-study-results,
        .case-study-content,
        .case-study-cta {
            padding: 30px 20px;
        }
        
        .results-grid {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .case-study-cta .cta-buttons {
            flex-direction: column;
            align-items: center;
        }
    }
`;
document.head.appendChild(style);


