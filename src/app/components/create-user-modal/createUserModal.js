import React, { useState, useEffect } from "react";
import './createUserModal.scss';
import { motion } from "framer-motion";


import axios from "axios"

// stocks is dict with companyName, symbol, id
function CreateUserModal({ stocks, onCreateUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedStockId, setSelectedStockId] = useState(stocks[0]._id);
  const [errorMessage, setErrorMessage] = useState("");

  function handleCancel() {
    onCreateUser();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Put together new user information
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      favoriteStockId: selectedStockId
    }

    // Create new user by sending a POST request to the backend 
    const createdUser = await axios.post("https://zothacks-2020-workshop.herokuapp.com/user", newUser);

    if (createdUser.status === 200 && createdUser.data) {
      // go back to main page and render updated userList 
      setErrorMessage("");
      onCreateUser();
    } else {
      console.log("Failure occured");
      setErrorMessage("Failed to create user. Please try again.")
    }
  }

  function renderStockOptions() {
    const options = stocks.map(function (stock) {
      return <option key={stock._id} value={stock._id}>{stock.companyName + " (" + stock.symbol + ")"}</option>
    });
    return options;
  }

  return (
    <motion.div
      animate={{
        opacity: [0, 1],
      }}
      transition={{
        duration: 0.5,
      }}
      className="selected-stock flex-center"
    >
      <form className="myForm" onSubmit={handleSubmit}>
        <label>First Name</label>
        <input type="text" name="fname" value={firstName} onChange={(event) => setFirstName(event.target.value)} required></input>

        <label>Last Name</label>
        <input type="text" name="lname" value={lastName} onChange={(event) => setLastName(event.target.value)} required></input>

        <label>Email</label>
        <input type="email" name="email_address" value={email} onChange={(event) => setEmail(event.target.value)}></input>

        <label>Favorite Stock</label>
        <select
          id="fav-stock"
          name="fav-stock"
          value={selectedStockId} // might want to handle no selection better later
          onChange={(event) => { setSelectedStockId(event.target.value) }}
        >
          {renderStockOptions()}
        </select>
        <input className="button" type="submit" value="Create User" />
        <button className="button" type="button" onClick={handleCancel}>Cancel</button>
        <p id="error-message">{errorMessage}</p>
      </form>
    </motion.div>

  );
}

export default CreateUserModal;
