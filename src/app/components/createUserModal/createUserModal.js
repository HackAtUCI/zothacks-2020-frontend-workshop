import React, { useState, useEffect } from "react";
 
import axios from "axios"
 
function CreateUserModal() {
 
 
 return (
   <div>

    <head>
    <link rel="stylesheet" type = "text/css" href="modalstyle.css"></link>
    </head>

   <body>
   <form class="myForm" method="get" enctype="application/x-www-form-urlencoded" action="/html/codes/html_form_handler.cfm">
 
   <p>
   <label>First Name: 
   <input type="text" name="fname" required></input>
   </label>
   </p>
   <p>
   <label>Last Name: 
   <input type="text" name="lname" required></input>
   </label>
   </p>
 
   <p>
     <label>Email: 
     <input type="email" name="email_address"></input>
     </label>
   </p>
  
   <p>
   <label>Pickup Place
   <select id="pickup_place" name="pickup_place">
   <option value="" selected="selected">Select One</option>
   <option value="google" >GOOGL</option>
   <option value="apple" >AAPL</option>
   <option value="facebook" >FB</option>
   </select>
   </label>
   </p>
 
 
<p><button>Submit Account</button></p>
 
</form>
 
</body>

</div>
 );

}
 
export default CreateUserModal;