import React, { useState, useEffect } from "react";
import './createUserModal.scss';

import axios from "axios"

// stocks is dict with companyName, symbol, id
function CreateUserModal({stocks, onCreateUser}) {

  const [selectedStock, setSelectedStock] = useState(null);

  return (
      <form
        className="myForm"
        onSubmit={
          (event) => {
            event.preventDefault();
            onCreateUser();
            // todo call create user endpoint
            // only submit form if selected stock is not null
            // route to main page after
          }
        }>
          <label>First Name:</label>
          <input type="text" name="fname" required></input>

          <label>Last Name:</label>
          <input type="text" name="lname" required></input>

          <label>Email:</label>
          <input type="email" name="email_address"></input>

          <label>Favorite Stock</label>
          <select
            id="fav-stock"
            name="fav-stock"
            onChange={(event) => {
              setSelectedStock(event.target.value)}}
          >
            {
              (stocks || []).map(function (stock) {
                return <option key={stock.id} value={stock.id}>{stock.companyName + " (" + stock.symbol + ")"}</option>
              })
            }
          </select>
          <input className="button" type="submit" value="Create User" />
          <button className="button" onClick={() => onCreateUser()}>Cancel</button>
      </form>
  );
}

export default CreateUserModal;
