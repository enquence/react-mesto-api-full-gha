import {useEffect, useState} from 'react';

const useValidatePassword = (field, minLength) => {

  const [isValid, setIsValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const passwordPattern = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]/)

  useEffect(() => {
    setErrorMessage('')
    if (!field) setErrorMessage('Введите пароль')
    else {
      if (!passwordPattern.test(field)) setErrorMessage(`Пароль должен состоять из цифр и букв`)
      if (field.length < minLength) setErrorMessage(`Пароль должен быть не менее ${minLength} символов`)
    }
    if (!errorMessage) setIsValid(true)
    else setIsValid(false)
  }, [field, errorMessage, minLength])

  return [isValid, errorMessage]
};

export default useValidatePassword;
