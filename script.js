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

// Add interaction tracking
const userInteractions = {
    education: 0,
    work: 0,
    accomplishments: 0,
    quickIntro: 0,
    connect: 0
};

// Varied responses for repeated interactions
const repeatResponses = {
    education: [
        "Back to education! 📚 Let me show you that beautiful book animation again!",
        "You seem really interested in my education! Here's another look at my academic journey 🎓",
        "Third time's a charm! 🌟 I love your enthusiasm about my education background!",
        "Wow, you're really thorough! 🤓 Let's explore my education path once more!"
    ],
    work: [
        "Let's look at my work experience again! 💼",
        "Back to my professional journey! 🚀 I'm glad you're interested!",
        "You must be really interested in my work! 💫 Happy to show you again!",
        "Another deep dive into my work experience! 🎯 I appreciate your thoroughness!"
    ],
    accomplishments: [
        "Let's celebrate these achievements again! 🏆",
        "Back to the trophy cabinet! ✨ Always happy to share my proudest moments!",
        "Third time looking at accomplishments! 🌟 You're making me blush!",
        "Wow, you really like my achievements! 🎉 Let's review them once more!"
    ],
    quickIntro: [
        "Happy to introduce myself again! 👋",
        "Round two of introductions! 😊 You're very thorough!",
        "Third introduction's the charm! 🌟 You must really want to know me well!",
        "Another intro! 🤝 I appreciate your attention to detail!"
    ],
    connect: [
        "Always happy to connect again! 🤝",
        "Looking for more ways to connect? Let's explore! 🌟",
        "You're really interested in connecting! That's awesome! 💫",
        "I love your enthusiasm for networking! 🎯"
    ]
};

function getResponse(section) {
    const count = userInteractions[section];
    const responses = repeatResponses[section];
    return responses[Math.min(count, responses.length - 1)];
}

function addMessage(message, isBot = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'message-bot' : 'message-user'}`;
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return messageDiv;
}

function showSection(sectionId) {
    document.querySelectorAll('section[id]').forEach(section => {
        if (section.id !== 'home' && section.id !== 'about' && section.id !== 'contact') {
            section.style.display = 'none';
        }
    });
    
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function addOptions(parentMessage) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'chat-options-container';
    
    const options = [
        { icon: '👋', text: 'Quick Intro', action: showQuickIntro, track: 'quickIntro' },
        { icon: '🎓', text: 'Education', action: showEducationSection, track: 'education' },
        { icon: '💼', text: 'Work Experience', action: showWorkSection, track: 'work' },
        { icon: '🏆', text: 'Accomplishments', action: showAccomplishmentsSection, track: 'accomplishments' },
        { icon: '🤝', text: "Let's Connect", action: showConnect, track: 'connect' }
    ];

    options.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.className = 'chat-option-inline';
        optionButton.innerHTML = `${option.icon} ${option.text}`;
        optionButton.addEventListener('click', () => {
            addMessage(option.text, false);
            userInteractions[option.track]++;
            option.action();
            optionsContainer.remove();
        });
        optionsContainer.appendChild(optionButton);
    });

    parentMessage.appendChild(optionsContainer);
}

function showWelcomeMessage() {
    const welcomeMsg = addMessage("Hi there! 👋 I'm Sunil, a Product Manager. How can I help you today?");
    addOptions(welcomeMsg);
}

function showEducationSection() {
    const response = getResponse('education');
    addMessage(response);
    setTimeout(() => {
        showSection('education');
        const followUpMessages = [
            "What aspect of my education interests you the most?",
            "Would you like to know about my other experiences?",
            "Anything specific you'd like to know about my studies?",
            "Feel free to ask me anything about my academic journey!"
        ];
        const followUpMsg = addMessage(followUpMessages[Math.min(userInteractions.education, followUpMessages.length - 1)]);
        addOptions(followUpMsg);
    }, 1000);
}

function showWorkSection() {
    const response = getResponse('work');
    addMessage(response);
    setTimeout(() => {
        showSection('work');
        const followUpMessages = [
            "What would you like to know about my work experience?",
            "Any specific project you'd like to hear about?",
            "I have many interesting work stories - want to hear more?",
            "Always excited to share my professional journey!"
        ];
        const followUpMsg = addMessage(followUpMessages[Math.min(userInteractions.work, followUpMessages.length - 1)]);
        addOptions(followUpMsg);
    }, 1000);
}

function showAccomplishmentsSection() {
    const response = getResponse('accomplishments');
    addMessage(response);
    setTimeout(() => {
        showSection('accomplishments');
        const followUpMessages = [
            "What else would you like to explore?",
            "Which achievement would you like to know more about?",
            "Each achievement has a unique story - interested in any particular one?",
            "Thanks for your interest in my journey!"
        ];
        const followUpMsg = addMessage(followUpMessages[Math.min(userInteractions.accomplishments, followUpMessages.length - 1)]);
        addOptions(followUpMsg);
    }, 1000);
}

function showQuickIntro() {
    const response = getResponse('quickIntro');
    addMessage(response);
    const introMessages = [
        ["🎯 Product Manager with 5+ years of experience",
         "💡 Passionate about user-centric design and innovation",
         "🌱 Currently working on exciting projects in tech"],
        ["✨ Love turning ideas into impactful products",
         "🚀 Experienced in leading cross-functional teams",
         "🎨 Passionate about beautiful, functional design"],
        ["🌟 Specialized in AI-driven products",
         "🤝 Built strong partnerships with industry leaders",
         "📈 Proven track record of successful launches"],
        ["💫 Always learning and growing",
         "🎯 Focus on user-centric solutions",
         "🌱 Passionate about mentoring"]
    ];
    
    const currentIntro = introMessages[Math.min(userInteractions.quickIntro, introMessages.length - 1)];
    currentIntro.forEach((msg, index) => {
        setTimeout(() => addMessage(msg), (index + 1) * 500);
    });
    
    setTimeout(() => {
        const followUpMsg = addMessage("What would you like to know more about?");
        addOptions(followUpMsg);
    }, (currentIntro.length + 1) * 500);
}

function showConnect() {
    const response = getResponse('connect');
    const connectMsg = addMessage(response);
    const connectOptions = [
        { icon: '📧', text: 'Email', action: () => window.location.href = 'mailto:your.email@example.com' },
        { icon: '🔗', text: 'LinkedIn', action: () => window.open('https://linkedin.com/in/yourprofile', '_blank') },
        { icon: '📝', text: 'Download Resume', action: () => window.open('resume.pdf', '_blank') },
        { icon: '📅', text: 'Schedule Meeting', action: showScheduler }
    ];
    
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'chat-options-container';
    
    connectOptions.forEach(option => {
        const optionButton = document.createElement('button');
        optionButton.className = 'chat-option-inline';
        optionButton.innerHTML = `${option.icon} ${option.text}`;
        optionButton.addEventListener('click', () => {
            addMessage(option.text, false);
            option.action();
            optionsContainer.remove();
        });
        optionsContainer.appendChild(optionButton);
    });
    
    connectMsg.appendChild(optionsContainer);
}

function showScheduler() {
    addMessage("You can schedule a meeting with me using my Calendly:");
    setTimeout(() => {
        const meetingMsg = addMessage("Select a meeting type:");
        const meetingOptions = [
            { icon: '☕', text: '15min Coffee Chat', action: () => window.open('your-calendly-link-15min', '_blank') },
            { icon: '💼', text: '30min Business Talk', action: () => window.open('your-calendly-link-30min', '_blank') }
        ];
        
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'chat-options-container';
        
        meetingOptions.forEach(option => {
            const optionButton = document.createElement('button');
            optionButton.className = 'chat-option-inline';
            optionButton.innerHTML = `${option.icon} ${option.text}`;
            optionButton.addEventListener('click', () => {
                addMessage(option.text, false);
                option.action();
                optionsContainer.remove();
            });
            optionsContainer.appendChild(optionButton);
        });
        
        meetingMsg.appendChild(optionsContainer);
    }, 500);
}

// Chat container controls
document.addEventListener('DOMContentLoaded', () => {
    const chatContainer = document.querySelector('.chat-container');
    const chatLauncher = document.querySelector('.chat-launcher');
    const archiveButton = document.querySelector('.archive-chat');
    const launchButton = document.querySelector('.launch-chat-btn');
    const chatHeader = document.querySelector('.chat-header');
    const chatMessages = document.querySelector('.chat-messages');

    // Initialize chat
    showWelcomeMessage();

    // Archive button functionality
    archiveButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent header click event
        chatContainer.classList.add('minimized');
        chatMessages.style.display = 'none';
    });

    // Launch button functionality
    launchButton.addEventListener('click', () => {
        chatLauncher.style.display = 'none';
        chatContainer.classList.remove('minimized');
        chatMessages.style.display = 'block';
    });

    // Minimize/Maximize on header click
    chatHeader.addEventListener('click', (e) => {
        // Only toggle if not clicking archive button
        if (!e.target.closest('.archive-chat')) {
            if (chatContainer.classList.contains('minimized')) {
                chatMessages.style.display = 'block';
                // Add a small delay to ensure smooth animation
                setTimeout(() => {
                    chatContainer.classList.remove('minimized');
                }, 10);
            } else {
                chatContainer.classList.add('minimized');
                // Add delay before hiding messages
                setTimeout(() => {
                    if (chatContainer.classList.contains('minimized')) {
                        chatMessages.style.display = 'none';
                    }
                }, 300); // Match the CSS transition duration
            }
        }
    });

    // Store chat state in localStorage
    window.addEventListener('beforeunload', () => {
        const chatState = {
            isMinimized: chatContainer.classList.contains('minimized')
        };
        localStorage.setItem('chatState', JSON.stringify(chatState));
    });

    // Restore chat state on page load
    const savedState = localStorage.getItem('chatState');
    if (savedState) {
        const chatState = JSON.parse(savedState);
        if (chatState.isMinimized) {
            chatContainer.classList.add('minimized');
            chatMessages.style.display = 'none';
        }
    }
}); 