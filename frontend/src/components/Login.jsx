import React from 'react';
import AuthForm from "./AuthForm";

const Login = ({isLoading, onSubmit}) => {

  return (
    <AuthForm title="Вход" buttonTitle="Войти" isLoading={isLoading} onSubmit={onSubmit} />
  );
};

export default Login;
