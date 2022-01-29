import styles from "../../styles/social-art/SliderPencil.module.scss"
import cn from "classnames"
export default function SliderPencil({max, step, defaultValue, onChangeSlider}){
    const handleChangeValue = (e)=>{
      onChangeSlider(e.target.value);
    }
    return <div className={cn(styles.container, styles.thickness)}>
      <input 
        type="range" 
        min="1" 
        max={max} 
        step={step} 
        defaultValue={defaultValue}
        className={cn(styles.sliderThickness,styles.slider)} 
        onChange={handleChangeValue} >
      </input>
    </div>
}