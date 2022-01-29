import styles from "../../styles/social-art/BoardFrames.module.scss"
import CanvasDraw from "react-canvas-draw"

export default function FrameArt({data, width}){
    return <>
    <CanvasDraw
        className={styles.frameArt}
        canvasWidth={width >= 370 ? 340 : width >= 315 ? 290 : 250}
        canvasHeight={width >= 315 ? 400 : 360}
        hideGrid={true}
        disabled={true}
        saveData={data}
        immediateLoading={true}
        lazyRadius={0}
        brushRadius={0}
        brushColor={"rgba(255, 255, 255, 0)"}
        catenaryColor={"rgba(255, 255, 255, 0)"}
    />
    </>
}