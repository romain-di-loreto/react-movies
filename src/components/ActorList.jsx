import styles from "../styles/ActorList.module.css"
import { useTheMovieDB } from "../context/TheMovieDBProvider";
import { useState, useEffect, act } from "react";

const ActorList = (props) => {
    const { movieId } = props;
    const { getMovieActors } = useTheMovieDB();
    const [actors, setActors] = useState(undefined);

    useEffect(() => {
        getMovieActors(movieId).then(data => {
            setActors(data.cast.slice(0, 10));
        })
    },[])

    if(actors !== undefined) {
        return (
            <ul className={styles.actorList}>
                {actors.map((actor) => {
                    const { id, name, character, profile_path} = actor;
                    const profilePic = `https://image.tmdb.org/t/p/w500${profile_path}`;

                    return (
                        <li key={id} className={styles.actorCard}>
                            <img src={profilePic}/>
                            <p>{name}</p>
                        </li>
                    )
            })}
            </ul>
        )
    }

    const tmp = []
    for (var i = 1; i <= 10; i++) tmp.push(i);

    return (
        <ul className={styles.actorList}>
            {tmp.map((index) => (
                <li key={index} className={styles.actorCard}>
                    <img src="https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"/>
                    <p>Actor {index}</p>
                </li>
            ))}
        </ul>
    )

}

export default ActorList;