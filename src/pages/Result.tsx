import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../services/store';
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Collapse,
    Divider,
    Stack,
    Button,
  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const Results: React.FC = () => {
    const guests = useSelector((state: RootState) => state.bill.guests);
    const dishes = useSelector((state: RootState) => state.bill.dishes);
    const navigate = useNavigate();
    const [expandedGuestId, setExpandedGuestId] = useState<string | null>(null);
  
    const handleToggleGuest = (guestId: string) => {
      setExpandedGuestId((prev) => (prev === guestId ? null : guestId));
    };
  
    const handleCreateNewBill = () => {
      navigate('/to-do-rtk-test'); // Переход на главную страницу
    };
  
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Итоги
        </Typography>
        <List>
          {guests.map((guest) => {
            const guestDishes = dishes
              .filter((dish) => dish.sharedBy.includes(guest.id))
              .map((dish) => ({
                name: dish.name,
                pricePerGuest: (dish.price / dish.sharedBy.length).toFixed(2),
              }));
  
            return (
              <div key={guest.id}>
                <ListItem onClick={() => handleToggleGuest(guest.id)}>
                  <ListItemText
                    primary={guest.name}
                    secondary={`Общая сумма: ${guest.total.toFixed(2)} ₽`}
                  />
                  {expandedGuestId === guest.id ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={expandedGuestId === guest.id} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {guestDishes.map((dish, index) => (
                      <ListItem key={index} sx={{ pl: 4 }}>
                        <ListItemText
                          primary={dish.name}
                          secondary={`Сумма: ${dish.pricePerGuest} ₽`}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Divider />
                </Collapse>
              </div>
            );
          })}
        </List>
        <Stack spacing={2} sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleCreateNewBill} fullWidth>
            Создать новый чек
          </Button>
        </Stack>
      </Container>
    );
  };
  
  export default Results;