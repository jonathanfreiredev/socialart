import CanvasDraw from "react-canvas-draw"
import styles from "../../styles/social-art/DrawerSocialArt.module.scss"
import { forwardRef } from "react"

const CanvasSocialArt = forwardRef((props, ref)=>{
    return <CanvasDraw 
        brushColor={`rgba(${props.color.r}, ${props.color.g}, ${props.color.b}, ${props.color.a})`}
        brushRadius={props.thickness}
        catenaryColor={`rgba(${props.color.r}, ${props.color.g}, ${props.color.b}, ${props.color.a})`}
        lazyRadius={0}
        immediateLoading={true}
        className={styles.canvas}
        canvasWidth={props.width >= 525 ? 500 : props.width >= 425 ? 400 : props.width >= 370 ? 345 : props.width >= 315 ? 300 : 250 }
        canvasHeight={props.width >= 525 ? 500 : props.width >= 425 ? 400 : props.width >= 315 ? 360 : 310 }
        hideGrid={true}
        ref={ref}
    />
})
CanvasSocialArt.displayName = 'CanvasSocialArt';
export default CanvasSocialArt;