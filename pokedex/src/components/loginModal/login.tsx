import styles from "@/components/loginModal/login.module.css"

export default function Login(){
    return (
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <div className={styles.header}>
                        <img src="/img/whiteLogo.svg" alt="" />
                    </div>
                    <div className={styles.modalBody}>
                        {/* <h2>Login</h2> */}
                        <input type="text" placeholder="Usuário" />
                        <input type="password" placeholder="Senha" />
                        <button>Login</button>

                        <p>ou</p>
                        <a href="">Cadastre-se</a>
                        {/* <h2>Cadastre-se</h2> */}
                        {/* <input type="text" placeholder="Nome completo" />
                        <input type="text" placeholder="Usuário" />
                        <input type="password" placeholder="Senha" />
                        <button>Cadastre-se</button> */}
                    </div>
                </div>
            </div>
    )
}