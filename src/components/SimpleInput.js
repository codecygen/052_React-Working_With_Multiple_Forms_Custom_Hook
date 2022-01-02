import { useState } from 'react';
import useInput from '../hooks/use-input';

const SimpleInput = (props) => {

  const { 
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError, 
    valueChangeHandler: nameChagedHandler, 
    inputBlurHandler: nameBlurHandler, 
    reset: resetNameInput
  } = useInput(value => value.trim() !== '');

  // const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');


  // const enteredNameIsValid = enteredName.trim() !== '';
  const emailCheck = enteredEmail => {
    const emailFilter = enteredEmail
      .toString()
      .toLowerCase()
      .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (emailFilter === null) {
      return false;
    }

    return true;
  };

  const enteredEmailIsValid = emailCheck(enteredEmail);

  // const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  // const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;


  console.log(`Typed name: ${enteredName}`);
  console.log(`Typed email: ${enteredEmail}`);

  // const nameInputChangeHandler = event => {
  //   setEnteredName(event.target.value);
  // };

  const emailInputChangeHandler = event => {
    setEnteredEmail(event.target.value);
  };

  // const nameInputBlurHandler = event => {
  //   setEnteredNameTouched(true);
  // };

  const emailInputBlurHandler = event => {
    setEnteredEmailTouched(true);
  };


  const formSubmissionHandler = event => {
    event.preventDefault();

    // setEnteredNameTouched(true);
    setEnteredEmailTouched(true);

    if (!formIsValid) {
      return;
    }

    console.log(`Submitted name is ${enteredName}.`);
    console.log(`Submitted email is ${enteredEmail}.`);

    // setEnteredName('');
    resetNameInput();
    setEnteredEmail('');

    // setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
  }

  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameChagedHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className="error-text">Name must not be empty</p>}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor='email'>Your Email</label>
        <input 
          type='text' 
          id='email'
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail}
        />
        {emailInputIsInvalid && <p className="error-text">Please enter a valid email!</p>}
      </div>
      <div className="form-actions">
        {/* <button disabled={!formIsValid}>Submit</button> */}
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
