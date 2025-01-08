
import styles from '../styles/Searchbar.module.css'

const SearchBar = (props) => {
    const { onChange } = props;

    return (
        <>
            <input className={styles.searchBar} type="text" placeholder="Search a movie" onChange={(e) => onChange(e.target.value)}/>
        </>
    )
}

export default SearchBar;