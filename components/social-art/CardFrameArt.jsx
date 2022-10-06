import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import styles from "../../styles/social-art/BoardFrames.module.scss"
import cn from "classnames"
import { useState } from 'react'
import Image from 'next/image'

export default function CardFrameArt({frame}){
    const [liked, setLiked] = useState(false);
    const contentType = 'application/json';
    /* Handles */
    const handleLike = async () => {
        if (liked){
            frame.likes--;
            setLiked(false);
        }else{
            frame.likes++;
            setLiked(true);
        }
        await putFrame(frame);
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
                <div className={styles.likes}>
                    <div className={cn(styles.icon, styles.firstIcon)} onClick={()=>handleLike(frame)}>
                        <FontAwesomeIcon 
                            icon={liked ? fasHeart : farHeart} 
                            className={cn(styles.fa, styles.faHeart)} 
                        />
                    </div>
                    <div className={styles.icon}>
                        <p>{frame.likes}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
}