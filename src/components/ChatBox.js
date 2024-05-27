import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import Message from './Message';
import InputArea from './InputArea';
import { fetchCaseDetails, fetchMessages, sendMessage as sendMsg } from '../api/api';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [caseDetails, setCaseDetails] = useState({});

  const generateResponse = (userInput) => {
    const input = userInput.toLowerCase();
    const responses = {
      "hi": "Hello! How can I assist you today?",
      "hello": "Hello! How can I assist you today?",
      "hey": "Hello! How can I assist you today?",
      "how are you": "I'm just a bot, but thank you for asking!",
      "bye": "Goodbye! Have a great day!",
    };

    for (const [key, value] of Object.entries(responses)) {
      if (input.includes(key)) {
        return value;
      }
    }

    return "I'm sorry, I didn't understand that. Can you please rephrase?";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const caseRes = await fetchCaseDetails();
        const messagesRes = await fetchMessages();
        setCaseDetails(caseRes.data);
        setMessages(messagesRes.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  const sendMessage = async (text) => {
    const userMessage = {
      text,
      user: 'user',
      timestamp: new Date().toISOString(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const userMessageResponse = await sendMsg(userMessage);
      const botResponse = generateResponse(text);
      const botMessage = {
        text: botResponse,
        user: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      const botMessageResponse = await sendMsg(botMessage); // Store bot response in the backend
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4">Case Details</Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography>Product: {caseDetails.productName}</Typography>
        <Typography>Status: {caseDetails.status}</Typography>
        <Typography>Last Updated: {caseDetails.lastUpdated}</Typography>
      </Paper>
      <Paper elevation={3} style={{ padding: '20px', height: '60vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
      </Paper>
      <InputArea onSend={sendMessage} />
    </Container>
  );
};

export default ChatBox;
