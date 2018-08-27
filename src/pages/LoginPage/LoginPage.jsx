import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import './LoginPage.css';
import RibbonHeader from '../../components/RibbonHeader/RibbonHeader';

const LoginPage = (props) => {
  return (
    <div className='LoginPage'>
      <RibbonHeader />
      <LoginForm 
        {...props}
        handleLogin={props.handleLogin}
      />
    </div>
  );
};

export default LoginPage;