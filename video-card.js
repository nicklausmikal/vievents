/**
 * VideoCard Component
 * A custom element for displaying a video with title and description
 */
class VideoCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Set default values
        this._videoUrl = '';
        this._title = '';
        this._description = '';
    }
    
    // Define which attributes to observe
    static get observedAttributes() {
        return ['video-url', 'title', 'description'];
    }
    
    // Handle attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        
        switch (name) {
            case 'video-url':
                this._videoUrl = newValue || '';
                break;
            case 'title':
                this._title = newValue || '';
                break;
            case 'description':
                this._description = newValue || '';
                break;
        }
        
        this.render();
    }
    
    // Component connected to DOM
    connectedCallback() {
        this.render();
        
        // Add event listeners after rendering
        setTimeout(() => {
            this._setupVideoInteraction();
        }, 100);
    }
    
    // Render the component
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    margin: 0;
                    padding: 0;
                }
                
                .video-item {
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                    background-color: #fff;
                    transition: all 0.3s ease;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    position: relative;
                }
                
                .video-item:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                }
                
                .video-item:hover .video-info {
                    background: linear-gradient(to right, #f5f5f7, #fff);
                }
                
                .video-container {
                    position: relative;
                    width: 100%;
                    padding-top: 56.25%; /* 16:9 Aspect Ratio */
                    overflow: hidden;
                    background: #000;
                }
                
                video {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.5s ease, filter 0.3s ease;
                }
                
                video:not(.playing) {
                    filter: brightness(0.7) contrast(1.1);
                }
                
                .video-item:hover video:not(.playing) {
                    transform: scale(1.05);
                    filter: brightness(0.9) contrast(1.1);
                }
                
                .video-info {
                    padding: 2rem;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    transition: background 0.3s ease;
                }
                
                .video-info h3 {
                    color: #1D1160;
                    margin-bottom: 0.5rem;
                    font-size: 1.5rem;
                    transition: color 0.3s ease;
                }
                
                .video-item:hover .video-info h3 {
                    color: #D4145A;
                }
                
                .video-info p {
                    color: #666;
                    margin-bottom: 1rem;
                    transition: color 0.3s ease;
                }
                
                .video-item:hover .video-info p {
                    color: #333;
                }
                
                .play-button {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 80px;
                    height: 80px;
                    background-color: rgba(212, 20, 90, 0.8);
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    z-index: 2;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                }
                
                .play-button:hover {
                    background-color: rgba(248, 193, 68, 0.9);
                    transform: translate(-50%, -50%) scale(1.1);
                    box-shadow: 0 8px 25px rgba(248, 193, 68, 0.4);
                }
                
                .play-button::after {
                    content: '';
                    width: 0;
                    height: 0;
                    border-top: 15px solid transparent;
                    border-bottom: 15px solid transparent;
                    border-left: 25px solid white;
                    margin-left: 5px;
                    transition: transform 0.3s ease;
                }
                
                .play-button:hover::after {
                    transform: scale(1.1);
                }
                
                .video-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6));
                    opacity: 1;
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                }
                
                .video-badge {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background-color: rgba(212, 20, 90, 0.8);
                    color: white;
                    padding: 5px 12px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: bold;
                    z-index: 3;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                }
                
                .video-duration {
                    position: absolute;
                    bottom: 15px;
                    right: 15px;
                    background-color: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 3px 8px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    z-index: 3;
                }
                
                video::-webkit-media-controls {
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
                
                video.playing::-webkit-media-controls {
                    opacity: 1;
                }
                
                video.playing + .play-button,
                video.playing ~ .video-overlay,
                video.playing ~ .video-badge,
                video.playing ~ .video-duration {
                    opacity: 0;
                    pointer-events: none;
                }
            </style>
            
            <div class="video-item">
                <div class="video-container">
                    <video src="${this._videoUrl}" preload="metadata" muted></video>
                    <div class="play-button"></div>
                    <div class="video-overlay"></div>
                    <div class="video-badge">${this._getEventType()}</div>
                    <div class="video-duration">${this._getVideoDuration()}</div>
                </div>
                <div class="video-info">
                    <div>
                        <h3>${this._title}</h3>
                        <p>${this._description}</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Helper method to get the event type for the badge
    _getEventType() {
        // Simple logic based on the title of the video
        const title = this._title || '';
        const description = this._description || '';
        
        if (title.includes('दिव्यांग क्रीडा स्पर्धा')) return 'Government';
        if (title.includes('FSSAI')) return 'Government';
        if (title.includes('Garba')) return 'Cultural';
        if (title.includes('Haldi')) return 'Wedding';
        if (title.includes('Genie') || title.includes('Aladdin')) return 'Theme Event';
        if (title.includes('Birthday')) return 'Birthday';
        if (title.includes('Tech Connect')) return 'Tech Event';
        if (title.includes('Corporate')) return 'Corporate';
        if (title.includes('Tech')) return 'Tech';
        if (title.includes('Festival') || title.includes('Cultural')) return 'Cultural';
        if (title.includes('Charity')) return 'Charity';
        if (title.includes('Social')) return 'Social';
        if (title.includes('Education') || title.includes('Workshop')) return 'Education';
        if (title.includes('Government')) return 'Government';
        if (title.includes('Award')) return 'Awards';
        
        // Check description if title didn't match
        if (description.includes('government')) return 'Government';
        if (description.includes('wedding')) return 'Wedding';
        if (description.includes('cultural')) return 'Cultural';
        if (description.includes('tech')) return 'Tech';
        
        return 'Event';
    }
    
    // Helper method to get a placeholder duration
    _getVideoDuration() {
        return '0:00'; // This will be updated with the actual duration when the video metadata loads
    }

    // Set up hover and play interactions
    _setupVideoInteraction() {
        const videoContainer = this.shadowRoot.querySelector('.video-container');
        const video = this.shadowRoot.querySelector('video');
        const playButton = this.shadowRoot.querySelector('.play-button');
        
        if (videoContainer && video && playButton) {
            // Set up metadata loading to get actual duration
            video.addEventListener('loadedmetadata', () => {
                const duration = Math.round(video.duration);
                const minutes = Math.floor(duration / 60);
                const seconds = duration % 60;
                const durationElement = this.shadowRoot.querySelector('.video-duration');
                if (durationElement) {
                    durationElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
                }
            });
            
            // Hover effects
            videoContainer.addEventListener('mouseenter', () => {
                video.muted = true;
                video.play().catch(err => console.log('Autoplay prevented:', err));
                video.classList.add('playing');
            });
            
            videoContainer.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
                video.classList.remove('playing');
            });
            
            // Click to play with sound
            playButton.addEventListener('click', (e) => {
                e.stopPropagation();
                if (video.paused) {
                    video.muted = false;
                    video.play();
                    video.classList.add('playing');
                } else {
                    video.pause();
                    video.classList.remove('playing');
                }
            });
            
            // Video end event
            video.addEventListener('ended', () => {
                video.classList.remove('playing');
            });
        }
    }
}

// Define the custom element
customElements.define('video-card', VideoCard); 