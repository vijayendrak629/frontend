// src/components/Message.js
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const Message = ({ message }) => {
  const isUser = message.user === 'user';

  return (
    <Box
      display="flex"
      justifyContent={isUser ? 'flex-end' : 'flex-start'}
      mb={2}
    >
      <Paper
        style={{
          padding: '10px',
          backgroundColor: isUser ? '#d1e7ff' : '#e0e0e0',
          maxWidth: '80%',
        }}
      >
        <Typography variant="body1" style={{ color: isUser ? 'blue' : 'black' }}>
          {message.text}
        </Typography>
        <Typography variant="caption" style={{ color: isUser ? 'blue' : 'black' }}>
          {new Date(message.timestamp).toLocaleString()}
        </Typography>
      </Paper>
    </Box>
  );
};

export default Message;
