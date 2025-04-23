// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation to work cards when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Only observe work cards if they exist
const workCards = document.querySelectorAll('.work-card');
if (workCards.length > 0) {
    workCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            nav.style.backgroundColor = 'white';
        }
    }
});

// Profile Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const profilePic = document.getElementById('profilePic');
    const popup = document.getElementById('profilePopup');
    const closePopup = document.querySelector('.close-popup');

    // Open popup when clicking on profile picture or question mark
    profilePic.addEventListener('click', function() {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
    });

    // Close popup when clicking on close button
    closePopup.addEventListener('click', function() {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close popup when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.classList.contains('active')) {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Add hover effect to profile picture
    let timeout;
    profilePic.addEventListener('mousemove', function(e) {
        if (timeout) clearTimeout(timeout);
        
        const { left, top, width, height } = this.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        const tiltX = (y - 0.5) * 10;
        const tiltY = (x - 0.5) * 10;
        
        this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    profilePic.addEventListener('mouseleave', function() {
        timeout = setTimeout(() => {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }, 100);
    });
});

// Chat Interface Functions
const chatMessages = document.getElementById('chatMessages');

function addMessage(message, isBot = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'message-bot' : 'message-user'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return messageDiv;
}

function addOptions(parentMessage) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'chat-options-container';
    
    const options = [
        { icon: '👤', text: 'About Me', action: showAboutMe },
        { icon: '⭐', text: 'My Skills', action: showSkills },
        { icon: '❤️', text: 'My Interests', action: showInterests },
        { icon: '📱', text: 'Contact Me', action: showContact }
    ];

    options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.className = 'chat-option-inline';
        optionButton.innerHTML = `${option.icon} ${option.text}`;
        optionButton.addEventListener('click', () => {
            // Add user's selection as a message
            addMessage(option.text, false);
            // Call the corresponding action
            option.action();
            // Remove the options after selection
            optionsContainer.remove();
        });
        optionsContainer.appendChild(optionButton);
    });

    parentMessage.appendChild(optionsContainer);
}

function showWelcomeMessage() {
    const welcomeMsg = addMessage("Hello! It's lovely to see you here 😊 What would you like to know about me?");
    addOptions(welcomeMsg);
}

function showAboutMe() {
    addMessage('I am a Product Manager with experience in building innovative solutions. I am passionate about creating products that make a difference.');
    setTimeout(() => {
        const followUpMsg = addMessage("Would you like to know more about me?");
        addOptions(followUpMsg);
    }, 1000);
}

function showSkills() {
    const skills = [
        '✨ Product Strategy',
        '🔍 User Research',
        '📊 Data Analytics',
        '👥 Team Leadership',
        '🎯 Agile Management'
    ];
    
    skills.forEach((skill, index) => {
        setTimeout(() => addMessage(skill), index * 500);
    });

    setTimeout(() => {
        const followUpMsg = addMessage("What else would you like to know?");
        addOptions(followUpMsg);
    }, (skills.length + 1) * 500);
}

function showInterests() {
    addMessage('My Interests:');
    const interests = [
        '📚 Technology Trends',
        '🎨 User Experience Design',
        '🌱 Sustainable Innovation'
    ];

    interests.forEach((interest, index) => {
        setTimeout(() => addMessage(interest), (index + 1) * 500);
    });

    setTimeout(() => {
        const followUpMsg = addMessage("Anything else you'd like to explore?");
        addOptions(followUpMsg);
    }, (interests.length + 2) * 500);
}

function showContact() {
    addMessage('Get in touch with me:');
    setTimeout(() => addMessage('📧 Email: your.email@example.com'), 500);
    setTimeout(() => addMessage('🔗 LinkedIn: linkedin.com/in/yourprofile'), 1000);
    
    setTimeout(() => {
        const followUpMsg = addMessage("Would you like to know anything else?");
        addOptions(followUpMsg);
    }, 1500);
}

// Initialize chat when page loads
document.addEventListener('DOMContentLoaded', () => {
    showWelcomeMessage();
}); 