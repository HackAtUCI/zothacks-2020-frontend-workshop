import React from "react";
import "./userCard.scss";

import { Link } from "react-router-dom";
import { motion } from "framer-motion"

function UserCard({ user, number }) {
  return (
    <Link to={"/stock/" + user.favoriteCompany}>
      <motion.div 
        animate={{
          opacity: [0, 1],
        }}
        transition={{
          duration: 0.2,
          delay: number * 0.1
        }}
      className="user-card">
        <div className="tag">
          <h1>{number}</h1>
        </div>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <h3>{user.email}</h3>
        <h4>{user.favoriteCompany}</h4>
      </motion.div>
    </Link>
  );
}

export default UserCard;
