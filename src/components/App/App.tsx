import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../services/store';
import Home from '../../pages/Home';
import Guests from '../../components/Guests/Guests';
import Dishes from '../../components/Dishes/Dishes';
import Results from '../../pages/Result';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/to-do-rtk-test" element={<Home />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/dishes" element={<Dishes />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
