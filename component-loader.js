/**
 * Component Loader
 * Dynamically loads and initializes all web components
 */
document.addEventListener('DOMContentLoaded', () => {
    // Function to load a script asynchronously
    const loadScript = (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
            
            document.head.appendChild(script);
        });
    };
    
    // Function to initialize components after scripts are loaded
    const initializeComponents = () => {
        // Check if appState was successfully loaded
        if (!window.appState) {
            console.error('AppState not loaded');
            return;
        }
        
        initializeServices();
        initializeVideos();
        initializePortfolio();
        setupEventListeners();
    };
    
    // Function to initialize services
    const initializeServices = () => {
        const servicesContainer = document.getElementById('services-container');
        if (!servicesContainer) return;
        
        const { events } = window.appState.getState();
        
        events.forEach(event => {
            const eventCard = document.createElement('event-card');
            eventCard.setAttribute('icon', event.icon);
            eventCard.setAttribute('title', event.title);
            eventCard.setAttribute('description', event.description);
            eventCard.setAttribute('service-type', event.serviceType);
            servicesContainer.appendChild(eventCard);
        });
    };
    
    // Function to initialize videos
    const initializeVideos = () => {
        const videosContainer = document.getElementById('videos-container');
        if (!videosContainer) return;
        
        const { videos } = window.appState.getState();
        
        videos.forEach(video => {
            const videoCard = document.createElement('video-card');
            videoCard.setAttribute('video-url', video.url);
            videoCard.setAttribute('title', video.title);
            videoCard.setAttribute('description', video.description);
            videosContainer.appendChild(videoCard);
        });
    };
    
    // Function to initialize portfolio section with videos
    const initializePortfolio = () => {
        const portfolioContainer = document.getElementById('portfolio-container');
        if (!portfolioContainer) return;
        
        const { videos } = window.appState.getState();
        
        videos.forEach(video => {
            const videoCard = document.createElement('video-card');
            videoCard.setAttribute('video-url', video.url);
            videoCard.setAttribute('title', video.title);
            videoCard.setAttribute('description', video.description);
            portfolioContainer.appendChild(videoCard);
        });
    };
    
    // Function to set up event listeners
    const setupEventListeners = () => {
        document.addEventListener('book-service', (event) => {
            if (event.detail && event.detail.serviceType) {
                window.appState.selectService(event.detail.serviceType);
            }
        });
    };
    
    // Load all component scripts in order
    Promise.all([
        loadScript('components/app-state.js'),
        loadScript('components/event-card.js'),
        loadScript('components/video-card.js')
    ])
    .then(() => {
        console.log('All components loaded successfully');
        initializeComponents();
    })
    .catch((error) => {
        console.error('Failed to load components:', error);
    });
}); 