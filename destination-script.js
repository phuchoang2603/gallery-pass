// Add destination page specific class to body
document.body.classList.add('destination-page');

// Image gallery configuration
const galleryConfig = {
    imagesPath: 'images/', // Path to the images folder
    imageExtension: '.jpg', // Default image extension
    imagesPerRow: 4, // This will be handled by CSS grid now
    defaultImageCount: 7, // Default number of images to show
    imageNames: [] // Will be populated dynamically or from a predefined list
};

// Function to create image cards dynamically
function createImageGallery() {
    const galleryGrid = document.getElementById('gallery-grid');
    
    // Either use a predefined list of images or generate sequentially named images
    // For this example, we'll use sequential naming (image1.jpg, image2.jpg, etc.)
    
    // If you want to use specific named images, uncomment and modify this:
    // galleryConfig.imageNames = ['vacation1', 'birthday', 'anniversary', 'party', ...];
    
    // Determine how many images to display
    const imageCount = galleryConfig.defaultImageCount;
    
    // Create image cards
    for (let i = 1; i <= imageCount; i++) {
        const imageCard = document.createElement('div');
        imageCard.classList.add('image-card');
        
        // Create image element
        const img = document.createElement('img');
        
        // Set source - using sequential naming (image1.jpg, image2.jpg, etc.)
        const imageName = `image${i}${galleryConfig.imageExtension}`;
        img.src = `${galleryConfig.imagesPath}${imageName}`;
        
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

// Tạo hiệu ứng trái tim bay giống như trang index
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

// Chạy các hàm khi trang tải xong
window.onload = function() {
    createImageGallery();
    createHearts();
    
    // Setup lazy loading
    lazyLoadImages();
    window.addEventListener('scroll', lazyLoadImages);
    window.addEventListener('resize', lazyLoadImages);
};