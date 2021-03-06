import styles from "../../styles/social-art/HomeSocialArt.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaintBrush} from '@fortawesome/free-solid-svg-icons'
import Image from "next/image"
import Link from "next/link"

export default function HomeSocialArt(){
    return <div className={styles.root}>
    <div className={styles.graphics}>
        <Image 
            className={styles.image}
            alt="Elephant"
            src="https://res.cloudinary.com/ddjovluur/image/upload/v1643728722/socialart/elephant_hqoyqd.svg"
            layout="fill"
            priority="true"
        />
    </div>
    <div className={styles.content}>
        <h2 className={styles.title}>
            <p>Be creative and share it!</p>
        </h2>
            <Link href="/#drawer">
                <a>
                CREATE YOUR CANVAS{" "}<FontAwesomeIcon icon={faPaintBrush} />
                </a>
            </Link>
    </div>
</div>
}