// Add destination page specific class to body
document.body.classList.add('destination-page');

// Function to load configuration
async function loadConfig() {
    // First try to get from localStorage (set by index page)
    const storedConfig = localStorage.getItem('siteConfig');
    if (storedConfig) {
        return JSON.parse(storedConfig);
    }
    
    // If not in localStorage, fetch from file
    try {
        const response = await fetch('configuration.json');
        if (!response.ok) {
            throw new Error('Failed to load configuration');
        }
        const config = await response.json();
        return config;
    } catch (error) {
        console.error('Error loading configuration:', error);
        // Return default config as fallback
        return {
            title: "Our Photo Gallery",
            message: "Enjoy our beautiful memories together",
            colors: {
                primary: "#FF1493",
                primaryLight: "#FF69B4",
                textDark: "#333",
                textLight: "white",
                bgLight: "#f8f8f8"
            },
            imagesPath: "images/",
            imageExtension: ".jpg",
            defaultImageCount: 7,
            heartColor: "#FF1493",
        };
    }
}

// Apply configuration to the page
async function applyConfiguration() {
    const config = await loadConfig();
    
    // Update page title and message
    document.title = config.title || document.title;
    
    const titleElement = document.getElementById('gallery-title');
    if (titleElement) titleElement.textContent = config.title || titleElement.textContent;
    
    const messageElement = document.getElementById('gallery-message');
    if (messageElement) messageElement.textContent = config.message || messageElement.textContent;
    
    // Update colors using CSS variables
    const root = document.documentElement;
    if (config.colors) {
        for (const [key, value] of Object.entries(config.colors)) {
            root.style.setProperty(`--${key}`, value);
        }
        
        // Update shadow rules with the primary color
        updateShadowRules(config.colors.primary);
    }
    
    // Update heart color
    updateHeartSVG(config.heartColor || "#FF1493");
    
    return config;
}

// Function to update heart SVG color
function updateHeartSVG(color) {
    const encodedColor = encodeURIComponent(color);
    const heartSVG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${encodedColor}'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>`;
    
    // Update the CSS for heart elements
    const style = document.createElement('style');
    style.textContent = `.heart { background: url("${heartSVG}") no-repeat center center; }`;
    document.head.appendChild(style);
}

function updateShadowRules(primaryColor) {
    // Create a style element for our custom shadow rules
    const shadowStyle = document.createElement('style');
    shadowStyle.textContent = `
        .submit-btn:hover {
            box-shadow: 0 5px 15px ${primaryColor}66; /* 40% opacity */
        }
        
        .image-card:hover {
            box-shadow: 0 10px 20px ${primaryColor}4D; /* 30% opacity */
        }
        
        .btn:hover {
            box-shadow: 0 10px 20px ${primaryColor}99; /* 60% opacity */
        }
    `;
    document.head.appendChild(shadowStyle);
}

// Function to create image gallery dynamically using config
async function createImageGallery() {
    const config = await loadConfig();
    const galleryGrid = document.getElementById('gallery-grid');
    
    // Get gallery settings from config
    const imagesPath = config.imagesPath || 'images/';
    const imageExtension = config.imageExtension || '.jpg';
    const imageCount = config.defaultImageCount || 7;
    
    // Create image cards
    for (let i = 1; i <= imageCount; i++) {
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');
        
        // Create image element
        const img = document.createElement('img');
        
        // Set source - using sequential naming (image1.jpg, image2.jpg, etc.)
        const imageName = `image${i}${imageExtension}`;
        img.src = `${imagesPath}${imageName}`;
        
        // Set fallback for missing images
        img.onerror = function() {
            this.src = '/api/placeholder/400/300';
            this.alt = 'Image placeholder';
        };
        
        img.alt = `Memory ${i}`;
        
        // Create caption
        const caption = document.createElement('div');
        caption.classList.add('image-caption');
        
        const title = document.createElement('h3');
        title.textContent = `Moment ${i}`;
        
        // Append elements
        caption.appendChild(title);
        imageCard.appendChild(img);
        imageCard.appendChild(caption);
        
        // Add to grid
        galleryGrid.appendChild(imageCard);
    }
}

// Tạo hiệu ứng trái tim bay
function createHearts() {
    const heartsContainer = document.getElementById('hearts');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 3) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }
    
    // Tạo 15 trái tim ban đầu
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 300);
    }
    
    // Tiếp tục tạo trái tim mỗi 500ms
    setInterval(createHeart, 500);
}

// Function to check if the element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to handle lazy loading of images
function lazyLoadImages() {
    const images = document.querySelectorAll('.image-card img');
    
    images.forEach(img => {
        if (isInViewport(img) && !img.dataset.loaded) {
            img.dataset.loaded = true;
            
            // Add a small animation when the image loads
            img.addEventListener('load', function() {
                this.style.animation = 'fadeIn 0.5s';
            });
        }
    });
}

// Add an animation for fading in
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize everything when page loads
window.onload = async function() {
    await applyConfiguration();
    await createImageGallery();
    createHearts();
    
    // Setup lazy loading
    lazyLoadImages();
    window.addEventListener('scroll', lazyLoadImages);
    window.addEventListener('resize', lazyLoadImages);
};