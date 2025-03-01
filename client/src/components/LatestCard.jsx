import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import { slisor } from "../utils/workers.js";

export default function LatestCard({ id, image, title, currentEpisode }) {
  const { defaultPoster } = useAuth();

  return (
    <NavLink
      to={`/streaming/${id}?eps=${currentEpisode}`}
      className="latestIndividual"
    >
      <img
        className="latestPoster"
        src={image}
        alt={id}
        onError={(e) => {
          // If there is an error getting image, Show default poster
          e.target.src = defaultPoster;
        }}
        draggable="false"
      />
      <p className="latestTitle">{slisor(title, 34)}</p>
      <p className="latestEpisodeNumber">EP {currentEpisode}</p>
    </NavLink>
  );
}
