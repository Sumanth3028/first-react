import React, { useState ,useRef} from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrappers/Wrapper";
const AddUser = (props) => {
    const nameInputRef=useRef();
    const ageInputRef=useRef()
    const collegeInputRef=useRef()
  const [error,setError]=useState('')
  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName=nameInputRef.current.value;
    const enteredUserAge=ageInputRef.current.value;
    const enteredCollege=collegeInputRef.current.value
    if(enteredName.trim().length===0 || enteredUserAge.trim().length===0 || enteredCollege.trim().length===0)
    {
        setError({
            title:'Invalid input',
            message:'Please enter valid name and age and college'
        })
        return;
    }
    if(+enteredUserAge < 1)
    {
        setError({
            title:'Invalid Age',
            message:'Please enter valid age'
        })
        return;
    }
    
    props.onAddUser(enteredName,enteredUserAge,enteredCollege)
    nameInputRef.current.value='';
    ageInputRef.current.value='';
    collegeInputRef.current.value=''
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
          ref={nameInputRef}
        ></input>
        <label htmlFor="age">Age (Years):</label>
        <input
          type="number"
          id="age"
          ref={ageInputRef}
        ></input>
         <label htmlFor="collegename">CollegeName:</label>
        <input
          type="text"
          id="collegename"
          ref={collegeInputRef}
        ></input>
        <Button type="submit">Add user</Button>
      </form>
    </Card>
    </Wrapper>
  );
};

export default AddUser;
