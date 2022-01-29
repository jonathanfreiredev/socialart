import styles from "../styles/Navbar.module.scss"
import Link from "next/link"
import { signOut, useSession } from 'next-auth/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

export default function Navbar({title, refTitle}){
    const [ session, loading ] = useSession();
    const handleLogout = ()=>{
        signOut({redirect: true})
    }
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
                <div className={styles.nav}>
                    <div>
                        <Link href="https://www.jonathanfreire.com">
                            <a>
                                <p>
                                    Home.
                                </p>
                            </a>
                        </Link>
                    </div>
                    <div>
                        <Link href="https://www.jonathanfreire.com/#contact">
                            <a>
                                <p>
                                    Contact.
                                </p>
                            </a>
                        </Link>
                    </div>
                    {session ?
                        <div className={styles.signout}>
                            <div onClick={handleLogout} className={styles.iconLogout}>
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </div>
                        </div>
                    :
                        <>
                            <div>
                                <Link href="/signin">
                                    <a>
                                        <p>
                                            Sign in
                                        </p>
                                    </a>
                                </Link>
                            </div>
                            <div>
                                <Link href="/signup">
                                    <a>
                                        <p>
                                            Sign up
                                        </p>
                                    </a>
                                </Link>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    </div>
}