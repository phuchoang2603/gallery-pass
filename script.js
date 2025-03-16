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
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('passwordModal');
    const loveButton = document.getElementById('loveButton');
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    
    // Mật khẩu
    const correctPassword = "22";
    
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
});

// Chạy hàm tạo trái tim khi trang tải xong
window.onload = createHearts;