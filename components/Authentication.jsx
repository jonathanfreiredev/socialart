import styles from "../styles/Authentication.module.scss"
import { useState, useRef } from "react"
import { signIn, useSession} from "next-auth/client"
import { useRouter } from 'next/dist/client/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link"
import Avatar from "./Avatar"
import cn from "classnames"

export default function Authentication({type}){
    const [form, setForm] = useState({
        username: "",
        password: "",
        repeatPassword: "",
        image: ""
    });
    const [errorPassword, setErrorPassword] = useState("");
    const [selectedAvatar, setSelectedAvatar] = useState("");
    const [session, loading] = useSession();
    const avatars = ["james", "jerry", "joe", "jeri", "jazebelle", "jude", "jacques", "jocelyn", "josephine", "jabala", "jake", "josh", "jess", "jodi", "jai", "jordan", "jon", "jeane", "julie", "jana", "jia", "jane", "jean", "jolee", "jed", "jaqueline", "jenni", "jack"]
    const router = useRouter();
    const refAvatars = useRef(null);

    const handleChange = (e) => {
        const target = e.target
        const name = target.name
        const value = target.value;
        setForm({
            ...form,
            [name]: value,
        })
    }

    const authentication = async () =>{
        const sign = signIn('credentials', { username: form.username, password: form.password, image: form.image, api:type, redirect: false });
        sign.then((data)=>{
            if(data.error){
                if(type==="signin"){
                    setErrorPassword("Name or password are wrong.\nPlease, try again.");
                }else if(type==="signup"){
                    setErrorPassword("This username is not available.\nPlease, choose another.");
                }
            }else{
                router.back();
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(form.username !== ""){
            if(form.password.length > 5){
                if(type==="signup"){
                    if(form.password == form.repeatPassword){
                        if(form.image !== ""){
                            setErrorPassword("");
                            authentication();
                        }else{
                            setErrorPassword("You must choose an avatar");
                        }
                    }else{
                        console.log("entro en la igualdad")
                        setErrorPassword("Both passwords don't match");
                    }
                }else if(type==="signin"){
                    setErrorPassword("");
                    authentication();
                }
            }else{
                setErrorPassword("Password must have minumum 6 letters");
            }
        }else{
            setErrorPassword("You must choose an username");
        }
    }
    const handleMoveAvatars = (value)=>{
        refAvatars.current.scrollLeft += value;
    }
    const handleSelectedAvatar = (value)=>{
        setSelectedAvatar(value);
        setForm({
            ...form,
            ["image"]: `https://joeschmoe.io/api/v1/${value}`,
        })
    }

    return <div className={styles.root} id="authentication">
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <h3>
                        Hi{form.username ? ' '+form.username+"!" : " there!"}
                        <p>{type==="sigin" ? "Sign in" : "Sign up"} to have a better experience</p>
                    </h3>
                </div>
                <form autoComplete="off" className={styles.form}>
                    {type==="signup" && 
                        <div className={styles.carrousel}>
                            <button type="button" className={cn(styles.carrouselArrow, styles.carrouselArrowPrev)} onClick={()=>handleMoveAvatars(-92)}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <div className={styles.avatars} ref={refAvatars}>
                                {avatars.map((avatar, index) => <Avatar key={index} name={avatar} width={"80px"} height={"80px"} selectedAvatar={selectedAvatar} onSelectedAvatar={handleSelectedAvatar} />)}
                            </div>
                            <button type="button" className={cn(styles.carrouselArrow, styles.carrouselArrowNext)} onClick={()=>handleMoveAvatars(92)}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    }
                    <div className={styles.alreadyAccount}>
                        <p>{type==="signup" ? "Already" : "Don’t"} have an account?{" "}
                        <Link href={type==="signup" ? "signin" : "signup"}>
                            <a>Sign {type==="signup" ? "in" : "up"}</a>
                        </Link>
                        .</p>
                        <p>You also can use your account for another of my projects.</p>
                    </div>
                    <div className={styles.contentForm}>
                        <label htmlFor="username"></label>
                        <input type="text" id="username" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
                        <label htmlFor="password"></label>
                        <input type="password" id="password" name="password" placeholder="********" value={form.password} onChange={handleChange} required />
                        {type==="signup" && 
                        <>
                            <label htmlFor="repeatPassword"></label>
                            <input type="password" id="repeatPassword" name="repeatPassword" placeholder="********" value={form.repeatPassword} onChange={handleChange} required />
                        </>
                        }
                        <input onClick={handleSubmit} type="submit" value={type==="signup" ? "Sign up" : "Sign in"} />
                        {errorPassword && <p>{errorPassword}</p>}
                    </div>
                </form>
            </div>
        </div>
    </div>
}