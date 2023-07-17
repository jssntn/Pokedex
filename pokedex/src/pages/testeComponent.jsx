import styles from "@/styles/testeComponent.module.css";
import Login from "@/components/loginModal/login"

export default function login(){
    return(
        <div className={styles.wrapper}>
            <Login></Login>
        </div>
    )
}