import React from 'react';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';

const Home = () => {
  return (
    <div className="home-container">
      <LoginPage />
      <RegistrationPage />
    </div>
  );
};

export default Home;
