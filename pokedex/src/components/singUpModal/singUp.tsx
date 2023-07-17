import styles from "@/components/singUpModal/singUp.module.css"

export default function Register(){
    return (
            <div className={styles.modal}>
                <div className={styles.header}>
                    <img src="/img/whiteLogo.svg" alt="" />
                </div>
                <div className={styles.modalBody}>
                    <input type="text" placeholder="Nome completo" />
                    <input type="text" placeholder="Usuário" />
                    <input type="password" placeholder="Senha" />
                    <button>Inscreva-se</button>
                    <p>Já tem uma conta? <a href="">Entrar</a></p>
                </div>
            </div>
    )
}

{/* <a href="">Cadastre-se</a> */}