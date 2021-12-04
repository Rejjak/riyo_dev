import React, {useEffect} from "react";
import { Link } from "react-router-dom";

function Footer(){
    useEffect(()=>{
        let searchForm = document.querySelector('.search-form');

        if(document.querySelector('#search-btn') !== null){
            document.querySelector('#search-btn').onclick = () =>{
                searchForm.classList.toggle('active');
                loginForm.classList.remove('active');
                navbar.classList.remove('active');
            }
        }

        let loginForm = document.querySelector('.login-form');

        if(document.querySelector('#login-btn') !== null){
            document.querySelector('#login-btn').onclick = () =>{
                loginForm.classList.toggle('active');
                searchForm.classList.remove('active');
                navbar.classList.remove('active');
            }
        }

        let navbar = document.querySelector('.navbar');

        document.querySelector('#menu-btn').onclick = () =>{
            navbar.classList.toggle('active');
            searchForm.classList.remove('active');
            loginForm.classList.remove('active');
        }

        window.onscroll = () =>{
            searchForm.classList.remove('active');
            loginForm.classList.remove('active');
            navbar.classList.remove('active');
        }

        // -------- thank you modal ------

        let thnk = document.getElementById("thankId");
        let btnBuy = document.getElementById("buy-now");
        let tata2 = document.getElementById("btn1");
        if(btnBuy != null){
            btnBuy.onclick = function() {
                thnk.style.display = "block";
            }
        }
        if(tata2 != null){
            tata2.onclick = function() {
                thnk.style.display = "none";
            }
        }
        window.onclick = function(event) {
            if (event.target == thnk) {
                thnk.style.display = "none";
            }
        }

        // --------------sign-up modal------------------------------

        let signUp = document.getElementById("sign-up");
        let btn = document.getElementById("myBtn");
        let span = document.getElementsByClassName("close")[0];
        if(btn != null){
            btn.onclick = function(){
                loginForm.classList.remove('active');
                signUp.style.display = "block";
                return false;
            }
        }
        if(span != null){
            span.onclick = function(){
                signUp.style.display = "none";
            }
        }
    },[])
    return(
        <div>
            <section className="footer">
            <div className="box-container">
                <div className="box">
                <h3>quick links</h3>
                <a href="home.html"> <i className="fas fa-arrow-right" /> home</a>
                <a href="shop.html"> <i className="fas fa-arrow-right" /> shop</a>
                <a href="about.html"> <i className="fas fa-arrow-right" /> about</a>
                <a href="team.html"> <i className="fas fa-arrow-right" /> team</a>
                </div>
                <div className="box">
                <h3>extra links</h3>
                <a href="#"> <i className="fas fa-arrow-right" /> my order </a>
                <a href="#"> <i className="fas fa-arrow-right" /> my favorite </a>
                <a href="#"> <i className="fas fa-arrow-right" /> my wishlist </a>
                <a href="#"> <i className="fas fa-arrow-right" /> my account </a>
                </div>
            </div>
            </section>
            <section className="credit">Made with ❤️ by <Link exact to="/team">riyo_dev</Link></section>
        </div>
    )
}

export default Footer;