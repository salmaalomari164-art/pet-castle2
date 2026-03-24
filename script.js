// Welcome notification when entering the site
document.addEventListener('DOMContentLoaded', function() {
    // Show welcome notification
    setTimeout(function() {
        showWelcomeNotification();
    }, 1000);
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize contact form
    initializeContactForm();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize gallery interactions
    initializeGallery();
    
    // Initialize language switching
    initializeLanguageSwitching();
});

// Language switching functionality
function initializeLanguageSwitching() {
    const languageToggle = document.getElementById('languageToggle');
    let currentLanguage = localStorage.getItem('language') || 'ar';
    
    // Set initial language
    setLanguage(currentLanguage);
    
    // Add click event to language toggle
    languageToggle.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
        setLanguage(currentLanguage);
        localStorage.setItem('language', currentLanguage);
        
        // Show language change notification
        showLanguageChangeNotification(currentLanguage);
    });
}

function setLanguage(language) {
    const html = document.documentElement;
    const languageToggle = document.getElementById('languageToggle');
    
    // Update HTML attributes
    if (language === 'en') {
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        languageToggle.setAttribute('title', 'Change Language');
    } else {
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        languageToggle.setAttribute('title', 'تغيير اللغة');
    }
    
    // Update all elements with data attributes
    const elementsWithData = document.querySelectorAll('[data-ar][data-en]');
    elementsWithData.forEach(element => {
        const text = element.getAttribute(`data-${language}`);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = text;
        } else {
            element.textContent = text;
        }
    });
    
    // Update logo text
    const logo = document.querySelector('.logo h1');
    if (logo) {
        if (language === 'en') {
            logo.textContent = '🐕 Loving Homes';
        } else {
            logo.textContent = '🐕 لوفينغ هومز';
        }
    }
}

function showLanguageChangeNotification(language) {
    // Remove existing notification
    const existingNotification = document.querySelector('.language-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'language-notification';
    
    const message = language === 'en' ? 
        'Language changed to English' : 
        'تم تغيير اللغة إلى العربية';
    
    notification.innerHTML = `
        <div class="notification-content">
            <p>${message}</p>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(-20px);
        background: var(--primary-brown);
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        box-shadow: 0 5px 20px rgba(107, 68, 35, 0.3);
        z-index: 10000;
        opacity: 0;
        transition: all 0.3s ease;
        font-weight: 500;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(function() {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';
    }, 10);
    
    // Remove after 2 seconds
    setTimeout(function() {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(function() {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Welcome notification function
function showWelcomeNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'welcome-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <h3>🐕 مرحباً بك في لوفينغ هومز!</h3>
            <p>فندق العناية بالكلاب الأول - بيئة آمنة ومريحة لأصدقائك الصغار</p>
            <button class="notification-close">حسناً</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--very-light-brown);
        color: var(--primary-brown);
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(107, 68, 35, 0.3);
        z-index: 10000;
        max-width: 350px;
        transform: translateX(400px);
        transition: transform 0.5s ease;
        direction: rtl;
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        text-align: center;
    `;
    
    const notificationTitle = notification.querySelector('h3');
    notificationTitle.style.cssText = `
        margin-bottom: 10px;
        font-size: 1.2rem;
    `;
    
    const notificationText = notification.querySelector('p');
    notificationText.style.cssText = `
        margin-bottom: 15px;
        font-size: 0.9rem;
        opacity: 0.9;
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: var(--primary-brown);
        color: white;
        border: none;
        padding: 8px 20px;
        border-radius: 20px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s ease;
    `;
    
    closeButton.addEventListener('mouseenter', function() {
        this.style.background = 'var(--light-brown)';
        this.style.color = 'white';
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.background = 'var(--primary-brown)';
        this.style.color = 'white';
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(function() {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto close after 8 seconds
    setTimeout(function() {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(function() {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }
    }, 8000);
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            // Validate form
            if (!name || !email || !message) {
                showFormMessage('يرجى ملء جميع الحقول المطلوبة', 'error');
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('يرجى إدخال بريد إلكتروني صحيح', 'error');
                return;
            }
            
            // Simulate form submission
            showFormMessage('جاري إرسال رسالتك...', 'info');
            
            setTimeout(function() {
                showFormMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
                contactForm.reset();
            }, 2000);
        });
    }
}

// Show form message
function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = 'form-message';
    messageElement.textContent = message;
    
    // Style based on type
    let bgColor, textColor;
    switch(type) {
        case 'success':
            bgColor = '#27ae60';
            textColor = 'white';
            break;
        case 'error':
            bgColor = '#e74c3c';
            textColor = 'white';
            break;
        case 'info':
            bgColor = '#3498db';
            textColor = 'white';
            break;
        default:
            bgColor = '#34495e';
            textColor = 'white';
    }
    
    messageElement.style.cssText = `
        background: ${bgColor};
        color: ${textColor};
        padding: 15px;
        border-radius: 10px;
        margin: 15px 0;
        text-align: center;
        animation: slideIn 0.3s ease;
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Insert after form title
    const contactForm = document.getElementById('contactForm');
    const formTitle = contactForm.querySelector('h3');
    formTitle.parentNode.insertBefore(messageElement, formTitle.nextSibling);
    
    // Auto remove after 5 seconds
    setTimeout(function() {
        if (messageElement.parentNode) {
            messageElement.remove();
        }
    }, 5000);
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.facility-card, .package-card, .gallery-item, .contact-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Gallery interactions
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery-overlay p').textContent;
            
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <div class="lightbox-caption">${overlay}</div>
                    <button class="lightbox-close">&times;</button>
                </div>
            `;
            
            // Style lightbox
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.9);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            const lightboxContent = lightbox.querySelector('.lightbox-content');
            lightboxContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
                text-align: center;
            `;
            
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.cssText = `
                max-width: 100%;
                max-height: 80vh;
                border-radius: 10px;
            `;
            
            const lightboxCaption = lightbox.querySelector('.lightbox-caption');
            lightboxCaption.style.cssText = `
                color: white;
                margin-top: 15px;
                font-size: 1.1rem;
            `;
            
            const closeButton = lightbox.querySelector('.lightbox-close');
            closeButton.style.cssText = `
                position: absolute;
                top: -40px;
                right: 0;
                background: none;
                border: none;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                transition: transform 0.3s ease;
            `;
            
            // Add to page and animate
            document.body.appendChild(lightbox);
            setTimeout(function() {
                lightbox.style.opacity = '1';
            }, 10);
            
            // Close functionality
            function closeLightbox() {
                lightbox.style.opacity = '0';
                setTimeout(function() {
                    document.body.removeChild(lightbox);
                }, 300);
            }
            
            closeButton.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // Close with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            });
        });
    });
}

// Package selection functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') && e.target.textContent.includes('اختر الحزمة')) {
        const packageCard = e.target.closest('.package-card');
        const packageName = packageCard.querySelector('h3').textContent;
        
        // Create selection notification
        const notification = document.createElement('div');
        notification.className = 'package-selection';
        notification.innerHTML = `
            <div class="selection-content">
                <h3>✅ تم اختيار الحزمة</h3>
                <p>لقد اخترت: ${packageName}</p>
                <p>سنتواصل معك قريباً لتأكيد التفاصيل</p>
                <button class="selection-close">حسناً</button>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: white;
            color: #2c3e50;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            z-index: 10000;
            text-align: center;
            opacity: 0;
            transition: all 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(function() {
            notification.style.opacity = '1';
            notification.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
        
        const closeBtn = notification.querySelector('.selection-close');
        closeBtn.style.cssText = `
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 25px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 15px;
        `;
        
        closeBtn.addEventListener('click', function() {
            notification.style.opacity = '0';
            notification.style.transform = 'translate(-50%, -50%) scale(0.8)';
            setTimeout(function() {
                document.body.removeChild(notification);
            }, 300);
        });
        
        // Auto close after 4 seconds
        setTimeout(function() {
            if (document.body.contains(notification)) {
                notification.style.opacity = '0';
                notification.style.transform = 'translate(-50%, -50%) scale(0.8)';
                setTimeout(function() {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, 4000);
    }
});

// Add scroll to top button
function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '⬆️';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        background: #3498db;
        color: white;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollButton.addEventListener('mouseenter', function() {
        this.style.background = '#2c3e50';
        this.style.transform = 'scale(1.1)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.background = '#3498db';
        this.style.transform = 'scale(1)';
    });
}

// Initialize scroll to top button
addScrollToTopButton();
