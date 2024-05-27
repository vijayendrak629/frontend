// src/components/InputArea.js
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const InputArea = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <Box display="flex" mt={2}>
      <TextField
        variant="outlined"
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <Button variant="contained" color="primary" onClick={handleSend} style={{ marginLeft: '10px' }}>
        Send
      </Button>
    </Box>
  );
};

export default InputArea;
