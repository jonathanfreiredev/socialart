import styles from "../styles/DescriptionProject.module.scss"
import Accordion from "./Accordion"

export default function DescriptionProject({title, description, accordionInfo}){
    return <div className={styles.root}>
       <div className={styles.container}>
            <h4>{title}</h4>
            <div className={styles.description}>
                <p>{description}</p>
            </div>
            <Accordion info={accordionInfo} />
            <p className={styles.updated}>Updated January 27th 2022</p>
       </div>
</div>
}