import { Link } from "react-router"
import styles from "../styles/DummyCard.module.css"

const DummyCard = () => {
    return (
        <li className={styles.dummyCard}>
            <div className={styles.dummyDetails}>
                <h2 className={styles.dummyTitle}>dummy</h2>
                <p className={styles.dummyReleaseDate}>Release Date: dummy</p>
                <p className={styles.dummyGenres}>dummy</p>
                <p className={styles.dummyOverview}>dummydummydummydummydummydummydummydummydummydummydummydummydummydummydummydummydummydummy dummy</p>
                <div className={styles.dummyMetrics}>
                    <span className={styles.dummyRating}>⭐ dummy</span>
                    <span className={styles.dummyPopularity}>🔥 dummy</span>
                </div>
            </div>
        </li>
    )
}

export default DummyCard;