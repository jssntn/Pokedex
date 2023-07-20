import styles from "@/components/loginModal/login.module.css"
import Register from "../singUpModal/singUp";
import { useState} from "react";
import { EventEmitter } from 'events'
import axios from "axios";
import { loginProps } from "@/interfaces/interfaces";



export default function Login({onLogin}:loginProps){
    const axios = require('axios').default;

    const [visibility, setVisibility] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const toggleVisibility = () => {
        setVisibility(!visibility);
    }
    
    const handleLogin = async (event:any) =>{
        event.preventDefault();
        const data = await axios.post('http://localhost:3000/api/Login', {username: username, password:password});
        onLogin();
    }


    return (
            <div className={styles.overlay}>
                {visibility ? <div className={styles.modal}>
                    <div className={styles.header}>
                        <img src="/img/whiteLogo.svg" alt="" />
                    </div>
                    <form onSubmit={handleLogin} className={styles.modalBody}>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuário" />
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
                        <button type="submit">Login</button>

                        <p>ou</p>
                        <a onClick={toggleVisibility}>Cadastre-se</a>
                        
                    </form>
                </div> : <Register onRegister={onLogin} setVisibility={setVisibility}></Register>
                 }
            </div>
    )
}