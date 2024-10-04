'use client'
import styles from "@/components/singUpModal/singUp.module.css"
import { registerProps } from "@/interfaces/interfaces"
import axios from "axios";
import { useState } from "react";

export default function Register(props:registerProps){
    const axios = require('axios').default;

    const [name, setName] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleRegister = async(event:any) =>{
        event.preventDefault();
        const data = await axios.post('http://localhost:3000/api/Cadastro', {name:name, username: username, password:password});
        props.onRegister();
    }
    return (
            
               <div className={styles.modal}>
                    <div className={styles.header}>
                        <img src="/img/whiteLogo.svg" alt="" />
                    </div>
                    <form onSubmit={handleRegister} className={styles.modalBody}>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome completo" />
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuário" />
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
                        <button type="submit">Inscreva-se</button>
                        <p>Já tem uma conta? <a onClick={()=>{props.setVisibility(true);}}>Entrar</a></p>
                    </form>
                </div> 
            
    )
}

{/* <a href="">Cadastre-se</a> */}