// Hero's AI Chat Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Verify that all necessary elements exist before trying to use them
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    const typingIndicator = document.getElementById('typing-indicator');
    const clearChatButton = document.getElementById('clear-chat');
    const toggleSuggestionsButton = document.getElementById('toggle-suggestions');
    const suggestedQuestions = document.getElementById('suggested-questions');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    
    // Check if all elements exist before proceeding
    if (!chatMessages || !chatInput || !sendButton) {
        console.error('Chat elements not found!');
        return; // Exit if elements not found
    }
    
    console.log('Chat interface initialized'); // Debug log
    
    // Portfolio Information Database
    const portfolioInfo = {
        name: "Moneshwar S S",
        education: {
            bsc: {
                degree: "BSc Computer Science",
                institution: "SSM College of Arts and Science",
                period: "2022 - Present",
                percentage: "77.7%",
                details: "Currently pursuing my Bachelor's degree with a focus on computer science fundamentals, programming languages, and software development principles."
            },
            hsc: {
                degree: "Higher Secondary Certificate (HSC)",
                institution: "Equitas Gurukul Matric Higher Secondary School",
                period: "2020 - 2022",
                percentage: "73.3%",
                details: "Completed my higher secondary education with a focus on mathematics and computer science, building a strong foundation for my programming journey."
            },
            sslc: {
                degree: "Secondary School Leaving Certificate (SSLC)",
                institution: "MSP Solai Nadar Memorial Higher Secondary School",
                period: "2020",
                percentage: "73.2%",
                details: "Completed my secondary education with a well-rounded curriculum that sparked my interest in technology and logical problem-solving."
            }
        },
        skills: {
            c: {
                name: "C",
                proficiency: "90%",
                level: "Advanced",
                description: "Strong foundation in C programming with deep understanding of memory management, pointers, and system-level programming."
            },
            cpp: {
                name: "C++",
                proficiency: "85%",
                level: "Advanced",
                description: "Expert in object-oriented programming with C++, including STL, templates, and modern C++ features."
            },
            java: {
                name: "Java",
                proficiency: "95%",
                level: "Expert",
                description: "Extensive experience with Java, creating robust applications with a focus on performance and reliability."
            },
            coreJava: {
                name: "Core Java",
                proficiency: "92%",
                level: "Advanced",
                description: "Mastery of Core Java concepts including multi-threading, collections, I/O streams, and advanced data structures."
            },
            fullStack: {
                name: "Full Stack",
                proficiency: "88%",
                level: "Advanced",
                description: "End-to-end development expertise spanning front-end, back-end, and database technologies.",
                frontEnd: ["HTML5", "CSS3", "JavaScript", "React", "Angular"],
                backEnd: ["Spring Boot", "Node.js", "Express", "Servlets", "JSP"],
                database: ["MySQL", "MongoDB", "PostgreSQL", "Oracle"],
                devOps: ["Git", "Docker", "Jenkins", "AWS"]
            },
            python: {
                name: "Python",
                proficiency: "45%",
                level: "Basic",
                description: "Basic knowledge of Python for data analysis, automation scripts, and simple web applications."
            },
            react: {
                name: "React",
                proficiency: "70%",
                level: "Intermediate",
                description: "Intermediate skills in building interactive user interfaces with React, including hooks and state management."
            }
        },
        projects: {
            selfParking: {
                name: "Self-Parking System",
                technologies: ["Arduino", "Ultrasonic Sensors", "Servo Motors", "C/C++", "Embedded Systems"],
                description: "A smart parking solution that uses sensors and actuators to automatically park vehicles with precision and safety, reducing human error.",
                features: [
                    "Real-time obstacle detection and avoidance",
                    "Automated parallel and perpendicular parking capability",
                    "Distance measurement with high precision",
                    "Intelligent path planning algorithm",
                    "Safety mechanisms to prevent collisions"
                ],
                implementation: "The system was implemented using Arduino as the main controller, with ultrasonic sensors for distance measurement, and servo motors for controlling the vehicle's movement. The algorithms were written in C/C++ to process sensor data and make real-time decisions for safe parking maneuvers.",
                results: "The Self-Parking System demonstrated a 95% success rate in test scenarios, significantly reducing the time and stress associated with parking in tight spaces."
            }
        }
    };
    
    // Function to add a message to the chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isUser ? 'message user-message' : 'message ai-message';
        
        const time = new Date();
        const timeString = `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
            <div class="message-time">${timeString}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        typingIndicator.style.display = 'block';
    }
    
    // Function to hide typing indicator
    function hideTypingIndicator() {
        typingIndicator.style.display = 'none';
    }
    
    // Function to simulate AI response
    function simulateAIResponse(userMessage) {
        showTypingIndicator();
        
        // Simulate thinking time (1-3 seconds)
        const thinkingTime = 1000 + Math.random() * 2000;
        
        setTimeout(() => {
            hideTypingIndicator();
            
            // Generate a response based on the user's message
            let response = getAIResponse(userMessage);
            
            // Add the AI response to the chat
            addMessage(response, false);
        }, thinkingTime);
    }
    
    // Function to generate AI responses based on user input
    function getAIResponse(userMessage) {
        // Convert to lowercase for easier matching
        const message = userMessage.toLowerCase();
        
        // Educational Background
        if (message.includes('education') || message.includes('study') || 
            message.includes('college') || message.includes('school') || 
            message.includes('bsc') || message.includes('hsc') || 
            message.includes('sslc')) {
            
            if (message.includes('bsc') || message.includes('college') || message.includes('current')) {
                return `I'm currently pursuing my ${portfolioInfo.education.bsc.degree} at ${portfolioInfo.education.bsc.institution} (${portfolioInfo.education.bsc.period}) with ${portfolioInfo.education.bsc.percentage} marks. ${portfolioInfo.education.bsc.details}`;
            } 
            else if (message.includes('hsc') || message.includes('12th') || message.includes('higher secondary')) {
                return `I completed my ${portfolioInfo.education.hsc.degree} at ${portfolioInfo.education.hsc.institution} (${portfolioInfo.education.hsc.period}) with ${portfolioInfo.education.hsc.percentage} marks. ${portfolioInfo.education.hsc.details}`;
            }
            else if (message.includes('sslc') || message.includes('10th') || message.includes('secondary')) {
                return `I completed my ${portfolioInfo.education.sslc.degree} at ${portfolioInfo.education.sslc.institution} in ${portfolioInfo.education.sslc.period} with ${portfolioInfo.education.sslc.percentage} marks. ${portfolioInfo.education.sslc.details}`;
            }
            else {
                return `My educational journey includes:\n\n1. ${portfolioInfo.education.bsc.degree} at ${portfolioInfo.education.bsc.institution} (${portfolioInfo.education.bsc.period}) - ${portfolioInfo.education.bsc.percentage}\n\n2. ${portfolioInfo.education.hsc.degree} at ${portfolioInfo.education.hsc.institution} (${portfolioInfo.education.hsc.period}) - ${portfolioInfo.education.hsc.percentage}\n\n3. ${portfolioInfo.education.sslc.degree} at ${portfolioInfo.education.sslc.institution} (${portfolioInfo.education.sslc.period}) - ${portfolioInfo.education.sslc.percentage}\n\nWould you like to know more about any specific part of my education?`;
            }
        }
        
        // Skills Information
        else if (message.includes('skill') || message.includes('proficiency') || 
                message.includes('experience') || message.includes('know') || 
                message.includes('expert')) {
            
            if (message.includes('c programming') || (message.includes('c') && !message.includes('c++') && !message.includes('core'))) {
                return `I have ${portfolioInfo.skills.c.level} proficiency (${portfolioInfo.skills.c.proficiency}) in C Programming. ${portfolioInfo.skills.c.description}`;
            }
            else if (message.includes('c++') || message.includes('cpp')) {
                return `I have ${portfolioInfo.skills.cpp.level} proficiency (${portfolioInfo.skills.cpp.proficiency}) in C++. ${portfolioInfo.skills.cpp.description}`;
            }
            else if (message.includes('core java')) {
                return `I have ${portfolioInfo.skills.coreJava.level} proficiency (${portfolioInfo.skills.coreJava.proficiency}) in Core Java. ${portfolioInfo.skills.coreJava.description}`;
            }
            else if (message.includes('java') && !message.includes('core java')) {
                return `I have ${portfolioInfo.skills.java.level} proficiency (${portfolioInfo.skills.java.proficiency}) in Java. ${portfolioInfo.skills.java.description}`;
            }
            else if (message.includes('full stack') || message.includes('fullstack') || message.includes('full-stack')) {
                let frontEndTechs = portfolioInfo.skills.fullStack.frontEnd.join(', ');
                let backEndTechs = portfolioInfo.skills.fullStack.backEnd.join(', ');
                let dbTechs = portfolioInfo.skills.fullStack.database.join(', ');
                
                return `I have ${portfolioInfo.skills.fullStack.level} proficiency (${portfolioInfo.skills.fullStack.proficiency}) in Full Stack Development. ${portfolioInfo.skills.fullStack.description}\n\n• Front-End: ${frontEndTechs}\n• Back-End: ${backEndTechs}\n• Databases: ${dbTechs}\n• DevOps: ${portfolioInfo.skills.fullStack.devOps.join(', ')}`;
            }
            else if (message.includes('python')) {
                return `I have ${portfolioInfo.skills.python.level} proficiency (${portfolioInfo.skills.python.proficiency}) in Python. ${portfolioInfo.skills.python.description}`;
            }
            else if (message.includes('react')) {
                return `I have ${portfolioInfo.skills.react.level} proficiency (${portfolioInfo.skills.react.proficiency}) in React. ${portfolioInfo.skills.react.description}`;
            }
            else {
                // General skills overview
                return `My key skills include:\n\n• C Programming (${portfolioInfo.skills.c.proficiency}) - ${portfolioInfo.skills.c.level}\n• C++ (${portfolioInfo.skills.cpp.proficiency}) - ${portfolioInfo.skills.cpp.level}\n• Java (${portfolioInfo.skills.java.proficiency}) - ${portfolioInfo.skills.java.level}\n• Core Java (${portfolioInfo.skills.coreJava.proficiency}) - ${portfolioInfo.skills.coreJava.level}\n• Full Stack Development (${portfolioInfo.skills.fullStack.proficiency}) - ${portfolioInfo.skills.fullStack.level}\n\nI also have some experience with Python (${portfolioInfo.skills.python.proficiency}) and React (${portfolioInfo.skills.react.proficiency}).\n\nWould you like more details about any of these skills?`;
            }
        }
        
        // Project Information
        else if (message.includes('project') || message.includes('work') || 
                message.includes('portfolio') || message.includes('created') ||
                message.includes('developed') || message.includes('built') ||
                message.includes('parking')) {
            
            if (message.includes('parking') || message.includes('self-parking') || message.includes('self parking')) {
                let techsUsed = portfolioInfo.projects.selfParking.technologies.join(', ');
                let featuresText = portfolioInfo.projects.selfParking.features.map(feature => `• ${feature}`).join('\n');
                
                return `The ${portfolioInfo.projects.selfParking.name} is one of my main projects. ${portfolioInfo.projects.selfParking.description}\n\nTechnologies used: ${techsUsed}\n\nKey features:\n${featuresText}\n\n${portfolioInfo.projects.selfParking.results}`;
            }
            else {
                return `My main project is the ${portfolioInfo.projects.selfParking.name} - ${portfolioInfo.projects.selfParking.description}\n\nIt uses ${portfolioInfo.projects.selfParking.technologies.join(', ')} and achieved a 95% success rate in test scenarios.\n\nWould you like to know more specific details about this project?`;
            }
        }
        
        // Introduction/Personal Information
        else if (message.includes('hello') || message.includes('hi') || 
                message.includes('hey') || message.includes('greetings') || 
                message.includes('introduce') || message.includes('who are you') || 
                message.includes('about you')) {
            
            return `Hello! I'm Monesh AI Assistant, representing Moneshwar S S, a Software Engineer. I'm here to tell you about Moneshwar's skills in C, C++, Java, Core Java, and his experience as a fresh graduate pursuing a BSc in Computer Science at SSM College of Arts and Science with 77.7% marks. Moneshwar has worked on a Self-Parking System project. Feel free to ask me about his education, skills, or project!`;
        }
        
        // Contact Information
        else if (message.includes('contact') || message.includes('email') || 
                message.includes('phone') || message.includes('reach') || 
                message.includes('hire') || message.includes('job')) {
            
            return `You can contact me through the Contact section of this portfolio website. I'm always open to new opportunities, collaborations, and interesting projects. Feel free to reach out if you'd like to discuss potential work or just connect professionally!`;
        }
        
        // Thank you responses
        else if (message.includes('thank') || message.includes('thanks') || 
                message.includes('appreciate') || message.includes('helpful')) {
            
            return `You're welcome! I'm glad I could help. Feel free to ask if you have any other questions about my skills, education, projects, or anything else related to my portfolio.`;
        }
        
        // When user asks for technologies or tech stack
        else if (message.includes('tech') || message.includes('stack') || 
                message.includes('framework') || message.includes('language')) {
            
            return `I'm experienced with various technologies including:\n\n• Programming Languages: C (90%), C++ (85%), Java (95%)\n• Front-End: HTML5, CSS3, JavaScript, React (70%), Angular\n• Back-End: Spring Boot, Node.js, Express, Servlets, JSP\n• Databases: MySQL, MongoDB, PostgreSQL, Oracle\n• DevOps: Git, Docker, Jenkins, AWS\n\nIs there a specific technology you'd like to know more about?`;
        }
        
        // Default responses for unknown queries
        else {
            const defaultResponses = [
                "That's an interesting question! Could you please be more specific? I can tell you about my education, skills, or projects.",
                "I'm not sure I understand. Would you like to know about my education, skills, or the projects I've worked on?",
                "I'd be happy to help, but could you rephrase your question? I can provide information about my technical background, educational journey, or project experience.",
                "Thanks for your interest! I can tell you about my skills in C, C++, Java, Full Stack development, or my Self-Parking project. What would you like to know?",
                "I'm designed to tell you about my portfolio. Feel free to ask about my education at SSM College, my programming skills, or my Self-Parking System project!"
            ];
            
            return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
        }
    }
    
    // Enhanced event listener for the send button with debug logs
    sendButton.addEventListener('click', () => {
        const message = chatInput.value.trim();
        console.log('Send button clicked, message:', message); // Debug log
        
        if (message !== '') {
            // Add the user's message to the chat
            addMessage(message, true);
            console.log('User message added to chat'); // Debug log
            
            // Clear input field
            chatInput.value = '';
            
            // Simulate AI response
            simulateAIResponse(message);
        }
    });
    
    // Event listener for the Enter key in the input field
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            console.log('Enter key pressed'); // Debug log
            sendButton.click();
        }
    });
    
    // Event listener for the clear chat button
    clearChatButton.addEventListener('click', () => {
        // Keep just the first welcome message
        const welcomeMessage = chatMessages.firstElementChild;
        chatMessages.innerHTML = '';
        chatMessages.appendChild(welcomeMessage);
    });
    
    // Event listener for the toggle suggestions button
    toggleSuggestionsButton.addEventListener('click', () => {
        suggestedQuestions.classList.toggle('show-suggestions');
    });
    
    // Event listeners for suggestion buttons
    suggestionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const question = button.textContent;
            
            // Add the suggested question as a user message
            addMessage(question, true);
            
            // Simulate AI response
            simulateAIResponse(question);
            
            // Hide suggestions after clicking
            suggestedQuestions.classList.remove('show-suggestions');
        });
    });
    
    // Make sure the chat elements are visible
    if (chatMessages.parentElement) {
        chatMessages.parentElement.style.display = 'flex';
    }
    
    // Focus the input field when the page loads
    chatInput.focus();
    
    // Add a test message to verify functionality on load
    console.log('Chat functionality loaded and ready');
});

// Add this at the beginning of your script.js file
function testChatFunctionality() {
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-message');
    
    if (!chatMessages || !chatInput || !sendButton) {
        console.error('Chat elements not found in test function!');
        return;
    }
    
    // Add a test function to the window object so you can call it from browser console
    window.sendTestMessage = function(message) {
        if (!message) message = "This is a test message";
        
        // Create user message
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user-message';
        
        const time = new Date();
        const timeString = `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
        
        userMessageDiv.innerHTML = `
            <div class="message-content">
                <p>${message}</p>
            </div>
            <div class="message-time">${timeString}</div>
        `;
        
        chatMessages.appendChild(userMessageDiv);
        
        // Create AI response after 1 second
        setTimeout(() => {
            const aiMessageDiv = document.createElement('div');
            aiMessageDiv.className = 'message ai-message';
            
            aiMessageDiv.innerHTML = `
                <div class="message-content">
                    <p>This is a test response to: "${message}"</p>
                </div>
                <div class="message-time">${timeString}</div>
            `;
            
            chatMessages.appendChild(aiMessageDiv);
            
            // Scroll to the bottom of the chat
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
        
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };
    
    console.log('Test chat functionality ready. Call window.sendTestMessage() in console to test.');
}

// Call the test function on page load
document.addEventListener('DOMContentLoaded', function() {
    testChatFunctionality();
    // Rest of your existing code...
});

// Contact Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, we'll simulate a successful submission
            
            // Simulate sending (2 second delay)
            contactForm.classList.add('sending');
            
            setTimeout(() => {
                // Hide the form and show success message
                contactForm.style.display = 'none';
                formSuccess.classList.add('show-success');
                
                // Reset form
                contactForm.reset();
                
                // Optionally, reset the form and hide success message after some time
                setTimeout(() => {
                    formSuccess.classList.remove('show-success');
                    contactForm.style.display = 'flex';
                    contactForm.classList.remove('sending');
                }, 5000);
            }, 2000);
            
            // In a real implementation, you would use fetch or XMLHttpRequest to send the data
            /*
            fetch('your-form-handler-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                contactForm.style.display = 'none';
                formSuccess.classList.add('show-success');
                contactForm.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error state
            });
            */
        });
    }
});

// Update side navigation active state
function updateSideNav() {
    // Get all sections and side nav links
    const sections = document.querySelectorAll('section');
    const sideNavLinks = document.querySelectorAll('.side-nav a');
    
    // Get current scroll position
    const scrollY = window.pageYOffset;
    
    // Find current section
    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            // Remove active class from all links
            sideNavLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to corresponding link
            document.querySelector(`.side-nav a[href="#${sectionId}"]`).classList.add('active');
        }
    });
}

// Initialize side nav active state on page load
document.addEventListener('DOMContentLoaded', function() {
    createGalaxy();
    // Remove: updateSideNav();
});

// Update side nav on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const backToTop = document.querySelector('.back-to-top');
    
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
        backToTop.classList.add('visible');
    } else {
        header.classList.remove('scrolled');
        backToTop.classList.remove('visible');
    }
});

// Scroll to top when page loads
window.addEventListener('load', function() {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    
    // Also update the active state in the navigation
    const homeLink = document.querySelector('nav ul li a[href="#home"]');
    if (homeLink) {
        // Remove active class from all links
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to home link
        homeLink.classList.add('active');
    }
}); 