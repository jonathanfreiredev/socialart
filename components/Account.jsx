import styles from "../styles/Account.module.scss"
import Image from "next/image"
import { useState } from "react"
import { session as updateSession } from "next-auth/client"
import InputPassword from "./InputPassword"

export default function Account ({session}){
    const [form, setForm] = useState({
        username: session.user.name,
        lastPassword: "",
        password: "",
        repeatPassword: "",
        image: session.user.image
    });
    const [errorName, setErrorName] = useState("");
    const [nameChangeSuccessfully, setNameChangeSuccessfully] = useState("");
    const [loadingNameChange, setLoadingNameChange] = useState(false);
    const [errorPassword, setErrorPassword] = useState("");
    const [passwordChangeSuccessfully, setPasswordChangeSuccessfully] = useState("");
    const [loadingPasswordChange, setLoadingPasswordChange] = useState(false);
    
    
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
          }).then(response => response.json())
          .then(data => data.message);
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

    const submitName = async()=>{
        setLoadingNameChange(true);
        setNameChangeSuccessfully("");
        if(form.username !== ""){
            const res = await putUser({username: form.username});
            if(!res){
                // Update auth with the new username
                await updateSession();
                setErrorName("");
                setNameChangeSuccessfully("The username was changed successfully.")
            }else{
                setErrorName(res);
            }
        }else{
            setErrorName("You must choose an username.")
        }
        setLoadingNameChange(false);
    }
    const submitPassword = async()=>{
        setLoadingPasswordChange(true);
        setPasswordChangeSuccessfully("");
        if(form.password.length > 5){
            if(form.password === form.repeatPassword){
                if(form.lastPassword !== form.password){
                    const res = await putUser({
                        password: form.password,
                        lastPassword: form.lastPassword
                    });
                    if(!res){
                        setErrorPassword("");
                        setPasswordChangeSuccessfully("The password was changed successfully.");
                        setForm({
                            ...form,
                            ["lastPassword"]: "",
                            ["password"]: "",
                            ["repeatPassword"]: "",
                        });
                    }else{
                        setErrorPassword(res);
                    }
                }else{
                    setErrorPassword("Current password and new password are the same.");
                }
            }else{
                setErrorPassword("The fields of the new password don't match.");
            }
        }else{
            setErrorPassword("Password must have minumum 6 letters.");
        }
        setLoadingPasswordChange(false);
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
                    <div>
                        <p>You can use your account to log in to all apps.</p>
                        {errorName !== "" && <p className={styles.error}>{errorName}</p>}
                        {nameChangeSuccessfully !== "" && <p className={styles.success}>{nameChangeSuccessfully}</p>}
                    </div>
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
                        <InputPassword title="Your password:" name="lastPassword" value={form.lastPassword} handleChange={handleForm} />
                        <InputPassword title="New password:" name="password" value={form.password} handleChange={handleForm} />
                        <InputPassword title="Repeat new password:" name="repeatPassword" value={form.repeatPassword} handleChange={handleForm} />
                    </div>
                </div>
                <div className={styles.save}>
                    <div>
                        <p>Please use 6 characters at minimum and use a secure password.</p>
                        {errorPassword !== "" && <p className={styles.error}>{errorPassword}</p>}
                        {passwordChangeSuccessfully !== "" && <p className={styles.success}>{passwordChangeSuccessfully}</p>}
                    </div>
                    <button type="button" onClick={submitPassword}>
                        {loadingPasswordChange ?
                            <hr></hr>
                        :
                            `Save`
                        }
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