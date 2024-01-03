import React from 'react';
import useForm from "../hooks/useForm";
import useValidateEmail from "../hooks/useValidateEmail";
import useValidatePassword from "../hooks/useValidatePassword";

const AuthForm = ({title, buttonTitle, isLoading, onSubmit}) => {

  const {values, modifiedFlags, handleChange} = useForm({ email: '', password: ''})

  const [isEmailValid, emailErrorMessage] = useValidateEmail(values.email)
  const [isPasswordValid, passwordErrorMessage] = useValidatePassword(values.password, 8)

  const isFormValid = isEmailValid && isPasswordValid

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(values)
  }

  return (
    <div className='form-container'>
      <h2 className="form-container__title">{title}</h2>
      <form className='form form_type_auth' name="Auth" onSubmit={handleSubmit}>
        <input className={`form__field${!isEmailValid && modifiedFlags.email ? ' form__field_type_error' : ''} form__field_type_dark`}
               type="text"
               name="email"
               placeholder="Email" autoComplete="off"
               value={values.email}
               onChange={handleChange}
        />
        <span className={`form__field-error${(!isEmailValid && modifiedFlags.email) ? ' form__field-error_active' : ''}`}>{emailErrorMessage}</span>
        <input className={`form__field${!isPasswordValid && modifiedFlags.password ? ' form__field_type_error' : ''} form__field_type_dark`}
               type="password"
               name="password"
               placeholder="Пароль" autoComplete="off"
               value={values.password}
               onChange={handleChange}/>
        <span className={`form__field-error${(!isPasswordValid && modifiedFlags.password) ? ' form__field-error_active' : ''}`}>{passwordErrorMessage}</span>
        <button className={`form__save-button form__save-button_type_dark${!isFormValid ? ' form__save-button_type_dark-inactive' : ''}`} type="submit">
          { isLoading
            ? <span className="form__button-spinner"/>
            : buttonTitle || 'Войти'
          }
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
