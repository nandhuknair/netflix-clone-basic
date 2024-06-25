import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams()
  const navigate = useNavigate();
  const [apiData,setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    type:""
})
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjg5MGFjMzIwM2JhZTM5OGU3MGVkY2M2ZmMxNGU1YiIsIm5iZiI6MTcxOTI5NTk2Mi43NDUwMzUsInN1YiI6IjY2N2E1ZWM4ZGJjOGIzOTlmZTkwNjcxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VNU3amh0G_TuclIcMkoGgEEd529zyvuJax_fMiWZErU'
    }
  };
  
useEffect(()=> {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));
},[])


  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="back-arrow" onClick={()=>{navigate(-2)}}/>
      <iframe src={`https://www.youtube.com/embed/${apiData.key}`} width='90%' height='90%' title='trailer' frameBorder='0' allowFullScreen> </iframe>
      <div className='player-info'>
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>

      </div>
    </div>
  )
}

export default Player
