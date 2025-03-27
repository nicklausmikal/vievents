// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Animated background slideshow
    const initBackgroundSlideshow = () => {
        const slides = document.querySelectorAll('.hero-background .slide');
        if (slides.length === 0) return;
        
        let currentSlide = 0;
        
        // Function to change slide
        const changeSlide = () => {
            // Remove active class from all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Add active class to current slide
            slides[currentSlide].classList.add('active');
            
            // Move to next slide or back to first
            currentSlide = (currentSlide + 1) % slides.length;
        };
        
        // Start with first slide active
        changeSlide();
        
        // Change slide every 5 seconds
        setInterval(changeSlide, 5000);
    };
    
    // Initialize background slideshow
    initBackgroundSlideshow();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Service button click handler - updates form title and selects service
    const serviceButtons = document.querySelectorAll('.btn-service');
    serviceButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const service = this.getAttribute('data-service');
            const eventTypeSelect = document.getElementById('eventType');
            const formTitle = document.getElementById('form-title');
            
            if (eventTypeSelect && formTitle) {
                formTitle.textContent = `Book ${service} Services`;
                
                // Select the correct option in the dropdown
                for (let i = 0; i < eventTypeSelect.options.length; i++) {
                    if (eventTypeSelect.options[i].value === service) {
                        eventTypeSelect.selectedIndex = i;
                        break;
                    }
                }
            }
        });
    });
    
    // Form submission with validation
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let the form submit normally to FormSubmit
            
            // Basic validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const eventType = document.getElementById('eventType').value;
            const message = document.getElementById('message').value.trim();
            
            if (!name || !email || !eventType || !message) {
                e.preventDefault(); // Prevent submission if validation fails
                alert('Please fill in all required fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault(); // Prevent submission if validation fails
                alert('Please enter a valid email address');
                return;
            }
            
            // If using appState, update state with form data
            if (window.appState) {
                const formData = {
                    name: name,
                    email: email,
                    eventType: eventType,
                    eventDate: document.getElementById('eventDate').value,
                    guests: document.getElementById('guests').value,
                    message: message
                };
                window.appState.setState({ formData });
            }
            
            // If validation passes, form will submit to FormSubmit service
        });
    }
    
    // Testimonial slider auto-scroll
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonials = document.querySelectorAll('.testimonial');
        let currentIndex = 0;
        
        function scrollToNextTestimonial() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            testimonialSlider.scrollTo({
                left: testimonials[currentIndex].offsetLeft,
                behavior: 'smooth'
            });
        }
        
        // Auto-scroll testimonials every 5 seconds
        setInterval(scrollToNextTestimonial, 5000);
    }
    
    // Scroll animations
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animate');
            }
        });
    };
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Check for elements on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            // Don't prevent default - let the form submit normally to FormSubmit
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                e.preventDefault(); // Prevent submission if validation fails
                alert('Please enter your email address');
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault(); // Prevent submission if validation fails
                alert('Please enter a valid email address');
                return;
            }
            
            // If validation passes, form will submit to FormSubmit service
        });
    }
    
    // Parallax effect for team background
    const teamBackground = document.querySelector('.team-background-image');
    
    if (teamBackground) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            teamBackground.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        });
    }
}); 