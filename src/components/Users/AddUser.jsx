// AddUser.jsx
import React, { useState, useRef } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const enteredUsernameRef = useRef('');
  const enteredAgeRef = useRef('');
  const enteredCollegeRef = useRef('');
  const [error, setError] = useState(null);
  const [userList, setUserList] = useState([]);

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredUsername = enteredUsernameRef.current.value;
    const enteredAge = enteredAgeRef.current.value;
    const enteredCollege = enteredCollegeRef.current.value;

    if (
      enteredUsername.trim().length === 0 ||
      enteredAge.trim().length === 0 ||
      enteredCollege.trim().length === 0
    ) {
      setError({
        title: 'Invalid input',
        message: 'Please enter valid values for all fields.',
      });
      return;
    }

    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }

    const newUser = {
      id: Math.random().toString(),
      name: enteredUsername,
      age: enteredAge,
      college: enteredCollege,
    };

    setUserList((prevUserList) => [...prevUserList, newUser]);

    // Clear input values
    enteredUsernameRef.current.value = '';
    enteredAgeRef.current.value = '';
    enteredCollegeRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            ref={enteredUsernameRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={enteredAgeRef} />
          <label htmlFor="college">College Name</label>
          <input id="college" type="text" ref={enteredCollegeRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>

      {/* Display entered values */}
      <Card className={classes.userList}>
        <ul>
          {userList.map((user) => (
            <li key={user.id}>
              {user.name} ({user.age} years old, {user.college})
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default AddUser;
