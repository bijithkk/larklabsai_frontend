import React from 'react'
import styles from './Home.module.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleStartReading = () => {
    navigate('/blogs');
  };
  return (
    <div className={styles.homecontainer}>
        <div className={styles.headingcontainer}>
            <h2 className={styles.heading}>Human <br /> stories & ideas</h2>
            <p>A place to read, write, and deepen your understanding</p>
            <button className={styles.button} onClick={handleStartReading}>Start reading</button>
        </div>
      <div className={styles.imgcontainer}></div>
    </div>
  )
}

export default Home
