import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AddFeedback from './AddFeedback';
import FullWidthImage from './FullWidthImage';

function Contact() {
  return (
    <Grid container spacing={2} sx={{backgroundColor:'#ededed', padding: '0px!important'}}>
      <Grid item xs={12} md={6} sx={{paddingBottom: '60px'}}>
        <AddFeedback />
      </Grid>
      <Grid item xs={12} md={6} sx={{paddingTop:'0px'}}>
        <FullWidthImage />
      </Grid>
    </Grid>
  );
}

export default Contact;
