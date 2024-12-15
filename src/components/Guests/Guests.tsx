import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { addGuest } from '../../services/billSlice';
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Guests: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const guests = useSelector((state: RootState) => state.bill.guests);
  const navigate = useNavigate();

  const handleAddGuest = () => {
    if (guestName.trim()) {
      dispatch(addGuest(guestName));
      setGuestName('');
    }
  };

  const handleNext = () => {
    if (guests.length > 0) {
      navigate('/dishes'); // Переход на страницу блюд
    } else {
      alert('Пожалуйста, добавьте хотя бы одного гостя.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <TextField
        label="Имя гостя"
        value={guestName}
        onChange={(e) => setGuestName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Stack spacing={2}>
        <Button variant="contained" onClick={handleAddGuest} fullWidth>
          Добавить гостя
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleNext} fullWidth>
          Далее: Ввести блюда
        </Button>
      </Stack>
      <List sx={{ mt: 2 }}>
        {guests.map((guest) => (
          <ListItem key={guest.id}>
            <ListItemText primary={guest.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Guests;