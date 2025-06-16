import React from 'react'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <div className={styles.footercontainer}> 
      <ul className={styles.navLinks}>
        <li>Help</li>
        <li>Status</li>
        <li>About</li>
        <li>Careers</li>
        <li>Press</li>
        <li>Blog</li>
        <li>Privacy</li>
        <li>Rules</li>
        <li>Terms</li>
        <li>Text to speech</li>
      </ul>
    </div>
  )
}

export default Footer
