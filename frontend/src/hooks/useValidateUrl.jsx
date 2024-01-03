import {useEffect, useState} from 'react';

const useValidateUrl = (field) => {

  const urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator

  const [isValid, setIsValid] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    setErrorMessage('')
    if (!field) setErrorMessage('Заполните это поле')
    else if (!urlPattern.test(field)) setErrorMessage(`Введите корректный URL-адрес`)
    if (!errorMessage) setIsValid(true)
    else setIsValid(false)
  }, [field, errorMessage])

  return [isValid, errorMessage]
};

export default useValidateUrl;
