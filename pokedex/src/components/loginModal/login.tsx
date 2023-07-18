import styles from "@/components/loginModal/login.module.css"
import Register from "../singUpModal/singUp";
import { useState} from "react";

export default function Login(){
    const [visibility, setVisibility] = useState<boolean>(true);

    const toggleVisibility = () => {
        setVisibility(!visibility);
    }

    return (
            <div className={styles.overlay}>
                {visibility ? <div className={styles.modal}>
                    <div className={styles.header}>
                        <img src="/img/whiteLogo.svg" alt="" />
                    </div>
                    <div className={styles.modalBody}>
                        <input type="text" placeholder="Usuário" />
                        <input type="password" placeholder="Senha" />
                        <button>Login</button>

                        <p>ou</p>
                        <a onClick={toggleVisibility}>Cadastre-se</a>
                        
                    </div>
                </div> : <Register setVisibility={setVisibility}></Register>
                 }
            </div>
    )
}