import AccordionItem from "./AccordionItem"
import styles from "../styles/Accordion.module.scss"
import { useState } from "react"

export default function Accordion ({info}){
    const [indexItemActive, setIndexItemActive] = useState();
    const handleChangeAccordionItem = (index)=>{
        if(indexItemActive === index){

        }
        setIndexItemActive(indexItemActive !== index ? index : null)
    }
    return <div className={styles.accordion}>
        {info.map((item, index)=>{
            return <AccordionItem key={index} index={index} item={item} onChangeAccordionItem={handleChangeAccordionItem} isActive={indexItemActive === index && true} />
        })}
    </div>
}