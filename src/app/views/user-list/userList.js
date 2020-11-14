import React, { useState, useEffect } from "react";
import "./userList.scss";

import axios from "axios";

import { UserCard } from "app/components";
import { CreateUserModal } from "app/components";

function UserList() {

  // List of users from the database
  const [users, setUsers] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stocks, setStocks] = useState([]);

  // Get the list of users from the database upon page load
  useEffect(() => {
    getUserList();
    getStockList();
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

  // Get the list of stocks through a GET request to the backend server

  async function getStockList() {
    let stocks = await axios.get("https://zothacks-2020-workshop.herokuapp.com/stock");
    if (stocks.status === 200) {
      setStocks(stocks.data.data);
    } else {
      // error
      console.log("Error retrieving stocks");
    }
  }

  // This function will be passed into the CreateUserModal child component
  // This will allow CreateUserModal to manipulate the state of the mainPage to hide itself and refresh the user list
  function refreshPage() {
    setShowModal(false);
    getUserList();
  }

  return (
    <div>

      <div className={showModal ? "blur" : ""}>
        <div className="user-list">
          {(users || []).map(function (user, index) {
            return <UserCard user={user} key={index} number={index} />;
          })}
        </div>

        <button className="button" onClick={() => setShowModal(true)}>Create New User</button>
      </div>

      {/* This ternary operator returns the CreateUserModal if showModal = true, else returns null => nothing will be rendered */}


      { showModal ?
        <CreateUserModal
          stocks={stocks}
          onCancel={() => setShowModal(false)}
          onCreate={refreshPage}
        />
        : null
      }
    </div>

  );
}

export default UserList;
