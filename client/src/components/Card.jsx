import { Link } from "react-router-dom";
import styles from "../styles/search.module.css";
import { slisor } from "../utils/workers";

export default function Card({ id, image, title, totalEpisodes }) {
  return (
    <Link
      to={`/streaming/${id}`}
      key={id}
      className={styles.billboard_Individual}
    >
      <img
        src={image}
        alt={image}
        className={styles.billboard_Poster}
        draggable={false}
      />
      <p className={styles.billboard_Title}>
        {title.english
          ? title.english.length > 25
            ? slisor(String(title.english), 25)
            : title.english
          : title.romaji.length > 25
          ? slisor(String(title.romaji), 25)
          : title.romaji}
      </p>

      <p className={styles.episode}>
        {totalEpisodes ? `EPS ${totalEpisodes}` : `Upcoming`}
      </p>
      <div className={styles.episode_stats}>
       <button>
        <FaClosedCaptioning />
       </button>
      <p>{bored.sub_episodes.length}</p>
      </div>
      {bored.dub_episodes.length > 0 && (
        <div className={styles.episode_stats}>
          <button>
            <TbMicrophoneFilled />
          </button>
          <p>{bored.dub_episodes.length}</p>
        </div>
      )}
    </Link>
  );
}
