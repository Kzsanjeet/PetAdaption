import React from 'react';
import Box from '@mui/material/Box';
import girlanddog from '../assets/1713727029180-girl-walking-dog.webp'

function FullWidthImage() {
    return (
      <Box
        sx={{
          width: '100%',
          height:'100%',
          minHeight: '300px',
          textAlign: 'center',
          backgroundColor: 'red',
          position: 'relative',
          margin:0,
        }}
      >
        <img
          src={girlanddog}
          alt="Full Width"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </Box>
    );
  }
  

export default FullWidthImage;