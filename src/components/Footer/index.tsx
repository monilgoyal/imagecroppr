import React from 'react'
import styles from '../../styles/Footer.module.css'
function Footer() {
    return (
        <footer className={styles.footer}>
            Made with{' '}
            <span className={styles.logo}>
                ❤
            </span>
        </footer>
    )
}

export default Footer