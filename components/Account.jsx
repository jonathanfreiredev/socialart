import styles from "../styles/Account.module.scss"
import Image from "next/image"
import { useState } from "react"
import { session as updateSession } from "next-auth/client"

export default function Account ({session}){
    const [form, setForm] = useState({
        username: session.user.name,
        password: "",
        repeatPassword: "",
        image: session.user.image
    });
    const [lastPassword, setLastPassword] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [loadingNameChange, setLoadingNameChange] = useState(false)
    
    /* Edit user */ 
    const putUser = async (data) => {
        try {
          const res = await fetch(`/api/users/${session.user.user.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
          return res;
        } catch (error) {
          console.log(error);
        }
    }

    const handleForm = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setForm({
            ...form,
            [name]: value
        })
    }
    const handleLastPassword = (e)=>{
        setLastPassword(e.target.value);
    }

    const submitName = async()=>{
        setLoadingNameChange(true);
        if(form.name !== ""){
            if(form.name !== session.user.name){
                const res = await putUser({username: form.username});
                if(res.ok){
                    // Update auth with the new username
                    await updateSession();
                    setErrorName("");
                    setLoadingNameChange(false);
                }
            }else{
                setErrorName("The chosen username is the same as the previous one.")
            }
        }else{
            setErrorName("You must choose an username.")
        }
    }
    const submitPassword = ()=>{

    }

    const submitDeleteAccount = ()=>{

    }

    return <div className={styles.root}>
        <div className={styles.container}>
            <div className={styles.avatar}>
                <div className={styles.image}>
                    <Image
                        src={form.image}
                        layout='fill'
                        objectFit="contain"
                        priority="true"
                    />
                </div>
                <h3>Hello {form.username}</h3>
                <p>This is your personal account</p>
            </div>

            <div className={styles.name}>
                <div>
                    <h4>Your Username</h4>
                    <p>This is your username.</p>
                    <p>You can change your username here:</p>
                    <label htmlFor="username"></label>
                    <input type="text" name="username" value={form.username} onChange={handleForm} />
                </div>
                <div className={styles.save}>
                    <p>You can use your account to log in to all apps.</p>
                    {errorName !== "" && <p className={styles.error}>{errorName}</p>}
                    <button type="button" onClick={submitName}>
                        {loadingNameChange ?
                            <hr></hr>
                        :
                            `Save`
                        }
                    </button>
                </div>
            </div>

            <div className={styles.password}>
                <div>
                    <h4>Your Password</h4>
                    <p>Your password is encrypted and secure.</p>
                    <p>If you want to change it, please enter your current password first. Then the new password.</p>
                    <div className={styles.passwords}>
                        <label>
                            <p>Your password:</p>
                            <input type="password" name="lastPassword" value={form.lastPassword} onChange={handleLastPassword} />
                        </label>
                        <label>
                            <p>New password:</p>
                            <input type="password" name="password" value={form.password} onChange={handleForm} />
                        </label>
                        <label>
                            <p>Repeat new password:</p>
                            <input type="password" name="repeatPassword" value={form.repeatPassword} onChange={handleForm} />
                        </label>
                    </div>
                </div>
                <div className={styles.save}>
                    <p>Please use 6 characters at minimum and use a secure password.</p>
                    <button type="button" onClick={submitPassword}>
                        Save
                    </button>
                </div>
            </div>

            <div className={styles.delete}>
                <div>
                    <h4>Delete Personal Account</h4>
                    <p>{`If you delete your account, you will remove all of your data and the progress in other apps on Jonathan Freire's website.`}</p>
                </div>
                <div className={styles.save}>
                    <p>This action has no turning back.</p>
                    <button type="button" onClick={submitDeleteAccount}>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    </div>
}