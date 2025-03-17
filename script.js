// Function to load configuration
async function loadConfig() {
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
            mainTitle: "Our Photo Gallery",
            mainMessage: "Enjoy our beautiful memories together",
            desTitle: "Our Photo Gallery",
            desMessage: "Enjoy our beautiful memories together",
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
            passwordHint: "Enter the password",
            errorMessage: "Incorrect password. Please try again.",
            correctPassword: "22"
        };
    }
}

// Apply configuration to the page
async function applyConfiguration() {
    const config = await loadConfig();
    
    // Update page title and message
    document.title = config.mainTitle || document.title;
    
    const titleElement = document.querySelector('h1');
    if (titleElement) titleElement.textContent = config.mainTitle || titleElement.textContent;
    
    const messageElement = document.querySelector('.message');
    if (messageElement) messageElement.textContent = config.mainMessage || messageElement.textContent;
    
    // Update password hint and password
    const passwordHintElement = document.querySelector('.password-hint');
    if (passwordHintElement) passwordHintElement.textContent = config.passwordHint || passwordHintElement.textContent;

    // Update error message
    const errorMessageElement = document.querySelector('.error-message');
    if (errorMessageElement) errorMessageElement.textContent = config.errorMessage || errorMessageElement.textContent;
    
    // Update modal title
    const passwordTitleElement = document.querySelector('.password-title');
    if (passwordTitleElement) passwordTitleElement.textContent = config.mainTitle || passwordTitleElement.textContent;
    
    // Update colors using CSS variables
    const root = document.documentElement;
    if (config.colors) {
        for (const [key, value] of Object.entries(config.colors)) {
            root.style.setProperty(`--${key}`, value);
        }
        
        // Update shadow rules with the primary color
        updateShadowRules(config.colors.primary);
    }

    // Apply background image
    applyBackgroundImage(config);
    
    // Update heart color
    updateHeartSVG(config.heartColor || config.colors.primary || "#FF1493");
    
    // Store config in localStorage for use in destination page
    localStorage.setItem('siteConfig', JSON.stringify(config));
    
    return config;
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

// Function to apply background image
function applyBackgroundImage(config) {
    // Check if background image is specified in config
    if (config.backgroundImage) {
        document.body.style.backgroundImage = `url('${config.backgroundImage}')`;
    } else {
        // Use default background if not specified
        document.body.style.backgroundImage = "url('images/background.jpg')";
    }
    
    // Apply additional background properties
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
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

// Xử lý mật khẩu
document.addEventListener('DOMContentLoaded', async function() {
    // First load configuration
    const config = await applyConfiguration();
    
    const modal = document.getElementById('passwordModal');
    const loveButton = document.getElementById('loveButton');
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    
    // Use password from configuration
    const correctPassword = config.correctPassword || "22";
    
    // Khi bấm nút "Press here"
    loveButton.addEventListener('click', function() {
        modal.style.display = 'block';
        passwordInput.focus();
    });
    
    // Khi click ra ngoài modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Khi submit form mật khẩu
    passwordForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        if (passwordInput.value === correctPassword) {
            // Mật khẩu đúng, chuyển đến trang đích mới
            window.location.href = "destination.html";
        } else {
            // Mật khẩu sai, hiện thông báo lỗi
            errorMessage.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
            
            // Ẩn thông báo lỗi sau 3 giây
            setTimeout(function() {
                errorMessage.style.display = 'none';
            }, 3000);
        }
    });
    
    // Start the hearts animation
    createHearts();
});