import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import styles from "../../styles/social-art/BoardFrames.module.scss"
import { useRouter } from 'next/dist/client/router'
import cn from "classnames"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { decompressFromUTF16 } from 'lz-string'

export default function CardFrameArt({ onEdit, frame, user}){
    const [liked, setLiked] = useState(false);
    const [deleteSelected, setDeleteSelected] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const contentType = 'application/json';
    const router = useRouter();
    /* Handles */
    const handleLike = async () => {
        let frameCopy = frame;
        if(user){
            const index = findUserInFrame();
            if (index !== -1){
                frameCopy.likes.splice(index, 1);
                setLiked(false);
            }else{
                frameCopy.likes.push(user.id);
                setLiked(true);
            }
            await putFrame(frameCopy);
        }else{
            router.push("/#login-cardframeart");
        }
    }

    const handleEditFrame = async (frameData)=>{
        const resFrame = await fetch(`/api/frames/${frameData.id}`,{
            method:"GET",
        }).then(response => response.json())
        .then(data => {
            const frame = data.data;
            frame.dataFrame = decompressFromUTF16(frame.dataFrame);
          return frame
        });
        onEdit(resFrame);
        router.push("/#drawer");
    }
    const findUserInFrame = ()=>{
        return frame.likes.findIndex((el => el === user.id))
    }

    /* Delete */
    const deleteFrame = async (frameData) => {
        setLoadingDelete(true);
        try {
            await fetch("/api/delete-image",{
                method:"POST",
                body: frameData.dataImage.public_id
            })
            await fetch(`/api/frames/${frameData.id}`, {
                method: 'Delete',
            })
            setLoadingDelete(false);
        } catch (error) {
          console.log(error);
        }
    }
    const putFrame = async (data) => {
        try {
          const res = await fetch(`/api/frames/${data.id}`, {
            method: 'PUT',
            headers: {
                Accept: contentType,
                'Content-Type': contentType,
            },
            body: JSON.stringify(data),
          })
        } catch (error) {
          console.log(error);
        }
    }

    const handleDeleteFrame = ()=>{
        setDeleteSelected(!deleteSelected);
    }

    useEffect(() => {
        if(user){
            const index = findUserInFrame();
            if(index !== -1){
                setLiked(true);
            }
        }
    },[user]);

    return <>
        <div className={styles.contentUser}>
            <div className={styles.contentSocial}>
                <img src={frame.userImage} alt="avatar" className={styles.avatar}></img>
                <p>{frame.user}</p>
            </div>
        </div>
        <div className={styles.frameArt}>
            <Image 
                src={frame.dataImage.url}
                layout='responsive'
                width={380}
                height={450}
                priority
            >
            </Image>
        </div>
        <div className={styles.social}>
            <div className={styles.contentSocial}>
                {!deleteSelected ?
                    <>
                        <div className={styles.likes}>
                            <div className={cn(styles.icon, styles.firstIcon)} onClick={()=>handleLike(frame)}>
                                <FontAwesomeIcon 
                                    icon={liked ? fasHeart : farHeart} 
                                    className={cn(styles.fa, styles.faHeart)} 
                                />
                            </div>
                            <div className={styles.icon}>
                                <p>{frame.likes.length}</p>
                            </div>
                        </div>
                        {user && user.username == frame.user &&
                            <div className={styles.buttons}>
                                <div onClick={()=>handleEditFrame(frame)} className={styles.icon}>
                                    <FontAwesomeIcon icon={faEdit} className={cn(styles.fa, styles.faEdit)} />
                                </div>
                                <div onClick={handleDeleteFrame} className={cn(styles.icon, styles.lastIcon)}>
                                    <FontAwesomeIcon icon={faTrashAlt} className={styles.fa} />
                                </div>
                            </div>
                        }
                    </>
                :
                    <div className={styles.removeFrame}>
                        <p>Are you sure you want to remove it?</p>
                        <div>
                            <button type="button" onClick={()=>deleteFrame(frame)} className={styles.yes}>
                                {loadingDelete ?
                                    <hr></hr>
                                :
                                    "YES"
                                }
                            </button>
                            <button type="button" onClick={handleDeleteFrame} className={styles.no}>NO</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    </>
}