import { useState } from "react"
import { useRouter } from "next/dist/client/router"
import styles from "../../styles/social-art/DrawerSocialArt.module.scss"
import CanvasSocialArt from "./CanvasSocialArt"
import ColorCircle from "./ColorCircle"
import { RgbaColorPicker } from "react-colorful"
import SliderPencil from "./SliderPencil"
import { v4 as uuidv4 } from 'uuid'
import cn from "classnames"

export default function DrawerSocialArt({canvasRef, width}){
    const contentType = 'application/json';
    const defaultColor ={r:121, g:136, b:210, a:1};
    const [colors, setColors] = useState([{r:29, g:29, b:29, a:1},{r:88, g:134, b:233, a:1}]);
    const [color, setColor] = useState(defaultColor);
    const [thickness, setThickness] = useState(10);
    const [loadingSave, setLoadingSave] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [username, setUsername] = useState("");
    const [errorUsername, setErrorUsername] = useState(false);
    const avatars = ["james", "jerry", "joe", "jeri", "jazebelle", "jude", "jacques", "jocelyn", "josephine", "jabala", "jake", "josh", "jess", "jodi", "jai", "jordan", "jon", "jeane", "julie", "jana", "jia", "jane", "jean", "jolee", "jed", "jaqueline", "jenni", "jack"]
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

    /* POST Image to Cloudinary */
    const uploadImage = async (dataImage)=>{
        try{
            const res = await fetch("/api/upload-image",{
                    method:"POST",
                    body: dataImage
                }).then(response => response.json())
                .then(data => {
                  return data
                });
            const image = {
                url: res.url,
                public_id: res.public_id,
            };
            return image;
        } catch (error) {
            console.log(error);
        }
    }

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    /* Canvas Functions */
    const save = async(dataImage)=>{
        if(username == "") {
            setErrorUsername(true);
        }else{
            setLoadingSave(true);
            const canvas = canvasRef.current.getSaveData();
            clear();
            const image = await uploadImage(dataImage);
            await postFrame({id: uuidv4(), user: username, userImage: `https://joeschmoe.io/api/v1/${avatars[Math.floor(Math.random() * avatars.length)]}`, dataFrame: canvas, dataImage: image, likes: 0});
            setLoadingSave(false);
            router.reload();
        }
    }
    const saving = ()=>{
        setIsSaving(!isSaving);
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
        setThickness(Number(val));
    }

    return <section id="drawer" className={styles.root}>
        <div className={styles.contentTitle}>
            <h3 className={styles.title}>
                Create your own canvas
            </h3>
        </div>
        <div className={styles.container}>
            <div className={styles.editor}>
                <div className={styles.content}>
                {!isSaving ?
                    <>
                        <div className={cn(styles.containerElements, styles.containerColumn)}>
                            <div className={styles.containerElements}>
                                <button className={styles.button} onClick={clear} type="submit">Clear</button>
                                <button className={styles.button} onClick={undo} type="submit">Undo</button>
                                <button className={styles.button} onClick={saving} type="submit">
                                    {loadingSave ?
                                        <hr></hr>
                                    :
                                        "Save"
                                    }
                                </button>
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
                    </>
                :
                    <div className={styles.saving}>
                        <p>{"What's your name?"}</p>
                        <label htmlFor="username"></label>
                        <input type="text" id="username" name="username" placeholder="Username" value={username} onChange={handleUsername} />
                        <button className={styles.button} onClick={()=>save(canvasRef.current.getDataURL())} type="submit">
                            {loadingSave ?
                                <hr></hr>
                            :
                                "Save"
                            }
                        </button>
                        {errorUsername && <p className={styles.error}>Introduce a name</p>}
                    </div>
                }
                </div>
            </div>
            <div>
                <CanvasSocialArt ref={canvasRef} color={color} thickness={thickness} width={width} />
            </div>
        </div>
    </section>
}