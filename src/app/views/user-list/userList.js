import React, { useState, useEffect } from "react";
import "./userList.scss";

import axios from "axios"

import { UserCard} from "app/components";
import CreateUserModal from 'app/components/createUserModal/createUserModal.js';

function UserList() {

  // List of users from the database
  const [users, setUsers] = useState(null);

  // Get the list of users from the database upon page load
  useEffect(() => {
    getUserList();
  }, []);

  // Get the list of users through a GET request to the backend API
  async function getUserList() {
    let users = await axios.get("https://zothacks-2020-workshop.herokuapp.com/user");

    // If we get a valid response, set the state object, or print an error.
    if (users.status === 200) {
      setUsers(users.data.data);
    } else {
      console.log("Error retrieving users");
    }
  }

  return (
    <div className="user-list">
      <button className="button">Create User</button>
      <CreateUserModal stocks={
        // todo change this to fetch from backend
        [{
          id: 2,
          companyName : "Google",
          symbol : "GOOGL"
        },
        {
          id: 1,
          companyName : "Apple",
          symbol : "AAPL"
        },
        {
          id: 3,
          companyName : "Facebook",
          symbol : "FB"
        }]
      }/>
      {(users || []).map(function (user, index) {
        return <UserCard user={user} key={index} number={index}/>;
      })}
    </div>
  );
}

export default UserList;
