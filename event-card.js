class EventCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Default values
        this._icon = 'star';
        this._title = 'Event Title';
        this._description = 'Event Description';
        this._serviceType = 'Event';
    }
    
    // Define which attributes to observe
    static get observedAttributes() {
        return ['icon', 'title', 'description', 'service-type'];
    }
    
    // Handle attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        
        switch (name) {
            case 'icon':
                this._icon = newValue;
                break;
            case 'title':
                this._title = newValue;
                break;
            case 'description':
                this._description = newValue;
                break;
            case 'service-type':
                this._serviceType = newValue;
                break;
        }
        
        this.render();
    }
    
    // Component connected to DOM
    connectedCallback() {
        this.render();
    }
    
    // Render the component
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }
                
                .service-card {
                    background-color: #fff;
                    border-radius: 15px;
                    overflow: hidden;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                    transition: all 0.3s ease;
                    padding: 2.5rem 2rem;
                    text-align: center;
                    border-bottom: 5px solid transparent;
                    position: relative;
                }
                
                .service-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 5px;
                    background: linear-gradient(to right, #F8C144, #FFD700);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.5s ease;
                }
                
                .service-card:hover {
                    transform: translateY(-15px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                    border-bottom: 5px solid #F8C144;
                }
                
                .service-card:hover::before {
                    transform: scaleX(1);
                }
                
                .service-icon {
                    width: 90px;
                    height: 90px;
                    background: linear-gradient(135deg, #D4145A, #1D1160);
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 0 auto 1.8rem;
                    color: #fff;
                    font-size: 2.2rem;
                    box-shadow: 0 10px 20px rgba(212, 20, 90, 0.3);
                }
                
                h3 {
                    margin-bottom: 1rem;
                    color: #1D1160;
                    font-size: 1.5rem;
                }
                
                p {
                    margin-bottom: 1.8rem;
                    color: #666;
                }
                
                .btn-service {
                    display: inline-block;
                    padding: 0.6rem 1.5rem;
                    background-color: #1D1160;
                    color: #fff;
                    border-radius: 30px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    box-shadow: 0 5px 15px rgba(29, 17, 96, 0.2);
                    text-decoration: none;
                    cursor: pointer;
                }
                
                .btn-service:hover {
                    background-color: #D4145A;
                    transform: translateY(-3px);
                    box-shadow: 0 8px 20px rgba(212, 20, 90, 0.3);
                }
            </style>
            
            <div class="service-card">
                <div class="service-icon">
                    <i class="fas fa-${this._icon}"></i>
                </div>
                <h3>${this._title}</h3>
                <p>${this._description}</p>
                <a href="#contact" class="btn-service" id="bookBtn">Book Now</a>
            </div>
        `;
        
        // Add event listener to the button
        this.shadowRoot.getElementById('bookBtn').addEventListener('click', () => {
            // Create and dispatch a custom event
            const event = new CustomEvent('book-service', {
                bubbles: true,
                composed: true, // Allows the event to cross the shadow DOM boundary
                detail: {
                    serviceType: this._serviceType
                }
            });
            this.dispatchEvent(event);
            
            // Scroll to contact section
            document.querySelector('#contact').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
}

// Define the custom element
customElements.define('event-card', EventCard); 