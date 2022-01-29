import styles from "../styles/Accordion.module.scss"

export default function AccordionItem ({item, index, onChangeAccordionItem, isActive}){
    return <div className={styles.accordionItem}>
        <button type="button" className={styles.accordionTitle} onClick={()=>onChangeAccordionItem(index)}>{item.title}</button>
        {isActive &&
            <div className={styles.accordionContent}>{item.content}</div>
        }
    </div>
}