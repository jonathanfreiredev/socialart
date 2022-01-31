import styles from "../styles/Loading.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBatteryThreeQuarters, faBicycle, faCalculator, faCameraRetro, faCat, faCode, faCoffee, faCompactDisc, faDatabase, faGolfBall, faPaintBrush, faPizzaSlice, faPlane, faRunning, faShieldAlt, faUmbrellaBeach, faWater} from '@fortawesome/free-solid-svg-icons'
import {faApple, faGithub, faNode, faReact} from '@fortawesome/free-brands-svg-icons'

export default function IconsLoading(){
    return <div className={styles.iconsLine}>
        <FontAwesomeIcon icon={faPaintBrush} />
        <FontAwesomeIcon icon={faReact} />
        <FontAwesomeIcon icon={faWater} />
        <FontAwesomeIcon icon={faApple} />
        <FontAwesomeIcon icon={faCompactDisc} />
        <FontAwesomeIcon icon={faCat} />
        <FontAwesomeIcon icon={faBicycle} />
        <FontAwesomeIcon icon={faBatteryThreeQuarters} />
        <FontAwesomeIcon icon={faCalculator} />
        <FontAwesomeIcon icon={faUmbrellaBeach} />
        <FontAwesomeIcon icon={faGithub} />
        <FontAwesomeIcon icon={faNode} />
        <FontAwesomeIcon icon={faCameraRetro} />
        <FontAwesomeIcon icon={faCode} />
        <FontAwesomeIcon icon={faCoffee} />
        <FontAwesomeIcon icon={faDatabase} />
        <FontAwesomeIcon icon={faShieldAlt} />
        <FontAwesomeIcon icon={faRunning} />
        <FontAwesomeIcon icon={faPlane} />
        <FontAwesomeIcon icon={faPizzaSlice} />
        <FontAwesomeIcon icon={faGolfBall} />
    </div>
        
}