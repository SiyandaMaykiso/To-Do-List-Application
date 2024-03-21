// src/pages/Home.js
import React from 'react';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';

const Home = () => {
  return (
    <div className="home-container"> {/* This container will use flexbox */}
      <LoginPage />
      <RegistrationPage />
    </div>
  );
};

export default Home;
