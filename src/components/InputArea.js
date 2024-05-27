import React, { useState } from 'react';
import { Box, TextField, Button, Paper } from '@mui/material';

const InputArea = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <Box display="flex" alignItems="center" mt={0} p={2} component={Paper} elevation={3}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSend();
          }
        }}
        style={{ marginRight: '10px' }}
      />
      <Button variant="contained" color="primary" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
};

export default InputArea;
