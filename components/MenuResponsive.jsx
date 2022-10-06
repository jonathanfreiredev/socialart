import styles from "../styles/Navbar.module.scss"
import ButtonNavbar from "./ButtonNavbar"
import cn from "classnames"
import NavbarCollapse from "./NavbarCollapse";
import {faTimes} from '@fortawesome/free-solid-svg-icons'

export default function MenuResponsive({links, openMenuResponsive, handleOpenCollapseMenu}){
    
    return <div className={cn(styles.containerMenuResponsive, (openMenuResponsive ? styles.openedMenuResponsive : styles.closedMenuResponsive))}>
        <div className={styles.content}>
            <NavbarCollapse handleClick={handleOpenCollapseMenu} fa={faTimes} />
            <ButtonNavbar link={links.homejf.link} name={links.homejf.name} />
            <ButtonNavbar link={links.contact.link} name={links.contact.name} />
        </div>
    </div>
}