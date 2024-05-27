import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Box, Grid } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
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
      await sendMsg(userMessage);
      const botResponse = generateResponse(text);
      const botMessage = {
        text: botResponse,
        user: 'bot',
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);

      await sendMsg(botMessage); // Store bot response in the backend
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <Container>
      <Box mb={0} p={2} component={Paper} elevation={3}>
        <Typography 
          variant="h6"
          style={{
            fontFamily: 'DM Sans',
            fontSize: '20px',
            fontWeight: 700,
            lineHeight: '26px',
            letterSpacing: '-0.02em',
            textAlign: 'left',
            marginTop: '16px' // optional: add margin top to separate from the above content
          }}
        >
          I want to cancel my subscription
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6} container alignItems="center">
            <ChatBubbleOutlineIcon />
            <Typography
              variant="subtitle1"
              ml={1}
              style={{
                fontFamily: 'DM Sans',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '21px',
                textAlign: 'left'
              }}
            >
              Case ID: {caseDetails.caseId}
            </Typography>
          </Grid>
          <Grid item xs={6} container alignItems="center">
            <DescriptionOutlinedIcon />
            <Typography
              variant="subtitle1"
              ml={1}
              style={{
                fontFamily: 'DM Sans',
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '21px',
                textAlign: 'left'
              }}
            >
              Product Name: Elementor Hosting - Basic
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              style={{
                fontFamily: 'DM Sans',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                textAlign: 'left'
              }}
            >
              Created At: {caseDetails.createdAt}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="subtitle1"
              style={{
                fontFamily: 'DM Sans',
                fontSize: '16px',
                fontWeight: 400,
                lineHeight: '24px',
                textAlign: 'left'
              }}
            >
              Last Updated: {caseDetails.lastUpdated}
            </Typography>
          </Grid>
        </Grid>
      </Box>
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
