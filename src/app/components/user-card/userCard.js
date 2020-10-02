import React from "react";
import './userCard.scss';

import { Link } from "react-router-dom";

function UserCard({ user }) {
  return (
    <Link to={"/user/" + user}>
      <div className="user-card">
        hello user
      </div>
    </Link>
  );
}

export default UserCard;
