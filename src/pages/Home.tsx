import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Разделение счета
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => navigate('/guests')}
      >
        Начать
      </Button>
    </Container>
  );
};

export default Home;