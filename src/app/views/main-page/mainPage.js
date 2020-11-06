import React, { useState, useEffect } from "react";
import "./mainPage.scss";

import axios from "axios"

import {UserList} from "app/components";
import {CreateUserModal} from 'app/components';

function MainPage() {

  // Set up state of this React component
  const [showModal, setShowModal] = useState(false); // used to toggle modal visibility
  const [users, setUsers] = useState(null);  // List of users from the database
  const [stocks, setStocks] = useState(null);  // List of stocks from database

  // Get the list of users and stock from the database upon page load
  useEffect(() => {
    getUserList();
    getStockList();
  }, []);

  // Get the list of users through a GET request to the backend server
  async function getUserList() {
    let users = await axios.get("https://zothacks-2020-workshop.herokuapp.com/user");

    // If we get a valid response, set the state object, or print an error.
    if (users.status === 200) { // on success
      setUsers(users.data.data);
    } else { // error handling
      console.log("Error retrieving users");
    }
  }

  // Get the list of stocks through a GET request to the backend server
  async function getStockList(){
    let stocks = await axios.get("https://zothacks-2020-workshop.herokuapp.com/stock");
    if (stocks.status === 200){ // on success 
      setStocks(stocks.data.data);
    }
    else{ // error handling
      console.log("Error retrieving stocks");
    }
  }

  // This function will be passed into the CreateUserModal child component
  // This will allow CreateUserModal to manipulate the state of the mainPage to hide itself and refresh the user list
  function refreshPage(){
    setShowModal(false);
    getUserList();
  }

  return (
    <div>
      <div className={showModal ? "blur" : ""}>
        <UserList users={(users || [])}/>
        <button className="button" id = "create-button" onClick={() => setShowModal(true)}>Create New User</button>
      </div>

    {/* This ternary operator returns the CreateUserModal if showModal = true, else returns null => nothing will be rendered */}
    {showModal ? <CreateUserModal stocks = {stocks || []} onCancel ={() => setShowModal(false)} onCreate={refreshPage}/> : null}
    </div>
  );
}

export default MainPage;
