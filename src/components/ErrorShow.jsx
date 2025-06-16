import React from 'react'
import styles from './ErrorShow.module.css';

const ErrorShow = ({ message, onClose }) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>⚠️</div>
        <div className={styles.errorMessage}>
          {message || 'An error occurred'}
        </div>
        {onClose && (
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default ErrorShow
