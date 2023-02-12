import React, { useState } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrappers/Wrapper";
const AddUser = (props) => {
  const [enteredValue, setValue] = useState(" ");
  const [enteredAge, setAge] = useState(" ");
  const [error,setError]=useState('')
  const addUserHandler = (event) => {
    event.preventDefault();
    if(enteredValue.trim().length===0 || enteredAge.trim().length===0)
    {
        setError({
            title:'Invalid input',
            message:'Please enter valid name and age'
        })
        return;
    }
    if(+enteredAge < 1)
    {
        setError({
            title:'Invalid Age',
            message:'Please enter valid age'
        })
        return;
    }
    
    props.onAddUser(enteredValue,enteredAge)
    setValue("");
    setAge("");
  };
  const setUserHandler = (event) => {
    setValue(event.target.value);
  };
  const setAgeHandler = (event) => {
    setAge(event.target.value);
  };

  const errorHandler=()=>{
    setError(null)
  }

  return (
    <Wrapper>
    {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={enteredValue}
          onChange={setUserHandler}
        ></input>
        <label htmlFor="age">Age (Years):</label>
        <input
          type="number"
          id="age"
          value={enteredAge}
          onChange={setAgeHandler}
        ></input>
        <Button type="submit">Add user</Button>
      </form>
    </Card>
    </Wrapper>
  );
};

export default AddUser;
