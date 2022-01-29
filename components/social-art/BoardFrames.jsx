import styles from "../../styles/social-art/BoardFrames.module.scss"
import CardFrameArt from "./CardFrameArt"

export default function BoardFrames({frames, onEdit, user, onDrawer, displayDrawer, width}){
    return <section id="board-frames" className={styles.root}>
        <div className={styles.container}>
            <div className={styles.frames}>
                {frames.map((frame)=>
                    <div key={frame.id} className={styles.content}>
                        <CardFrameArt onEdit={onEdit} user={user} frame={frame} onDrawer={onDrawer} displayDrawer={displayDrawer} width={width} />
                    </div>
                )}
            </div>
        </div>
    </section>
}