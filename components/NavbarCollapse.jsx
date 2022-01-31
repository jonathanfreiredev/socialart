import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faWater, faTimes} from '@fortawesome/free-solid-svg-icons'
import styles from "../styles/Navbar.module.scss"

export default function NavbarCollapse({openMenuResponsive, handleClick}){
    return <div className={styles.containerNavbarCollapse} onClick={handleClick}>
        {openMenuResponsive ?
            <FontAwesomeIcon icon={faTimes} /> 
        :
            <FontAwesomeIcon icon={faWater} />
        }
    </div>
}