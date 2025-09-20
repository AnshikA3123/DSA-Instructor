document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chatWindow');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    let totalQueries = 0;
    let correctAnswers = 0;
    let learningStreak = 0;

    const totalQueriesElement = document.getElementById('totalQueries');
    
    const learningStreakElement = document.getElementById('learningStreak');

    function updateWidgets() {
        totalQueriesElement.textContent = totalQueries;
        
        learningStreakElement.textContent = `${learningStreak} days`;
    }

    updateWidgets();

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        // Split the text by newlines and create a new paragraph for each part
        const paragraphs = text.split('\n');
        paragraphs.forEach(paraText => {
            if (paraText.trim() !== '') {
                const p = document.createElement('p');
                p.innerHTML = paraText.trim();
                messageDiv.appendChild(p);
            }
        });
        
        chatWindow.appendChild(messageDiv);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    async function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        addMessage(`👩‍💻: ${message}`, 'user');
        userInput.value = '';
        totalQueries++;
        updateWidgets();

        try {
            
            const backendUrl =https://dsa-instructor-50l0.onrender.com;
           

            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: message }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            addMessage(`🤖: ${data.reply}`, 'instructor');

        } catch (error) {
            console.error('Error fetching from backend:', error);
            addMessage('❌ Oops! Something went wrong. Please try again later. (Check your backend server!)', 'instructor');
        }
    }

    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

});

