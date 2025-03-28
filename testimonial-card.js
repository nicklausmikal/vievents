class TestimonialCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Default values
        this._quote = 'This is a testimonial';
        this._name = 'Client Name';
        this._title = 'Client Title';
        this._image = '';
    }
    
    // Define which attributes to observe
    static get observedAttributes() {
        return ['quote', 'name', 'title', 'image'];
    }
    
    // Handle attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        
        switch (name) {
            case 'quote':
                this._quote = newValue;
                break;
            case 'name':
                this._name = newValue;
                break;
            case 'title':
                this._title = newValue;
                break;
            case 'image':
                this._image = newValue;
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
                    min-width: 300px;
                    scroll-snap-align: start;
                }
                
                .testimonial-content {
                    background-color: rgba(255, 255, 255, 0.1);
                    padding: 2.5rem;
                    border-radius: 15px;
                    position: relative;
                    backdrop-filter: blur(5px);
                    -webkit-backdrop-filter: blur(5px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    transition: all 0.3s ease;
                    color: white;
                }
                
                .testimonial-content:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
                }
                
                .testimonial-content::before {
                    content: '"';
                    font-size: 6rem;
                    position: absolute;
                    top: -20px;
                    left: 10px;
                    color: rgba(255, 255, 255, 0.1);
                    font-family: Georgia, serif;
                }
                
                .testimonial-author {
                    margin-top: 1.5rem;
                    display: flex;
                    align-items: center;
                }
                
                .testimonial-author-img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    margin-right: 15px;
                    border: 2px solid #F8C144;
                    object-fit: cover;
                }
                
                .testimonial-author-info {
                    flex: 1;
                }
                
                h4 {
                    font-size: 1.2rem;
                    margin-bottom: 0.2rem;
                    margin-top: 0;
                }
                
                p {
                    margin: 0;
                    line-height: 1.6;
                }
                
                .author-title {
                    font-size: 0.9rem;
                    opacity: 0.8;
                }
                
                .quote {
                    margin-bottom: 1.5rem;
                }
            </style>
            
            <div class="testimonial-content">
                <p class="quote">"${this._quote}"</p>
                <div class="testimonial-author">
                    ${this._image ? `<img src="${this._image}" alt="${this._name}" class="testimonial-author-img">` : ''}
                    <div class="testimonial-author-info">
                        <h4>${this._name}</h4>
                        <p class="author-title">${this._title}</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Define the custom element
customElements.define('testimonial-card', TestimonialCard); 