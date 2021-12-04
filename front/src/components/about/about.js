import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Header from '../header/header';
import Footer from '../footer/footer';
import IMG2 from '../../images/home-img2.jpg';
import SERV1 from '../../images/serv-1.png';
import SERV2 from '../../images/serv-2.png';
import SERV3 from '../../images/serv-3.png';
import SERV4 from '../../images/serv-4.png';

function About(){
    return(
        <div>
            <Header showIcons={true}/>
            <div>
                <div className="heading">
                <h1>about us</h1>
                </div>
                <section className="about" id="about">
                <div className="image">
                    <img src={IMG2} alt="" />
                </div>
                <div className="content">
                    <span>why choose us?</span>
                    <h3 className="title">what's make our products beautiful !</h3>
                    <div className="icons-container">
                    <div className="icons">
                        <img src={SERV1} alt="" />
                        <h3>fast delivery</h3>
                    </div>  
                    <div className="icons">
                        <img src={SERV2} alt="" />
                        <h3>fresh products</h3>
                    </div>   
                    <div className="icons">
                        <img src={SERV3} alt="" />
                        <h3>best quality</h3>
                    </div>  
                    <div className="icons">
                        <img src={SERV4} alt="" />
                        <h3>24/7 support</h3>
                    </div>           
                    </div>
                </div>
                </section>
            </div>
            <Footer/>
      </div>
    )
}

export default About;