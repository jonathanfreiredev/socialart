import { useState } from "react"
import { useRouter } from "next/dist/client/router"
import styles from "../../styles/social-art/DrawerSocialArt.module.scss"
import CanvasSocialArt from "./CanvasSocialArt"
import ColorCircle from "./ColorCircle"
import { RgbaColorPicker } from "react-colorful"
import SliderPencil from "./SliderPencil"
import { v4 as uuidv4 } from 'uuid'
import { useSession } from "next-auth/client"
import cn from "classnames"
import LoginRequest from "../LoginRequest"

export default function DrawerSocialArt({mouseOver, mouseOut, canvasRef, isEditing, onIsEditing, frameInEdit, width}){
    const contentType = 'application/json';
    const defaultColor ={r:121, g:136, b:210, a:1};
    const [colors, setColors] = useState([{r:29, g:29, b:29, a:1},{r:88, g:134, b:233, a:1}]);
    const [color, setColor] = useState(defaultColor);
    const [thickness, setThickness] = useState(10);
    const [session, loading] = useSession();
    const router = useRouter();
    /* POST a new frame to mongoDB */
    const postFrame = async (data) => {
        try {
            const res = await fetch('/api/frames', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify(data),
            });
            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status);
            }
        } catch (error) {
            console.log(error);
        }
    }

    /* PUT a existing frame to mongoDB */
    const putFrame = async (data) => {
        try {
          const res = await fetch(`/api/frames/${data.id}`, {
            method: 'PUT',
            headers: {
              Accept: contentType,
              'Content-Type': contentType,
            },
            body: JSON.stringify(data),
          });
          
          // Throw error with status code in case Fetch API req failed
          if (!res.ok) {
            throw new Error(res.status);
          }
        } catch (error) {
          console.log(error);
        }
    }

    /* Canvas Functions */
    const save = ()=>{
        if(session){
            const canvas = canvasRef.current.getSaveData();
            clear();
            if(isEditing) {
                frameInEdit.dataFrame = canvas;
                putFrame(frameInEdit);
                onIsEditing(false);
            }else{
                postFrame({id: uuidv4(), user:session.user.name, userImage: session.user.image, dataFrame: canvas, likes: []});
            }
            router.push("/#board-frames");
        }else{
            router.push("/#authentication");
        }
    }
    const clear = ()=>{
        canvasRef.current.eraseAll();
    }
    const undo = ()=>{
        canvasRef.current.undo();
    }

    /* Colors Functions */
    const handleChangeColorPicker= (color)=>{
        setColor(color);
    }
    const handleSaveColor = ()=>{
        setColors([...colors, color]);
    }
    const handleSelectedColor = (val)=>{
        setColor(val);
    }
    /* Thickness Functions */
    const handleChangeThickness = (val)=>{
        console.log(val)
        setThickness(Number(val));
    }
    
    return <section id="drawer" className={styles.root}>
        <div className={styles.contentTitle}>
            <h3 className={styles.title}>
                Create your own canvas
            </h3>
        </div>
        {!session &&
            <LoginRequest text="You have to be logged in to create your own canvas" />
        }
        <div className={!session ? cn(styles.container, styles.disabledContainer): styles.container}>
            <div className={styles.editor}>
                <div className={styles.content}>
                    <div className={cn(styles.containerElements, styles.containerColumn)}>
                        <div className={styles.containerElements}>
                            <input className={styles.button} onClick={clear} type="submit" value="Clear" />
                            <input className={styles.button} onClick={undo} type="submit" value="Undo" />
                            <input className={styles.button} onClick={save} type="submit" value="Save" />
                        </div>
                    </div>
                    <div className={cn(styles.containerElements, styles.containerColumn)}>
                        <div className={styles.panelColors}>
                            {
                                colors.map((col, index)=> <ColorCircle key={index} color={col} isNewColor={false} onSelectedColor={handleSelectedColor} />)
                            }
                            <ColorCircle color={color} isNewColor={true} onSaveColor={handleSaveColor} />
                        </div>
                        <div className={cn("colorPicker", styles.containerElements)}>
                            <RgbaColorPicker color={color} onChange={handleChangeColorPicker} />
                        </div>
                        <div className={styles.containerElements}>
                            <SliderPencil max={"50"} step={"1"} defaultValue={"10"} onChangeSlider={handleChangeThickness}/>
                        </div>
                    </div>
                </div>
            </div>
            <div onMouseOver={(e)=>mouseOver()} onMouseOut={(e)=>mouseOut()}>
                <CanvasSocialArt ref={canvasRef} color={color} thickness={thickness} width={width} />
            </div>
        </div>
    </section>
}