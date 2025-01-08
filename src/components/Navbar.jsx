import { Link } from "react-router"
import styles from "../styles/Navbar.module.css"

const Navbar = () => {
    return (
        <nav>
            <div className={styles.links}>
                <img src=""/>
                <Link to={{pathname:"/"}} >List</Link>
                <Link to={{pathname:"/wishlist"}} >Wishlist</Link>
            </div>
        </nav>
    )
}

export default Navbar;