import styles from "../../styles/social-art/HomeSocialArt.module.scss"
import Image from "next/image"

export default function HomeSocialArt(){
    return <div className={styles.root}>
    <div className={styles.graphics}>
        <Image 
            className={styles.image}
            alt="Elephant"
            src="/elephant.svg"
            layout="fill"
            priority="true"
        />
    </div>
    <div className={styles.content}>
        <h2 className={styles.title}>
            <p>Design your canvas and be inspired by others</p>
        </h2>
    </div>
</div>
}