import { useState,useEffect } from 'react';
import './App.css';
import GenreComponent from './components/GenreComponent';
import HeaderComponent from './components/HeaderComponent';
import NavComponent from './components/NavComponent';
import OverlayComponent from './components/OverlayComponent';


import requests from './request'

function App() {

  const [overlayData,setOverlayData] = useState(null);
  const [isOverlay,setIsOverlay] = useState(false);
  const [isHover,setIsHover] = useState(false);
  const [trigger,setTrigger] = useState(false);

  useEffect(()=>{
    if(isHover){
      setIsOverlay(true)
    }else{
      setIsOverlay(false);
    }
    setTrigger(false);
  },[trigger])
 

  let handleHover = (data)=>{
    setIsHover(true);
    setOverlayData(data);
    setTimeout(()=>{setTrigger(true)},800);
  }

  let handleLeave = ()=> {
    setIsHover(false);
    setIsOverlay(false);
    setOverlayData(null);
  }

  return (
    <div>
      <NavComponent/>
      <HeaderComponent/>
      <div id="mainBoard">
        <GenreComponent genre="Trending Now" urlToFetch={requests.urlTrending} handleHover={handleHover} handleLeave={handleLeave} isBigPoster={false} />
        <GenreComponent genre="Action Movies" urlToFetch={requests.urlActionMovies} handleHover={handleHover} handleLeave={handleLeave} isBigPoster={false} />
        <GenreComponent genre="Netflix Originals" urlToFetch={requests.urlNetflix}  handleHover={handleHover} handleLeave={handleLeave} isBigPoster/>
        <GenreComponent genre="Comedies" urlToFetch={requests.urlComedyMovies} handleHover={handleHover} handleLeave={handleLeave} isBigPoster={false} />
      </div>
      {((overlayData!=null)&&isOverlay)?<OverlayComponent overlayData={overlayData} handleLeave={handleLeave}/>:null}
    </div>
  );
}

export default App;
