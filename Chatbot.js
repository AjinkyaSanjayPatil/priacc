// File: src/components/Chat/Chatbot.js

import React, { useState, useEffect, useRef } from 'react';

import './chatbot.css';
 
const employees = {

  PIPL0016: { name: 'Dheeraj Kumar', mobile: 'XXXXXXX1634' },

  PIPL0015: { name: 'Naga', mobile: 'XXXXXX1234' },

  PIPL0017: { name: 'ABC', mobile: 'XXXXXX1234' },

  PIPL0029: { name: 'XYZ', mobile: 'XXXXXX1234' },

};
 
const Chatbot = () => {

  const [messages, setMessages] = useState([

    { sender: 'bot', text: 'Hi! How can I help you today?' },

  ]);

  const [input, setInput] = useState('');

  const [leaveStage, setLeaveStage] = useState(0);

  const [leaveData, setLeaveData] = useState({});

  const [isOpen, setIsOpen] = useState(false);
 
  const chatBodyRef = useRef();
 
  useEffect(() => {

    if (chatBodyRef.current) {

      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;

    }

  }, [messages]);
 
  const appendMessage = (sender, text) => {

    setMessages((prev) => [...prev, { sender, text }]);

  };
 
  const processInput = () => {

    const text = input.trim();

    if (!text) return;

    appendMessage('user', text);

    setInput('');
 
    const lower = text.toLowerCase();
 
    if (leaveStage === 1) {

      const empId = text.toUpperCase();

      if (employees[empId]) {

        const employee = employees[empId];

        setLeaveData({ empId, name: employee.name, mobile: employee.mobile });

        appendMessage(

          'bot',

          `👤 Employee Details:\nName: ${employee.name}\nID: ${empId}\nMobile: ${employee.mobile}`

        );

        setTimeout(() => appendMessage('bot', '📅 Please enter the date for your leave (e.g., 2025-07-20):'), 500);

        setLeaveStage(2);

      } else {

        appendMessage('bot', '❌ Employee ID not found. Please enter a valid Employee ID.');

      }

      return;

    }
 
    if (leaveStage === 2) {

      setLeaveData((prev) => ({ ...prev, date: text }));

      appendMessage('bot', '✏️ Please enter the reason for your leave:');

      setLeaveStage(3);

      return;

    }
 
    if (leaveStage === 3) {

      const data = { ...leaveData, reason: text };

      setLeaveStage(0);

      const approved = text.toLowerCase().includes('vacation') || text.toLowerCase().includes('personal');

      const result = `📝 Leave Request Summary:\nName: ${data.name}\nEmployee ID: ${data.empId}\nMobile: ${data.mobile}\nDate: ${data.date}\nReason: ${data.reason}\n\n✅ Your leave has been ${approved ? 'APPROVED' : 'REJECTED'} by HR.`;

      setTimeout(() => appendMessage('bot', result), 800);

      return;

    }
 
    if (lower.includes('leave request')) {

      setLeaveStage(1);

      setLeaveData({});

      setTimeout(() => appendMessage('bot', '🆔 Please enter your Employee ID:'), 500);

    } else if (lower.includes('opening')) {

      appendMessage('bot', '🕒 We are open from 9 AM to 6 PM, Monday to Saturday.');

    } else if (lower.includes('project')) {

      appendMessage('bot', '📂 We work on AI, Web Development, and Cloud Solutions.');

    } else if (lower.includes('clients')) {

      appendMessage('bot', '🌐 Our clients include Google, Amazon, and Wipro.');

    } else if (lower.includes('about')) {

      appendMessage('bot', '👥 We are a digital innovation company focused on enterprise tech.');

    } else {

      appendMessage('bot', '❓ Sorry, I didn\'t understand that. Try asking about "opening", "projects", or type "leave request".');

    }

  };
 
  const handleUserInput = (e) => {

    if (e.key === 'Enter') {

      processInput();

    }

  };
 
  const handleSendClick = () => {

    processInput();

  };
 
  return (
<>
<iframe

        src="https://priaccinnovations.com/"

        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none', zIndex: 0 }}

        title="background"

      />
<div className="chatbot-toggle" onClick={() => setIsOpen(true)} style={{ display: isOpen ? 'none' : 'block' }}>

        💬
</div>

      {isOpen && (
<div className="chatbot">
<div className="chat-header">

            💬 Company Bot
<span className="close-btn" onClick={() => setIsOpen(false)}>×</span>
</div>
<div className="chat-body" ref={chatBodyRef}>

            {messages.map((msg, idx) => (
<div key={idx} className={`message ${msg.sender}`}>

                {msg.text.split('\n').map((line, i) => (
<React.Fragment key={i}>

                    {line}<br />
</React.Fragment>

                ))}
</div>

            ))}
</div>
<div className="chat-footer">
<input

              type="text"

              placeholder="Type your message..."

              value={input}

              onChange={(e) => setInput(e.target.value)}

              onKeyDown={handleUserInput}

            />
<button onClick={handleSendClick}>Send</button>
</div>
</div>

      )}
</>

  );

};
 
export default Chatbot;

 