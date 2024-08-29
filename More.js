document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.faq-question');
    const searchInput = document.getElementById('search');

    // Toggle answer visibility
    questions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        questions.forEach(question => {
            const answer = question.nextElementSibling;
            const text = question.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                question.parentElement.style.display = 'block';
            } else {
                question.parentElement.style.display = 'none';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('formSuccess');

    form.addEventListener('submit', function(event) {
        event.preventDefault();


        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.style.display = 'none');


        let isValid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (name.value.trim() === '') {
            document.getElementById('nameError').style.display = 'block';
            isValid = false;
        }

        if (!validateEmail(email.value.trim())) {
            document.getElementById('emailError').style.display = 'block';
            isValid = false;
        }

        if (message.value.trim() === '') {
            document.getElementById('messageError').style.display = 'block';
            isValid = false;
        }


        if (isValid) {
            form.reset();
            successMessage.style.display = 'block';
        }
    });

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const chatbot = document.getElementById('chatbot');
    const openChatButton = document.getElementById('openChat');
    const closeChatButton = document.getElementById('closeChat');
    const sendButton = document.getElementById('sendButton');
    const userInput = document.getElementById('userInput');
    const messages = document.getElementById('messages');

    // Show chatbot
    openChatButton.addEventListener('click', function() {
        chatbot.style.display = 'block';
    });

    // Hide chatbot
    closeChatButton.addEventListener('click', function() {
        chatbot.style.display = 'none';
    });

    // Send message
    sendButton.addEventListener('click', function() {
        const text = userInput.value.trim();
        if (text) {
            appendMessage('User', text);
            userInput.value = '';
            sendToDialogflow(text);
        }
    });

    function appendMessage(sender, text) {
        const message = document.createElement('div');
        message.className = sender.toLowerCase();
        message.textContent = $(sender), $ = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    function sendToDialogflow(text) {
        const projectId = 'YOUR_PROJECT_ID';
        const sessionId = '123456789'; // Replace with a unique session ID
        const accessToken = 'YOUR_ACCESS_TOKEN';
        const url = "https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${sessionId}:detectIntent";

        fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer$ { accessToken }',
                    'Content-Type': 'application/json'
                },
                JSON: stringify({
                    queryInput: {
                        text: {
                            text: text,
                            languageCode: 'en-US'
                        }
                    }
                })
            })
            .then(response => response.json())
            .then(data => {
                const reply = data.queryResult.fulfillmentText;
                appendMessage('Bot', reply);
            })
            .catch(error => {
                console.error('Error:', error);
                appendMessage('Bot', 'Sorry, I am having trouble understanding you right now.');
            });
    }
});

// Get the theme switcher checkbox
const themeSwitch = document.getElementById('theme-switch');

// Check if there's a saved theme preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.body.classList.add(currentTheme);
    if (currentTheme === 'dark-theme') {
        themeSwitch.checked = true;
    }
}

// Add event listener to toggle the theme
themeSwitch.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light-theme');
    }
});

// Smooth scrolling to top
document.getElementById('scroll-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Toggle dropdown menu on click
document.querySelectorAll('.dropdown-toggle').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault();
        const parent = this.parentElement;
        parent.classList.toggle('show');

        // Close other dropdowns if any
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            if (dropdown !== parent) {
                dropdown.classList.remove('show');
            }
        });
    });
});

window.addEventListener('click', function(event) {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });
});