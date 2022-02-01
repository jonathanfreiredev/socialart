import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from "../styles/Navbar.module.scss"

export default function NavbarCollapse({ handleClick, fa}){
    return <div className={styles.containerNavbarCollapse} onClick={handleClick}>
        <FontAwesomeIcon icon={fa} /> 
    </div>
}