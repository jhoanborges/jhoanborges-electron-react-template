import React from 'react';
import './App.css';
import HomeScreen from './Components/HomeScreen';
import ProductsScreen from './Components/ProductsScreen';
import { Container } from '@material-ui/core';

function App() {
  return (
    <div className="App">
    <Container maxWidth="md">
      <ProductsScreen></ProductsScreen>
      </Container>
      <HomeScreen></HomeScreen>
      
    </div>
  );
}

export default App;
