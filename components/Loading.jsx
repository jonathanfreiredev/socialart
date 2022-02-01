import styles from "../styles/Loading.module.scss"

export default function Loading(){
    return <div className={styles.root}>
        <div className={styles.container}>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
            <div className={styles.ball}></div>
        </div>
        <p>loading ...</p>
    </div>
}