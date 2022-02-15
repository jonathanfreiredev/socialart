import styles from "../styles/Account.module.scss"
import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export default function InputPassword ({title, name, value, handleChange }){
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = ()=>{
        setShowPassword(!showPassword);
    }

    return <label>
    <p>{title}</p>
    <div>
        <input type={showPassword ? "text" : "password"} name={name} value={value} onChange={handleChange} />
        <button type="button" className={styles.showPassword} onClick={handleShowPassword}>
            {!showPassword ? 
                <FontAwesomeIcon icon={faEye} />
            :
                <FontAwesomeIcon icon={faEyeSlash} />
            }
        </button>
    </div>
</label>
}