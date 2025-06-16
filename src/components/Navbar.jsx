import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Signup from "./Signup";

const Navbar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSignInClick = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <>
      <div className={styles.navcontainer}>
        <p className={styles.logo}>Medium</p>
        <ul className={styles.navLinks}>
          <li>Our Story</li>
          <li>Membership</li>
          <li>Write</li>
          <li onClick={handleSignInClick}>Sign in</li>
        </ul>
      </div>

      <Signup isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
};

export default Navbar;
