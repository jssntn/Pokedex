import styles from "@/styles/testeComponent.module.css";
import Login from "@/components/loginModal/login"
import Register from "@/components/singUpModal/singUp"

export default function login(){
    return(
        <div className={styles.wrapper}>
            <Login></Login>
            <Register></Register>
        </div>
    )
}