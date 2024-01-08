import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import randomcolor from "random-color";
import TopAiringCard from "./TopAiringCard";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 8
    },
    desktop: {
        breakpoint: { max: 1920, min: 1024 },
        items: 8
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 6
    },
    mobileRoatate: {
        breakpoint: { max: 768, min: 0 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 3
    }
};

export default function TopAiring() {
    const rc = randomcolor();
    const [top, setTop] = useState([]);

    const getTopAiring = async () => {
        const request = await fetch(`https://foxtream.up.railway.app/anime/gogoanime/top-airing`);
        const response = await request.json();
        if (request.status === 200) { setTop(response.results) } else { console.log(response); }
    }

    useEffect(() => {
        getTopAiring();
    }, [])
    return <section className="container">
        <p className="partitionTitle">Top Airing</p>
        <Carousel
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={false}
            rewind={true}
            partialVisbiles="false"
            responsive={responsive}>
            {top.length > 0 && top.map((t, i) => {
                return <TopAiringCard
                    key={i}
                    id={t.id}
                    title={t.title}
                    image={t.image}
                    index={i} />
            })}
        </Carousel>
    </section>
}