import React, {useState, useEffect} from 'react';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

import './OverlayComponent.css';

import { HiOutlineThumbUp } from "react-icons/hi";
import { HiOutlineThumbDown } from "react-icons/hi";
import { MdPlayArrow } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";

var tmdbUrl = 'https://image.tmdb.org/t/p/original/';
let remUnit = parseFloat(getComputedStyle(document.documentElement).fontSize);

function OverlayComponent({ handleLeave, overlayData:{isBigPoster,movieData,evt}}) {

  const [youtubeCode,setYoutubeCode] = useState(null);

  let topPosition = evt.target.getBoundingClientRect().top+window.scrollY;
  let leftPosition = evt.target.getBoundingClientRect().left+window.scrollX;
  let posterClass = isBigPoster?"bigMoviePoster":"moviePosterOverlay";

  const playerOpt = {
    width: 18*remUnit,
    height: 10*remUnit,
    playerVars: {
      autoplay: 1,
    },
  }

  let getYoutubeUrl = (movieData) => {
    movieTrailer(movieData.name||movieData.original_name||movieData.original_title||movieData.title||"")
     .then(res=>{
       console.log(res)
       let regex =/watch\?v\=.*/;
       let code = res.match(regex)[0].slice(8);
       setTimeout(()=>setYoutubeCode(code),1000);
     });
   }

   useEffect(()=>{
     getYoutubeUrl(movieData)
   },[])
  
    return (
            <div className="overlayContainer" style={{top:topPosition,left:leftPosition}} onMouseLeave={()=>handleLeave()}>
                {youtubeCode?
                <YouTube videoId={youtubeCode} opts={playerOpt}/>:
                <img className={posterClass} src={isBigPoster?tmdbUrl+movieData.poster_path:tmdbUrl+movieData.backdrop_path} 
                alt={movieData.name} />}
                <div className="overlayBtnContainer">
                  <button className="overlayPlayBtn"><MdPlayArrow/></button>
                  <button className="overlayBtn">+</button>
                  {!isBigPoster?
                  <>
                  <button className="overlayBtn"><HiOutlineThumbUp/></button>
                  <button className="overlayBtn"><HiOutlineThumbDown/></button>
                  </>:null}
                  <button className="overlayMoreBtn"><MdExpandMore/></button>
                </div>
                <div className="overlayTextContainer">
                  <span className="matchSpan">98% Match </span>
                  <span className="overlayText borderSpan">18+</span>
                  <span className="overlayText">1h {Math.floor(Math.random()*40)+20}m </span>
                </div>
                <div className="overlayTextContainer">
                  <span className="overlayText">{(movieData.name||movieData.original_name||movieData.original_title||movieData.title).slice(0,35)} &middot; {(movieData.first_air_date||movieData.release_date).slice(0,4)}</span>
                </div>
            </div>
        );
    }
    
    export default OverlayComponent;