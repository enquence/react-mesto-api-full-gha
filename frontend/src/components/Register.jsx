import React from 'react';
import AuthForm from "./AuthForm";
import {Link} from "react-router-dom";

const Register = ({isLoading, onSubmit}) => {
  return (
      <>
        <AuthForm title="Регистрация" buttonTitle="Зарегистрироваться" isLoading={isLoading} onSubmit={onSubmit} />
        <p className='page__text'>Уже зарегистрированы? <Link to='/sign-in'><span className='page__link'>Войти</span></Link></p>
      </>
  );
};

export default Register;
