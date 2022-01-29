import Link from "next/link"
import styles from "../styles/LoginRequest.module.scss"
import cn from "classnames"

export default function LoginRequest({text, id}){
    return <div id={id} className={styles.container}>
        <p>
            {text}
        </p>
        <div className={styles.containerButtons}>
            <div className={styles.button}>
                <Link href="/signin">
                    <a className={styles.link}>
                        <p>
                            Sign in
                        </p>
                    </a>
                </Link>
            </div>
            <div className={styles.button}>
                <Link href="/signup">
                    <a className={cn(styles.link,styles.lastLink)}>
                        <p>
                            Sign up
                        </p>
                    </a>
                </Link>
            </div>
        </div>
    </div>
}