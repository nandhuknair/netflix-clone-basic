import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom';


const TitleCards = ({title,category}) => {

    const [apiData,setApiData] = useState([])
    const cardsRef = useRef();
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjg5MGFjMzIwM2JhZTM5OGU3MGVkY2M2ZmMxNGU1YiIsIm5iZiI6MTcxOTI5NTk2Mi43NDUwMzUsInN1YiI6IjY2N2E1ZWM4ZGJjOGIzOTlmZTkwNjcxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VNU3amh0G_TuclIcMkoGgEEd529zyvuJax_fMiWZErU'
        }
      };

    const handleWheel = (event) => {

        event.preventDefault();
        if (cardsRef.current) {
            cardsRef.current.scrollLeft += event.deltaY;
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => setApiData(response.results))
        .catch(err => console.error(err));
        const currentRef = cardsRef.current;
        if (currentRef) {
            currentRef.addEventListener('wheel', handleWheel);
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    return (
        <div className='title-cards'>
            <h1>{title?title:"Popular on Netflix"}</h1>
            <div className='card-list' ref={cardsRef}>
                {apiData.map((card, index) => {
                    return (
                        <Link to={`/player/${card.id}`} className='card' key={index}>
                            <img src={"https://image.tmdb.org/t/p/w500"+card.backdrop_path} alt={"cardImg" + index} />
                            <p>{card.original_title}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default TitleCards;
