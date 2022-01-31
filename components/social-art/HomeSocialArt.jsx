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
            src="/elephant.svg"
            layout="fill"
            priority="true"
        />
    </div>
    <div className={styles.content}>
        <h2 className={styles.title}>
            <p>Design your canvas and be inspired by others</p>
        </h2>
            <Link href="/#drawer">
                <a>
                CREATE A DRAWING{" "}<FontAwesomeIcon icon={faPaintBrush} />
                </a>
            </Link>
    </div>
</div>
}