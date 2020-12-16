import React, {useState, useEffect} from 'react';
import requests from '../request';
import './HeaderComponent.css';
import playIcon from '../assets/play.png';
import infoIcon from '../assets/information.png';


function HeaderComponent() {

    const [movie,setMovie] = useState([]);

    useEffect(()=>{
        let fetchUrl = async()=>{
            let res = await fetch(requests.urlNetflix);
            let body = await res.json();
            if(body.results){
                let randomIndex = Math.floor(Math.random()*body.results.length);
                setMovie(body.results[randomIndex]);
            }
        }
        fetchUrl();
    },[])

    let title = movie.title?movie.title:
                    movie.name?movie.name:
                        movie.original_name?movie.original_name:"";
    
    let description = movie.overview?movie.overview.substr(0,150)+'...':"";

  return (
    <div className="banner" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}')` }}>
        <div className="containerFilter">
            <h1 className="bannerTitle">{title}</h1>
            <h2 className="bannerDesc">{description}</h2>
            <div className='btnDiv'>
                <button id="playBtn"><img src={playIcon} className="btnIcon" alt=""/><span>Play</span></button>
                <button id="infoBtn"><img src={infoIcon} className="btnIcon" alt=""/><span>More info</span></button>
            </div>
            <div className="bottomGradient"/>
        </div>
    </div>
    );
}

export default HeaderComponent;