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
    <Box display="flex" alignItems="center" p={2} component={Paper} elevation={3} style={{ borderTop: '1px solid #e0e0e0', borderRadius: 0 }}>
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
        InputProps={{
          endAdornment: (
            <Button
              variant="contained"
              onClick={handleSend}
              sx={{
                backgroundColor: 'rgba(5, 4, 126, 1)',
                '&:hover': {
                  backgroundColor: 'rgba(5, 4, 126, 0.8)',
                },
                height: '100%',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0
              }}
            >
              Send
            </Button>
          )
        }}
      />
    </Box>
  );
};

export default InputArea;
