import React, { useState } from 'react';
import './Chat.css';

function Chat() {
    const [inputText, setInputText] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const apiKey = 'AIzaSyAKZmfQtAQLp0L8TZt9syATpQ9Zq7TMgyA'; // ¡Reemplaza con tu clave API!
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleSubmit = async () => {
        if (!inputText.trim()) return;

        const messageWithSummary = inputText ;

        const newMessage = { text: `Tú: ${inputText}`, sender: 'user' };
        setChatMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputText('');

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: messageWithSummary }],
                    }],
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            let botResponse = data.candidates[0].content.parts[0].text;

            botResponse = botResponse.replace(/\*/g, '<br>');

            const botMessage = { text: `Jonathan Lorenzana: ${botResponse}`, sender: 'bot' };
            setChatMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error al llamar a la API de Gemini:', error);
            const errorMessage = { text: 'Ocurrió un error.', sender: 'bot' };
            setChatMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="chat-container">
            <div className="profile">
                <img src="https://static.vecteezy.com/system/resources/previews/025/463/773/non_2x/hacker-logo-design-a-mysterious-and-dangerous-hacker-illustration-vector.jpg" alt="Tu Foto" className="profile-image" />
                <h2>Jonathan Lorenzana</h2>
            </div>
            <div className="chat-messages">
                {chatMessages.map((message, index) => {
                    const [sender, content] = message.text.split(': ');
                    return (
                        <div key={index} className={`message-container ${message.sender}`}>
                            <strong>{sender}:</strong>
                            <div className={`message ${message.sender}`} dangerouslySetInnerHTML={{ __html: content }}>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={inputText}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Pregunta lo que quieras..."
                />
                <button onClick={handleSubmit}>Enviar</button>
            </div>
        </div>
    );
}

export default Chat;