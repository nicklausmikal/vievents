/**
 * Application State Management
 * Singleton class for managing app state using observer pattern
 */
class AppState {
    constructor() {
        // Ensure singleton instance
        if (AppState.instance) {
            return AppState.instance;
        }
        
        AppState.instance = this;
        
        // Initialize state
        this.state = {
            selectedService: null,
            formData: {},
            events: [
                {
                    icon: 'fa-heart',
                    title: 'Traditional Weddings',
                    description: 'From Mehendi to Sangeet to Wedding ceremonies, we create magical Indian wedding experiences.',
                    serviceType: 'Wedding'
                },
                {
                    icon: 'fa-briefcase',
                    title: 'Corporate Events',
                    description: 'From conferences to team-building events, we handle all types of corporate functions with excellence.',
                    serviceType: 'Corporate'
                },
                {
                    icon: 'fa-landmark',
                    title: 'Government Events',
                    description: 'Professional services for government ceremonies, conferences, and public events.',
                    serviceType: 'Government'
                },
                {
                    icon: 'fa-glass-cheers',
                    title: 'Social Gatherings',
                    description: 'Birthday parties, anniversaries, and other social events planned to perfection.',
                    serviceType: 'Social'
                },
                {
                    icon: 'fa-music',
                    title: 'Festivals & Cultural Events',
                    description: 'Vibrant Holi, Diwali, and other cultural celebration events planned with authentic touches.',
                    serviceType: 'Festival'
                },
                {
                    icon: 'fa-graduation-cap',
                    title: 'Educational Events',
                    description: 'Seminars, workshops, and educational conferences organized with precision.',
                    serviceType: 'Educational'
                }
            ],
            videos: [
                {
                    url: 'public/videos/दिव्यांग क्रीडा स्पर्धा.mp4',
                    title: 'दिव्यांग क्रीडा स्पर्धा',
                    description: 'Government organized sports event for differently-abled individuals'
                },
                {
                    url: 'public/videos/FSSAI goverment event.mp4',
                    title: 'FSSAI Government Event',
                    description: 'Government organized food safety and standards event'
                },
                {
                    url: 'public/videos/1st IN Nagpur genie and aladdin.mp4',
                    title: 'Nagpur 1st Genie and Aladdin',
                    description: 'Magical themed event with elaborate decorations and immersive entertainment experience'
                },
                {
                    url: 'public/videos/jungle theme Birthday party.mp4',
                    title: 'Jungle Theme Birthday Party',
                    description: 'Creative children\'s celebration with jungle-inspired decorations, activities, and entertainment'
                },
                {
                    url: 'public/videos/Suryodaya college Garba event.mp4',
                    title: 'Suryodaya College Garba Event',
                    description: 'Traditional Garba celebration organized at Suryodaya College'
                },
                {
                    url: 'public/videos/suryodaya college youth tech connect event.mp4',
                    title: 'Suryodaya College Youth Tech Connect',
                    description: 'Engineering and Technology summit featuring innovative student projects and industry experts'
                }
            ]
        };
        
        // Array to hold subscribers
        this.subscribers = [];
    }
    
    /**
     * Add a subscriber to state changes
     * @param {Function} callback Function to call when state changes
     */
    subscribe(callback) {
        if (typeof callback === 'function' && !this.subscribers.includes(callback)) {
            this.subscribers.push(callback);
        }
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }
    
    /**
     * Update the state
     * @param {Object} newState New state object to merge with current state
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    }
    
    /**
     * Get the current state
     * @returns {Object} Current state
     */
    getState() {
        return { ...this.state };
    }
    
    /**
     * Notify all subscribers of state change
     */
    notify() {
        this.subscribers.forEach(callback => callback(this.state));
    }
    
    /**
     * Select a service
     * @param {String} serviceType The type of service selected
     */
    selectService(serviceType) {
        this.setState({ selectedService: serviceType });
        
        // Scroll to contact section
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            window.scrollTo({
                top: contactSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        
        // Set the event type in the contact form
        const eventTypeField = document.getElementById('eventType');
        if (eventTypeField) {
            eventTypeField.value = serviceType;
        }
    }
    
    /**
     * Update form data
     * @param {Object} formData Form data object
     */
    updateFormData(formData) {
        this.setState({ formData });
    }
}

// Create and expose the singleton instance
window.appState = new AppState(); 