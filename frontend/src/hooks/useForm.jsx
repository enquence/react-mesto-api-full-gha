import { useState } from 'react';

const UseForm = (inputValues) => {

  const valuesToFlags = (values) => {
    const flags = {}
    Object.keys(values).forEach(key => flags[key] = false)
    return flags
  }

  const [values, setValues] = useState(inputValues);
  const [modifiedFlags, setModifiedFlags] = useState(valuesToFlags(inputValues))

  const handleChange = (evt) => {
    const {value, name} = evt.target;
    setValues({...values, [name]: value});
    setModifiedFlags({...modifiedFlags, [name]: true})
  };

  const resetFlags = () => {
    setModifiedFlags(valuesToFlags(values))
  }

  return {values, setValues, modifiedFlags, resetFlags, handleChange};
};

export default UseForm;
