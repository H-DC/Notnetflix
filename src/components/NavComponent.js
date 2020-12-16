import React, {useState, useEffect} from 'react';
import netflixImg from '../assets/netflixIcon.png';
import accountImg from '../assets/accountIcon.jpg';
import './NavComponent.css'

import { MdArrowDropDown } from "react-icons/md";



function NavComponent() {
    const [isDarkNavBar,setIsDarkNavBar] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if((window.scrollY>160)){
                setIsDarkNavBar(true);
            }else  {
                setIsDarkNavBar(false);
            }
        });
        return ()=>window.removeEventListener("scroll");
    },[])

    let navBgClass = isDarkNavBar?"navBgDark":"navBgGradient";
    navBgClass += " navContainer"

  return (
    <div className={navBgClass}>
        <div className="navBox">
            <img src={netflixImg} id="netflixImg" alt="Notflix"/>
            <span id="homeBtn">Home</span>
            <span className="navBtn">TV Shows</span>
            <span className="navBtn">Movies</span>
        </div>
        <div className="navBox">
            <span className="navBtn">KIDS</span>
            <img src={accountImg} id="accountImg" alt="profil"/>
            <MdArrowDropDown id="navDropDown"/>
        </div>
    </div>
    );
}

export default NavComponent;