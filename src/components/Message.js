import React from 'react';
import { Box, Typography, Avatar, Paper } from '@mui/material';

const Message = ({ message }) => {
  const isUser = message.user === 'user';
  const messageStyles = {
    backgroundColor: isUser ? '#d0ebff' : '#e0e0e0',
    color: 'black',
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
    <Box display="flex" flexDirection="column" alignItems={isUser ? 'flex-start' : 'flex-end'}>
      <Box display="flex" alignItems="center">
        {isUser && <Avatar sx={{ bgcolor: '#1976d2', marginRight: '10px' }}>U</Avatar>}
        <Paper elevation={1} style={messageStyles}>
          <Typography variant="body1" style={typographyStyles}>{message.text}</Typography>
        </Paper>
        {!isUser && <Avatar sx={{ bgcolor: '#9e9e9e', marginLeft: '10px' }}>B</Avatar>}
      </Box>
      <Typography variant="caption" display="block" sx={{ marginTop: '4px', color: 'gray' }}>
      Chat - {new Date(message.timestamp).toLocaleString()}
      </Typography>
    </Box>
  );
};

export default Message;
