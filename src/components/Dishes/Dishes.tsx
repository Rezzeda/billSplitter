import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../services/store';
import { addDish } from '../../services/billSlice';
import {
  Container,
  TextField,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  FormControlLabel,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dishes: React.FC = () => {
  const [dishName, setDishName] = useState('');
  const [dishPrice, setDishPrice] = useState<number>(0);
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const { guests, dishes } = useSelector((state: RootState) => state.bill);
  const navigate = useNavigate(); // Для перехода на страницу результатов

  const handleAddDish = () => {
    if (dishName.trim() && dishPrice > 0 && selectedGuests.length) {
      dispatch(addDish({ name: dishName, price: dishPrice, sharedBy: selectedGuests }));
      setDishName('');
      setDishPrice(0);
      setSelectedGuests([]);
    } else {
      alert('Пожалуйста, заполните все поля и выберите хотя бы одного гостя.');
    }
  };

  const handleViewResults = () => {
    if (dishes.length > 0) {
      navigate('/results');
    } else {
      alert('Добавьте хотя бы одно блюдо, чтобы посмотреть итоги.');
    }
  };

  const toggleGuestSelection = (guestId: string) => {
    setSelectedGuests((prev) =>
      prev.includes(guestId) ? prev.filter((id) => id !== guestId) : [...prev, guestId]
    );
  };

  return (
    <Container maxWidth="sm">
      <TextField
        label="Название блюда"
        value={dishName}
        onChange={(e) => setDishName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Цена блюда"
        type="number"
        value={dishPrice}
        onChange={(e) => setDishPrice(Number(e.target.value))}
        fullWidth
        margin="normal"
      />
      {guests.map((guest) => (
        <FormControlLabel
          key={guest.id}
          control={
            <Checkbox
              checked={selectedGuests.includes(guest.id)}
              onChange={() => toggleGuestSelection(guest.id)}
            />
          }
          label={guest.name}
        />
      ))}
      <Stack spacing={2} sx={{ mt: 2 }}>
        <Button variant="contained" onClick={handleAddDish} fullWidth>
          Добавить блюдо
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleViewResults} fullWidth>
          Посмотреть итоги
        </Button>
      </Stack>
      <List sx={{ mt: 2 }}>
        {dishes.map((dish) => (
          <ListItem key={dish.id}>
            <ListItemText
              primary={dish.name}
              secondary={`Цена: ${dish.price}, Делят: ${dish.sharedBy.length} гостей`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Dishes;