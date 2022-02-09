import styles from "../styles/Footer.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"

export default function Footer(){
    const handleCookieSettings = (e)=> {
        e.preventDefault();
        window.cookiehub.openSettings();
    }
    return <div id="footer" className={styles.root}>
        <div className={styles.container}>
            <div className={styles.message}>
                <p>With <FontAwesomeIcon icon={faHeart} className={styles.iconHeart} /> from Berlin.</p>
            </div>
            <div className={styles.content}>
                <div className={styles.policy}>
                    <p>
                        © 2021 Jonathan Freire | <Link href="https://www.jonathanfreire.com/privacy-policy"><a>Privacy policy</a></Link>
                    </p>
                    <p className={styles.cookieSettings}><a href="" onClick={handleCookieSettings}>Cookie settings</a></p>
                </div>
                <div className={styles.socialMedia}>
                    <span>
                        <a href="https://github.com/jonathanfreiredev"><FontAwesomeIcon icon={faGithub} className={styles.iconSocialMedia} /></a>
                        <a href="https://www.linkedin.com/in/jonathan-freire/"><FontAwesomeIcon icon={faLinkedin} className={styles.iconSocialMedia} /></a>
                    </span>
                </div>
            </div>
        </div>
    </div>
}