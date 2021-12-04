import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import Header from '../header/header';
import Footer from '../footer/footer';
import REJJAK from '../../images/rejjak.jpg';
import MIRAJ from '../../images/miraj.png';

function Team(){
    return(
        <div>
            <Header showIcons={true}/>
            <div>
                <div className="heading">
                    <p> team </p>
                    <h1>riyo_Dev</h1>
                </div>
                <section className="team">
                <h1 className="title"> <span>our team</span></h1>
                <div className="box-container">
                    <div className="box">
                    <div className="share">
                        <a target="_blank" href="https://facebook.com/miraj.asraf" className="fab fa-facebook-f" />
                        <a target="_blank" href="https://www.linkedin.com/in/miraj-asraf-2b3087189" className="fab fa-linkedin" />
                        <a target="_blank" href="https://github.com/Miraj8280" className="fab fa-github" />
                        <a target="_blank" href="https://instagram.com/miraj_8280" className="fab fa-instagram" />
                    </div>
                    <div className="image">
                        <img src={MIRAJ} alt="" />
                    </div>
                    <div className="user">
                        <h3>miraj asraf</h3>
                        <span>front-end developer</span>
                    </div>
                    </div>
                    <div className="box">
                    <div className="share">
                        <a target="_blank" href="https://facebook.com/monnu.bhai.205" className="fab fa-facebook-f" />
                        <a target="_blank" href="https://www.linkedin.com/in/md-rejjak-ali-205" className="fab fa-linkedin" />
                        <a target="_blank" href="https://github.com/Rejjak" className="fab fa-github" />
                        <a target="_blank" href="#" className="fab fa-instagram" />
                    </div>
                    <div className="image">
                        <img src={REJJAK} alt="" />
                    </div>
                    <div className="user">
                        <h3>rejjak ali</h3>
                        <span>full stack developer</span>
                    </div>
                    </div>
                </div>
                </section>
            </div>
            <Footer/>
      </div>
    )
}

export default Team;