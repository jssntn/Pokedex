import { menuProps } from "@/interfaces/interfaces"
import styles from '@/components/menu/menu.module.css'

export default function Menu (props:menuProps){
    return(
        <div className={styles.logoutHeader}>
          <ul>
            <li>
              <a href="/MyPokemons">My Pokemons</a>
            </li>
            <li>
              <a onClick={props.onLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
    )
}