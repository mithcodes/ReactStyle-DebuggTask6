// UsersList.js
import React from 'react';
import Card from '../UI/Card';
import classes from './UserList.module.css';

const UsersList = (props) => {
  const users = props.users || [];

  return (
    <Card className={classes.users}>
      <ul className={classes.list}>
        {users.map((user) => (
          <li key={user.id} className={classes.item}>
            {user.name} ({user.age} years old)
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default UsersList;
