import React, { useState, useEffect } from "react";
import './createUserModal.scss';

import axios from "axios"

function CreateUserModal() {


  return (
    <div>

      <head>
        <link rel="stylesheet" type="text/css" href="modalstyle.css"></link>
      </head>

      <body>
        <form class="myForm" method="get" enctype="application/x-www-form-urlencoded" action="/html/codes/html_form_handler.cfm">

          <p>
            <label>First Name:</label>
            <input type="text" name="fname" required></input>
          </p>
          <p>
            <label>Last Name:</label>
            <input type="text" name="lname" required></input>
          </p>

          <p>
            <label>Email:</label>
            <input type="email" name="email_address"></input>
          </p>

          <p>
            <label>Favorite Stock</label>
            <select id="fav-stock" name="fav-stock">
                <option value="" selected="selected">Select One</option>
                <option value="google" >GOOGL</option>
                <option value="apple" >AAPL</option>
                <option value="facebook" >FB</option>
            </select>
          </p>


          <p><button>Create User</button></p>

        </form>

      </body>

    </div>
  );

}

export default CreateUserModal;