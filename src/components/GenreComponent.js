import React, {useState, useEffect} from 'react';


import TitleMapComponent from './TitleMapComponent';

import './GenreComponent.css';

import { MdChevronRight } from "react-icons/md";
import { MdChevronLeft } from "react-icons/md";

var tmdbUrl = 'https://image.tmdb.org/t/p/original/';


function GenreComponent({genre, urlToFetch, isBigPoster, handleHover, handleLeave, handleLeavePoster}) {
    
    
    const [moviesList, setMoviesList] = useState([]);
    const [xPosition, setXposition] = useState(0);
    const [vwToEnd,setVwToEnd] = useState(30);
    const [mapLength, setMaplength] = useState(0);
    const [mapPos, setMapPos] = useState(0);
    
    let calcScrollWidth = (numOfMovies) => {
        let remUnit = parseFloat(getComputedStyle(document.documentElement).fontSize);
        let fullVw = window.innerWidth;
        let numberOfCardDisp = fullVw / (remUnit*18);
        let numberOfBigCardDisp = fullVw / (remUnit*13.5);
        let vwUnitToEnd = (100*numOfMovies/numberOfCardDisp)-92;
        let vwUnitToEndBig = (100*numOfMovies/numberOfBigCardDisp)-92;
        setVwToEnd(isBigPoster?vwUnitToEndBig:vwUnitToEnd);
        let titleMapLen = isBigPoster?Math.ceil((vwUnitToEndBig+92)/100):Math.ceil((vwUnitToEnd+92)/100);
        setMaplength(titleMapLen);
    }
    
    useEffect(()=>{
        let fetchUrl = async()=>{
            let res = await fetch(urlToFetch);
            let body = await res.json();
            if(body.results){
                let numOfMovies = body.results.length;
                setMoviesList(body.results)
                calcScrollWidth(numOfMovies)
            }
        }
        fetchUrl();
    },[])
    
    let arrowOnClick = (value) => {
        calcScrollWidth(moviesList.length);
        let newXpos = value + xPosition;
        newXpos>xPosition?setMapPos(mapPos+1):setMapPos(mapPos-1);
        if (newXpos<0){
            newXpos=0;
        } else if (newXpos>vwToEnd){
            newXpos=vwToEnd;
        }
        setXposition(newXpos);
        console.log(genre,mapLength-mapPos-1);
    }
    
    let posterClass = isBigPoster?"bigMoviePoster":"moviePoster";
    let rightArrowClass = isBigPoster?"arrow rightArrow bigArrow":"arrow rightArrow normalArrow";
    let leftArrowClass = isBigPoster?"arrow leftArrow bigArrow":"arrow leftArrow normalArrow";
    
    return (
    <div className="genreContainer">
        <div className="titleContainer">
            <h2 className="genreTitle">{genre}<MdChevronRight className="genreTitleChevron"/></h2>
            <TitleMapComponent mapLength={mapLength} mapPos={mapPos}/>
        </div>
        <div className="moviesContainer" style={{transform: `translateX(-${xPosition}vw)`}}>
            {moviesList.map((e,i)=>(
                <div className={isBigPoster?"movieCard":"movieCard movieCardLabel"}>

                        <img className={posterClass} src={isBigPoster?tmdbUrl+e.poster_path:tmdbUrl+e.backdrop_path} 
                        alt={e.name} onMouseEnter={(evt)=>handleHover({isBigPoster,movieData:e,evt})} onMouseLeave={()=>handleLeavePoster()}/>
                        {!isBigPoster?
                        <div className="posterLabel">
                            <span className="posterLabelSpan">{(e.name||e.original_name||e.original_title||e.title).slice(0,25)} &middot; {(e.first_air_date||e.release_date).slice(0,4)}</span>
                        </div>:null}

                </div>
            ))}
        </div>
        {xPosition<vwToEnd?<button className={rightArrowClass} onClick={()=>arrowOnClick(90)} onMouseEnter={()=>handleLeave()}>
            <MdChevronRight className="chevronSvg"/>
        </button>:null}
        {xPosition>0?<button className={leftArrowClass} onClick={()=>arrowOnClick(-90)} onMouseEnter={()=>handleLeave()}>
            <MdChevronLeft className="chevronSvg"/>
        </button>:null}
    </div>
    );
}

export default GenreComponent;