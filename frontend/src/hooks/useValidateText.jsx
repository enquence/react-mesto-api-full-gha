import {useEffect, useState} from 'react';

const useValidateText = (field, minLength, maxLength) => {

  const [isValid, setIsValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setErrorMessage('')
    if (!field) setErrorMessage('Заполните это поле')
    else {
      if (field.length < minLength) setErrorMessage(`Текст должен быть не менее ${minLength} символов`)
      if (field.length > maxLength) setErrorMessage(`Текст должен быть не более ${maxLength} символов`)
    }
    if (!errorMessage) setIsValid(true)
    else setIsValid(false)
  }, [field, errorMessage, minLength, maxLength])

  return [isValid, errorMessage]
};

export default useValidateText;
