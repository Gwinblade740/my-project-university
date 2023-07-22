import { Container } from './App.styled';
import React, { useEffect, useState } from 'react';
import { FormComponent } from './FormComponent/FormComponent';

// import axios from 'axios';

export const App = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    fetch('https://64a0a5cded3c41bdd7a76781.mockapi.io/university')
      .then(response => response.json())
      .then(data => {
        setApiData(data);
      });
  }, []);

  return (
    <Container>
      <h1>Hello</h1>
      <FormComponent apiData={apiData}></FormComponent>
    </Container>
  );
};
