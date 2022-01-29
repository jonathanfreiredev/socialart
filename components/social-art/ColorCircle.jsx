import styles from "../../styles/social-art/ColorCircle.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import cn from "classnames"

export default function ColorCircle({color, onSaveColor, isNewColor, onSelectedColor}){
    return <div className={isNewColor ? cn(styles.newColor, styles.outerCircle) : styles.outerCircle} >
            <div className={styles.innerCircle} onClick={(e)=> isNewColor ? onSaveColor(): onSelectedColor(color)}>
                {isNewColor &&
                    <FontAwesomeIcon icon={faPlus} className={styles.iconPlus} />
                }
                <style jsx>
                    {`.${styles.innerCircle}{
                        background: rgba(${color.r}, ${color.g}, ${color.b}, ${color.a});
                        }
                    `}
                </style>
            </div>
    </div>
}