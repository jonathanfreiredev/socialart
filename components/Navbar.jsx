import styles from "../styles/Navbar.module.scss"
import Link from "next/link"
import { signOut, useSession } from 'next-auth/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import React, { useState, useEffect } from 'react'
import NavbarCollapse from "./NavbarCollapse";
import MenuResponsive from "./MenuResponsive";
import ButtonNavbar from "./ButtonNavbar";

export default function Navbar({title, refTitle}){
    const [ session, loading ] = useSession();
    const [windowWidth, setWindowWidth] = useState(0);
    const [openMenuResponsive, setOpenMenuResponsive] = useState(false);
    const links = {
        homejf:{
            name: "Home JF.",
            link: "https://www.jonathanfreire.com"
        },
        contact:{
            name: "Contact.",
            link: "https://www.jonathanfreire.com/#contact"
        },
        signin:{
            name: "Sign in",
            link: "/signin"
        },
        signup:{
            name: "Sign up",
            link: "/signup"
        }
    }
    const handleLogout = ()=>{
        signOut({redirect: true})
    }
    const updateDimensions = () => {
        console.log(window.innerWidth)
        setWindowWidth(window.innerWidth);
    }
    const handleOpenCollapseMenu = ()=>{
        setOpenMenuResponsive(!openMenuResponsive);
    }

    useEffect(() => { 
        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize",updateDimensions);
    }, []);

    useEffect(()=>{
        if(windowWidth > 800){
            setOpenMenuResponsive(false);
        }
    },[windowWidth])

    return <div className={styles.root}>
        <div className={styles.container}>
            <div className={styles.brand}>
                <Link href={refTitle}>
                    <a>
                        <h1 className={styles.title}>
                            <strong className={styles.name}>{title}</strong>
                        </h1>
                    </a>
                </Link>
            </div>
            <div className={styles.menu}>
                {windowWidth > 800 ?
                    <div className={styles.nav}>
                        <ButtonNavbar link={links.homejf.link} name={links.homejf.name} />
                        <ButtonNavbar link={links.contact.link} name={links.contact.name} />
                        {session ?
                            <div className={styles.signout}>
                                <div onClick={handleLogout} className={styles.iconLogout}>
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </div>
                            </div>
                        :
                            <>
                                <ButtonNavbar link={links.signin.link} name={links.signin.name} />
                                <ButtonNavbar link={links.signup.link} name={links.signup.name} />
                            </>
                        }
                    </div>
                :   
                    <NavbarCollapse openMenuResponsive={openMenuResponsive} handleClick={handleOpenCollapseMenu} />
                }
            </div>
        </div>
        {openMenuResponsive && windowWidth <= 800 &&
            <MenuResponsive session={session} links={links} handleLogout={handleLogout} />
        }
    </div>
}