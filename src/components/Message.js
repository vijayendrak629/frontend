import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';

const Message = ({ message }) => {
  const isUser = message.user === 'user';
  const messageStyles = {
    backgroundColor: isUser ? '#d0ebff' : '#e0e0e0',
    color: isUser ? 'black' : 'black',
    padding: '10px',
    borderRadius: '10px',
    margin: '10px 0',
    alignSelf: isUser ? 'flex-start' : 'flex-end',
    maxWidth: '70%',
  };

  const typographyStyles = {
    fontFamily: 'DM Sans',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    textAlign: 'left',
  };

  return (
    <Box display="flex" justifyContent={isUser ? 'flex-start' : 'flex-end'}>
      {isUser && <Avatar sx={{ bgcolor: '#1976d2', marginRight: '10px' }}>U</Avatar>}
      <Paper elevation={1} style={messageStyles}>
        <Typography variant="body1" style={typographyStyles}>{message.text}</Typography>
        <Typography variant="caption" display="block">{new Date(message.timestamp).toLocaleString()}</Typography>
      </Paper>
      {!isUser && <Avatar sx={{ bgcolor: '#9e9e9e', marginLeft: '10px' }}>B</Avatar>}
    </Box>
  );
};

export default Message;
