import React, {useState, useEffect} from 'react';

import './TitleMapComponent.css';


function TitleMapComponent({mapPos,mapLength}) {

  return (
    <div className="mapContainer">
        {mapPos>0?Array(mapPos).fill(undefined).map((e,i)=>(
        <span key={i+'map'} className="mapNotSelect">_</span>
        )):null}
        <span className="mapSelect">_</span>
        {(mapLength-mapPos)>0?Array(mapLength-mapPos).fill(undefined).map((e,i)=>(
        <span key={i+'map'} className="mapNotSelect">_</span>
        )):null}
    </div>
    );
}

export default TitleMapComponent;