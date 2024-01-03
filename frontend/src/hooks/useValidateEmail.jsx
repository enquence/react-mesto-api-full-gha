import {useEffect, useState} from 'react';

const useValidateEmail = (field) => {

  const emailPattern = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  const [isValid, setIsValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setErrorMessage('')
    if (!field) setErrorMessage('Заполните это поле')
    else if (!emailPattern.test(field.toLowerCase())) setErrorMessage(`Введите корректный адрес электронной почты`)
    if (!errorMessage) setIsValid(true)
    else setIsValid(false)
  }, [field, errorMessage])

  return [isValid, errorMessage]
};

export default useValidateEmail;
