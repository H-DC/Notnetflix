import React from 'react';

import './FooterComponent.css';


import { ImFacebook2 } from "react-icons/im";
import { ImInstagram } from "react-icons/im";
import { ImTwitter } from "react-icons/im";
import { ImYoutube } from "react-icons/im";


function FooterComponent() {

   
  return (
    <div className="footerMain">
        <div>
            <div>
                <ImFacebook2 className="footerIcon" />
                <ImInstagram className="footerIcon" />
                <ImTwitter className="footerIcon" />  
                <ImYoutube className="footerIcon" /> 
            </div>
            <div className="linkSection">
                <div className="linkParagraph">
                    <p>Audio</p>
                    <p>Media</p>
                    <p>Privacy</p>
                    <p>Contact Us</p>
                </div>
                <div className="linkParagraph">
                    <p>Audio Description</p>
                    <p>Investor</p>
                    <p>Legal Notices</p>
                </div>
                <div className="linkParagraph">
                    <p>Help Center</p>
                    <p>Jobs</p>
                    <p>Cookies Preferences</p>
                </div>
                <div className="linkParagraph">
                    <p>Gift Cards</p>
                    <p>Terms of Use</p>
                    <p>Corporate Informations</p>
                </div>
            </div>
            <p id="footerDisclamer">For demonstration purposes only, not affiliated to ©Netflix, not for commercial purposes</p>
        </div>
    </div>
    );
}

export default FooterComponent;