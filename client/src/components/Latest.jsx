import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from '../store/auth.jsx';
import Loader from "./Loader.jsx";

export default function Latest() {
    const { SERVER } = useAuth();
    const [latest, setLatest] = useState([]);
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState(localStorage.getItem('latest_type'));

    const getLatest = async () => {
        const request = await fetch(`${SERVER}/api/v1/anime/recent`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type })
            });
        const response = await request.json();

        if (request.status === 200) {
            setLatest(response.results);
            setLoading(false);
        } else {
            console.log(response);
        }
    }

    useEffect(() => { getLatest() }, [type])
    return <section className="container">
        {!loading
            && <div className="latest_Header">
                <p className="partitionTitleII">Latest updates</p>
                <div className="latest_buttons" >
                    <button style={{ backgroundColor: type === 1 && 'var(--background) !important' }}
                        className="latest_button"
                        onClick={() => { setType(1); localStorage.setItem('latest_type', 1) }}>jp</button>
                    <button style={{ backgroundColor: type === 2 && 'var(--background) !important' }}
                        className="latest_button"
                        onClick={() => { setType(2); localStorage.setItem('latest_type', 2) }}>en</button>
                    <button style={{ backgroundColor: type === 3 && 'var(--background) !important' }}
                        className="latest_button"
                        onClick={() => { setType(3); localStorage.setItem('latest_type', 3) }}>ch</button>
                </div>
            </div>
        }
        {
            loading ?
                <Loader />
                : <div className="latestContainer">
                    {latest.map((late, index) => {
                        const { id, image, title, episodeNumber } = late;
                        return <NavLink
                            to={`/streaming/${id}`}
                            key={index}
                            className="latestIndividual">
                            <img className="latestPoster" src={image} alt={id} draggable="false" />
                            <p className="latestTitle">{title}</p>
                            <p className="latestEpisodeNumber">EP {episodeNumber}</p>
                        </NavLink>
                    })}
                </div>
        }

    </section >
}
