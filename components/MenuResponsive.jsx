import styles from "../styles/Navbar.module.scss"
import ButtonNavbar from "./ButtonNavbar"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons'

export default function MenuResponsive({session, links, handleLogout}){
    return <div className={styles.containerMenuResponsive}>
        <ButtonNavbar link={links.homejf.link} name={links.homejf.name} />
        <ButtonNavbar link={links.contact.link} name={links.contact.name} />
        {session ?
            <div onClick={handleLogout}>
                <p>
                    Log out.
                </p>
            </div>
        :
            <>
                <ButtonNavbar link={links.signin.link} name={links.signin.name} />
                <ButtonNavbar link={links.signup.link} name={links.signup.name} />
            </>
        }
    </div>
}