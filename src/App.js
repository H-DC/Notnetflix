import { useState,useEffect } from 'react';
import './App.css';
import FooterComponent from './components/FooterComponent';
import GenreComponent from './components/GenreComponent';
import HeaderComponent from './components/HeaderComponent';
import NavComponent from './components/NavComponent';
import OverlayComponent from './components/OverlayComponent';


import requests from './request';

var timeout;

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
    timeout = setTimeout(()=>{setTrigger(true)},800);
  }

  let handleLeave = ()=> {
    setIsHover(false);
    clearTimeout(timeout);
    setIsOverlay(false);
    setOverlayData(null);
  }

  let handleLeavePoster = ()=> {
    setIsHover(false);
    clearTimeout(timeout);
  }

  return (
    <div>
      <NavComponent/>
      <HeaderComponent/>
      <div id="mainBoard">
        <GenreComponent genre="Trending Now" urlToFetch={requests.urlTrending} handleHover={handleHover} handleLeave={handleLeave} handleLeavePoster={handleLeavePoster} isBigPoster={false} />
        <GenreComponent genre="Action Movies" urlToFetch={requests.urlActionMovies} handleHover={handleHover} handleLeave={handleLeave} handleLeavePoster={handleLeavePoster} isBigPoster={false} />
        <GenreComponent genre="Netflix Originals" urlToFetch={requests.urlNetflix}  handleHover={handleHover} handleLeave={handleLeave} handleLeavePoster={handleLeavePoster} isBigPoster/>
        <GenreComponent genre="Comedies" urlToFetch={requests.urlComedyMovies} handleHover={handleHover} handleLeave={handleLeave} handleLeavePoster={handleLeavePoster} isBigPoster={false} />
      </div>
      <FooterComponent/>
      {((overlayData!=null)&&isOverlay)?<OverlayComponent overlayData={overlayData} handleLeave={handleLeave}/>:null}
    </div>
  );
}

export default App;
